import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abacus | Master Mental Math',
  description: 'Watch your child\'s brain light up as they master numbers using the ancient power of the abacus!',
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
