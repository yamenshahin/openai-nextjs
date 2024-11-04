import Header from '../components/Header';
import Login from '../components/Login';
import Main from '../components/Main';
import { auth } from '../auth';

const Home = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <>
      {!isLoggedIn ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Header />
          <Main />
        </>
      )}
    </>
  );
};

export default Home;
