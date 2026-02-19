// app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'LingArc - Learn English from A1 to C1',
  description:
    'Master English with adaptive learning, from beginner to advanced.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: '#0b0f1a',
          }}
        >
          {/* CLICKABLE LOGO */}
          <Link
            href="/"
            style={{
              fontSize: 24,
              fontWeight: 700,
              textDecoration: 'none',
              color: 'white',
              letterSpacing: 0.5,
            }}
          >
            Ling<span style={{ color: '#f5a623' }}>Arc</span>
          </Link>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>
      </body>
    </html>
  );
}
