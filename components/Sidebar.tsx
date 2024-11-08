const Sidebar = ({ userThreads }) => {
  return (
    <>
      <div className="w-[420px] bg-gray-100 p-4 h-full">
        <ul>
          {userThreads &&
            userThreads.map((thread) => (
              <li key={thread.threadId}>{thread.threadTitle}</li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
