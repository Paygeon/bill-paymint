import './globals.css';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const BottomMenu = dynamic(() => import('@/components/BottomMenu'), { ssr: false });

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
