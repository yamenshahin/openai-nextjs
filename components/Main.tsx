import Sidebar from './Sidebar';
import Chat from './Chat';

interface UserData {
  _id: string;
  email: string;
  threads: { threadId: string; threadTitle: string }[];
}
const Main = ({
  user,
  innerThreadId = '',
}: {
  user: UserData;
  innerThreadId?: string;
}) => {
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
