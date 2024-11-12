/* eslint-disable @typescript-eslint/ban-ts-comment */
import Header from '@/components/Header';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { auth } from '@/auth';
import { emailToUsername } from '@/util/helper';
import { getUserById } from '@/queries/users';

const Home = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  interface UserData {
    _id: string;
    email: string;
    threads: { threadId: string; threadTitle: string }[];
  }
  let user = {} as UserData;
  const userEmail = user?.email ? emailToUsername(user.email) : 'User';
  if (isLoggedIn && session.user) {
    try {
      // @ts-expect-error
      user = await getUserById(session.user._id);
    } catch (error: unknown) {
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
          <Header username={userEmail} />
          <Main user={user} />
        </>
      )}
    </>
  );
};

export default Home;
