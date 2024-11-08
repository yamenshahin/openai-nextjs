import { signOut } from '../auth';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">This is header</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          Sign Out <FaSignOutAlt className="ml-2" />
        </button>
      </form>
    </header>
  );
};

export default Header;
