import { Inter } from 'next/font/google';
import './globals.css';
import Warnings from '../components/warnings';
import { assistantId } from './assistant-config';
import dbConnect from '@/lib/db';
const inter = Inter({ subsets: ['latin'] });
import { SessionProvider } from 'next-auth/react';

const metadata = {
  title: "Lou Adler's Performance-based Hiring Coach",
  description:
    'Advanced Win-Win Hiring system for attracting, interviewing and recruiting the A-team for critical staff and leadership positions. Hiring for the anniversary date, not the start date.',
  icons: {
    icon: '/cropped-cropped-pbh-fav.jpg',
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dbConnection = await dbConnect();
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          {assistantId ? children : <Warnings />}
        </body>
      </SessionProvider>
    </html>
  );
};

export { metadata };
export default RootLayout;
