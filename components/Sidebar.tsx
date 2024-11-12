import Link from 'next/link';
import { FaCommentAlt } from 'react-icons/fa';

interface Thread {
  threadId: string;
  threadTitle: string;
}

const Sidebar = ({ userThreads }: { userThreads: Thread[] }) => {
  let reversedUserThreads: Thread[] = [];
  if (userThreads) {
    reversedUserThreads = userThreads.reverse();
  }
  return (
    <>
      <div className="w-[420px] bg-gray-100 p-4 h-full">
        <ul className="list-none p-0">
          {reversedUserThreads &&
            reversedUserThreads.map((thread) => (
              <li key={thread.threadId} className="px-4 py-2 hover:bg-gray-200">
                <Link
                  href={{ pathname: `/threads/${thread.threadId}` }}
                  className="inline-block align-middle"
                >
                  <FaCommentAlt className="text-gray-500 mr-2 inline-block align-middle" />
                  {thread.threadTitle}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
