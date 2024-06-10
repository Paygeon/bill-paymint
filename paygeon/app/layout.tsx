import BottomMenu from '@/components/BottomMenu';
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BottomMenu />
        {children}
        </body>
    </html>
  );
}
