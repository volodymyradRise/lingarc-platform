'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function AppHeader() {
  const params = useParams();
  const locale = params.locale ?? 'en';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 32px',
      }}
    >
      <Link
        href={`/${locale}/dashboard`}
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 26,
          fontWeight: 700,
          textDecoration: 'none',
          color: 'var(--text)',
        }}
      >
        Ling<span style={{ color: 'var(--amber)' }}>Arc</span>
      </Link>

      <LanguageSelector />
    </div>
  );
}
