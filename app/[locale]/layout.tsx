import { I18nProvider } from '@/lib/i18n/provider';
import type { SupportedLanguage } from '@/lib/i18n/types';

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
        {children}
      </div>
    </I18nProvider>
  );
}
