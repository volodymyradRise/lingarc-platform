// app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'LingArc - Learn English from A1 to C1',
  description: 'Master English with adaptive learning, from beginner to advanced.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL HEADER */}
        <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition"
          >
            Ling<span className="text-yellow-400">Arc</span>
          </Link>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
