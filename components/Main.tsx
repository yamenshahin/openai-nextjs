import Sidebar from './Sidebar';
import Chat from './Chat';

const Main = ({ user }) => {
  return (
    <>
      <main className="flex justify-center items-center h-[90vh] bg-[white]">
        <Sidebar userThreads={user.thread} />
        <Chat userId={user._id} />
      </main>
    </>
  );
};
export default Main;
