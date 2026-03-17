import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PTZ Camera Webcast Viewer',
  description: 'Live camera feed viewer with PTZ controls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}