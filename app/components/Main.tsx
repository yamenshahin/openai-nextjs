import Sidebar from './Sidebar';
import Chat from './Chat';

const Main = () => {
  return (
    <>
      <main className="flex">
        <Sidebar />
        <Chat />
      </main>
    </>
  );
};
export default Main;
