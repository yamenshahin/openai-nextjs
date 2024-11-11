'use client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect, useRef } from 'react';
import styles from './chat.module.css';
import { AssistantStream } from 'openai/lib/AssistantStream';
import Markdown from 'react-markdown';
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from 'openai/resources/beta/assistants/assistants';
import { RequiredActionFunctionToolCall } from 'openai/resources/beta/threads/runs/runs';

type MessageProps = {
  role: 'user' | 'assistant' | 'code';
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.assistantMessage}>
      <Markdown>{text}</Markdown>
    </div>
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split('\n').map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

const Message = ({ role, text }: MessageProps) => {
  switch (role) {
    case 'user':
      return <UserMessage text={text} />;
    case 'assistant':
      return <AssistantMessage text={text} />;
    case 'code':
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall,
  ) => Promise<string>;
  userId: string;
  innerThreadId?: string;
};

const Chat = ({
  functionCallHandler = () => Promise.resolve(''),
  userId,
  innerThreadId,
}: ChatProps) => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState('');
  const [threads, setThreads] = useState([]);

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // create a new threadID when chat component created
  useEffect(() => {
    if (innerThreadId) {
      setThreadId(innerThreadId);
    } else {
      const createThread = async () => {
        const res = await fetch(`/api/assistants/threads`, {
          method: 'POST',
        });
        const data = await res.json();
        setThreadId(data.threadId);
      };
      createThread();
    }

    const getUser = async () => {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'GET',
      });
      const data = await res.json();
      return data;
    };
    getUser().then((data) => {
      setThreads(data.thread);
      console.log(threads);
    });
  }, []);

  // TODO: implement full messages retrieval for a thread
  const retrieveMessages = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/assistants/threads/${threadId}/messages`, {
      method: 'GET',
    });
    const data = await res.json();
    console.log(data);
  };
  const sendMessage = async (text: string) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: 'POST',
        body: JSON.stringify({
          content: text,
        }),
      },
    );
    if (response.body !== null) {
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } else {
      console.error('response.body is null');
    }
  };

  const submitActionResult = async (
    runId: unknown,
    toolCallOutputs: unknown,
  ) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      },
    );
    if (response.body !== null) {
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } else {
      console.error('response.body is null');
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    // add thread
    await fetch(`/api/users/`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        thread: {
          threadId,
          threadTitle: userInput.trim(),
        },
      }),
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: userInput },
    ]);
    setUserInput('');
    setInputDisabled(true);
    scrollToBottom();
  };

  /* Stream Event Handlers */

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage('assistant', '');
  };

  // textDelta - append text to last assistant message
  const handleTextDelta = (delta: {
    value: string | null;
    annotations: null;
  }) => {
    if (delta.value != null) {
      // remove source annotation
      const textWithoutSource = delta.value.replace(/【\d*:?\d*†source】/g, ''); // Modified regex to match zero or more digits before and after the colon
      appendToLastMessage(textWithoutSource);
    }
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations);
    }
  };

  // imageFileDone - show image in chat
  const handleImageFileDone = (image: { file_id: unknown }) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  };

  // toolCallCreated - log new tool call
  const toolCallCreated = (toolCall) => {
    if (toolCall.type != 'code_interpreter') return;
    appendMessage('code', '');
  };

  /* eslint-disable */
  // toolCallDelta - log delta and snapshot for the tool call
  const toolCallDelta = (delta, snapshot) => {
    if (delta.type != 'code_interpreter') return;
    if (!delta.code_interpreter.input) return;
    appendToLastMessage(delta.code_interpreter.input);
  };
  /* eslint-enable */

  // handleRequiresAction - handle function call
  const handleRequiresAction = async (
    event: AssistantStreamEvent.ThreadRunRequiresAction,
  ) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall: RequiredActionFunctionToolCall) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      }),
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // messages
    stream.on('textCreated', handleTextCreated);
    stream.on('textDelta', handleTextDelta);

    // image
    stream.on('imageFileDone', handleImageFileDone);

    // code interpreter
    stream.on('toolCallCreated', toolCallCreated);
    stream.on('toolCallDelta', toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on('event', (event) => {
      if (event.event === 'thread.run.requires_action')
        handleRequiresAction(event);
      if (event.event === 'thread.run.completed') handleRunCompleted();
    });
  };

  /*
    =======================
    === Utility Helpers ===
    =======================
  */

  const appendToLastMessage = (text) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendMessage = (role, text) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = (annotations) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach((annotation) => {
        if (annotation.type === 'file_path') {
          updatedLastMessage.text = updatedLastMessage.text.replaceAll(
            annotation.text,
            `/api/files/${annotation.file_path.file_id}`,
          );
        }
      });
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  return (
    <div className="flex flex-col-reverse h-full w-full">
      <div className="flex-grow overflow-y-auto p-[10px] flex flex-col order-2 whitespace-pre-wrap">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full p-[10px] pb-[40px] order-1"
      >
        <input
          type="text"
          className="flex-grow px-[24px] py-[16px] mr-[10px] rounded-[60px] border-[2px] border-[solid] border-[transparent] text-[1em] bg-[#efefef]  focus:outline-none focus:border-black focus:bg-white placeholder:text-gray-400"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your question"
        />
        <button
          type="submit"
          className="px-[24px] py-[8px] bg-black text-white border-none text-[1em] rounded-[60px] disabled:bg-gray-300"
          disabled={inputDisabled}
        >
          Send
        </button>
        <button type="button" onClick={retrieveMessages}>
          retrieve
        </button>
      </form>
    </div>
  );
};

export default Chat;
