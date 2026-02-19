// app/[locale]/page.tsx
'use client';

import { useI18n } from '@/lib/i18n/provider';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main>
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,166,35,0.12) 0%, transparent 70%)'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(245,166,35,0.15)',
            color: 'var(--amber)',
            padding: '6px 14px',
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24
          }}>
            🌍 {t('landing.trusted')}
          </div>

          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-2px'
          }}>
            {t('landing.heroTitle')}
          </h1>

          <p style={{
            fontSize: 19,
            color: 'var(--muted)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto 40px'
          }}>
            {t('landing.heroSubtitle')}
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 17, padding: '18px 40px' }}>
              {t('landing.takeTest')} →
            </Link>
            <Link href="/dashboard" className="btn" style={{
              background: 'var(--surface2)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              fontSize: 17,
              padding: '18px 40px'
            }}>
              {t('landing.browseCurriculum')}
            </Link>
          </div>

          <p style={{
            marginTop: 20,
            fontSize: 13,
            color: 'var(--muted)'
          }}>
            {t('landing.noCard')}
          </p>
        </div>
      </section>
    </main>
  );
}
