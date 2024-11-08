import Link from 'next/link';

const Sidebar = ({ userThreads }) => {
  return (
    <>
      <div className="w-[420px] bg-gray-100 p-4 h-full">
        <ul>
          {userThreads &&
            userThreads.map((thread) => (
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
