import Link from 'next/link';

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
        <ul>
          {reversedUserThreads &&
            reversedUserThreads.map((thread) => (
              <li key={thread.threadId}>
                <Link href={{ pathname: `/threads/${thread.threadId}` }}>
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
