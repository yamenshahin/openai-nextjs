import Sidebar from './Sidebar';
import Chat from './Chat';

const Main = ({ user, innerThreadId = null }) => {
  return (
    <>
      <main className="flex justify-center items-center h-[90vh] bg-[white]">
        <Sidebar userThreads={user.threads} />
        <Chat userId={user._id} innerThreadId={innerThreadId} />
      </main>
    </>
  );
};
export default Main;
