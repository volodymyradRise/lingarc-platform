// components/SettingsToggles.tsx
'use client';

import { useI18n } from '@/lib/i18n/provider';

export function SettingsToggles() {
  const { t, showExplanations, setShowExplanations, immersionMode, setImmersionMode } = useI18n();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px'
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t('settings.explanations')}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            Show grammar explanations in your native language
          </div>
        </div>
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          role="switch"
          aria-checked={showExplanations}
          style={{
            position: 'relative',
            width: 48,
            height: 28,
            background: showExplanations ? 'var(--success)' : 'var(--surface2)',
            border: 'none',
            borderRadius: 14,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: showExplanations ? 23 : 3,
              width: 22,
              height: 22,
              background: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s'
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px'
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t('settings.immersion')}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {t('settings.immersionDesc')}
          </div>
        </div>
        <button
          onClick={() => setImmersionMode(!immersionMode)}
          role="switch"
          aria-checked={immersionMode}
          style={{
            position: 'relative',
            width: 48,
            height: 28,
            background: immersionMode ? 'var(--amber)' : 'var(--surface2)',
            border: 'none',
            borderRadius: 14,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: immersionMode ? 23 : 3,
              width: 22,
              height: 22,
              background: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s'
            }}
          />
        </button>
      </div>
    </div>
  );
}
