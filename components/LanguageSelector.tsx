// components/LanguageSelector.tsx
'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/provider';
import type { SupportedLanguage } from '@/lib/i18n/types';

const LANGUAGE_NAMES: Record<SupportedLanguage, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  uk: { name: 'Українська', flag: '🇺🇦' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  es: { name: 'Español', flag: '🇪🇸' }
};

export function LanguageSelector() {
  const { language, changeLanguage, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500
        }}
      >
        <span style={{ fontSize: 16 }}>{LANGUAGE_NAMES[language].flag}</span>
        <span>{LANGUAGE_NAMES[language].name}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>▼</span>
      </button>

      {isOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 99 }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              zIndex: 100,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: 8,
              minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
          >
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: language === lang ? 'var(--surface2)' : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 12px',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    language === lang ? 'var(--surface2)' : 'transparent')
                }
              >
                <span style={{ fontSize: 18 }}>{LANGUAGE_NAMES[lang].flag}</span>
                <span>{LANGUAGE_NAMES[lang].name}</span>
                {language === lang && (
                  <span style={{ marginLeft: 'auto', color: 'var(--amber)' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
