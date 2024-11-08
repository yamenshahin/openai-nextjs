import Header from '@/components/Header';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { auth } from '@/auth';
import { emailToUsername } from '@/util/helper';
import { getUserById } from '@/queries/users';

const Page = async ({ params: { innerThreadId } }) => {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  interface UserData {
    email: string;
    thread_ids: string[];
  }
  let user = {} as UserData;

  if (isLoggedIn) {
    try {
      user = await getUserById(session.user._id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Header username={emailToUsername(user.email)} />
          <Main user={user} innerThreadId={innerThreadId} />
        </>
      )}
    </>
  );
};

export default Page;
