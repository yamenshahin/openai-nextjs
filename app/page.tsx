import Header from '../components/Header';
import Login from '../components/Login';
import Main from '../components/Main';

const Home = () => {
  const isLoggedIn = false;
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
