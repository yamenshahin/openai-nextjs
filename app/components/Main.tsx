import Sidebar from './Sidebar';
import Chat from './Chat';

const Main = () => {
  return (
    <>
      <main className="flex justify-center items-center h-[90vh] bg-[white]">
        <Sidebar />
        <Chat />
      </main>
    </>
  );
};
export default Main;
