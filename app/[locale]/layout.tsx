// app/[locale]/layout.tsx
import Link from 'next/link';
import { I18nProvider } from '@/lib/i18n/provider';
import type { SupportedLanguage } from '@/lib/i18n/types';
import { LanguageSelector } from '@/components/LanguageSelector';

const validLocales: SupportedLanguage[] = ['en', 'uk', 'ru', 'es'];

export function generateStaticParams() {
  return validLocales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = validLocales.includes(params.locale as SupportedLanguage)
    ? (params.locale as SupportedLanguage)
    : 'en';

  return (
    <I18nProvider initialLanguage={locale}>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {/* HEADER */}
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 32px',
            background: 'rgba(14,15,26,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* ✅ Logo → TREE OF LESSONS */}
          <Link
            href={`/${locale}/dashboard`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            Ling<span style={{ color: 'var(--amber)' }}>Arc</span>
          </Link>

          <LanguageSelector />
        </nav>

        {/* ✅ CONTENT OFFSET (fix hiding) */}
        <main style={{ paddingTop: 24 }}>
          {children}
        </main>
      </div>
    </I18nProvider>
  );
}
