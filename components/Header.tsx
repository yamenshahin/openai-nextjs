import { signOut } from '../auth';
const Header = () => {
  return (
    <>
      <header>
        <h1>This is header</h1>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </header>
    </>
  );
};
export default Header;
