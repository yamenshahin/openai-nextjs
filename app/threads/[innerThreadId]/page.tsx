import Header from '@/components/Header';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { auth } from '@/auth';
import { emailToUsername } from '@/util/helper';
import { getUserById } from '@/queries/users';

const Page = async ({
  params: { innerThreadId },
}: {
  params: { innerThreadId: string };
}) => {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  interface UserData {
    _id: string;
    email: string;
    threads: { threadId: string; threadTitle: string }[];
  }
  let user = {} as UserData;
  const userEmail = user?.email
    ? emailToUsername(user.email)
    : 'User@email.com';
  if (isLoggedIn && session.user) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          <Header username={emailToUsername(userEmail)} />
          <Main user={user} innerThreadId={innerThreadId} />
        </>
      )}
    </>
  );
};

export default Page;
