'use client';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { signOut } from '@/util/serverActions';
import Image from 'next/image';

const Header = ({ username }: { username: string }) => {
  const handleSignOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signOut();
  };
  return (
    <header className="flex justify-between items-center p-4">
      <Image
        src={
          process.env.NEXT_PUBLIC_LOGO_URL
            ? process.env.NEXT_PUBLIC_LOGO_URL
            : '/logo.png'
        }
        alt="Logo"
        width={process.env.NEXT_PUBLIC_LOGO_URL ? 230 : 132}
        height={process.env.NEXT_PUBLIC_LOGO_URL ? 116 : 36}
      />
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
