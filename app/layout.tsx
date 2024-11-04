import { Inter } from 'next/font/google';
import './globals.css';
import Warnings from '../components/warnings';
import { assistantId } from './assistant-config';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Lou Adler's Performance-based Hiring Coach",
  description:
    'Advanced Win-Win Hiring system for attracting, interviewing and recruiting the A-team for critical staff and leadership positions. Hiring for the anniversary date, not the start date.',
  icons: {
    icon: '/cropped-cropped-pbh-fav.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {assistantId ? children : <Warnings />}
      </body>
    </html>
  );
}
