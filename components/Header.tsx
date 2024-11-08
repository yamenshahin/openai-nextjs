'use client';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { signOut } from '@/util/serverActions'; // Assuming NextAuth.js for authentication

const Header = ({ username }) => {
  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut();
  };
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">This is header</h1>
      <form onSubmit={handleSignOut}>
        <div className="flex items-center">
          <span className="flex items-center mr-4">
            <FaUserCircle className="text-blue-500 mr-2" /> {username}
          </span>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Sign Out <FaSignOutAlt className="ml-2" />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
