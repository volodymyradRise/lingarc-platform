// app/[locale]/dashboard/page.tsx
'use client';

import { useI18n } from '@/lib/i18n/provider';
import { CURRICULUM } from '@/lib/curriculum';
import { SettingsToggles } from '@/components/SettingsToggles';
import { shouldShowVocabularyHints } from '@/lib/i18n/fade-out';
import Link from 'next/link';

export default function DashboardPage() {
  const { t, userLevel, setUserLevel } = useI18n();
  const levels: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1'> = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const curriculum = CURRICULUM[userLevel];
  const canShowVocab = shouldShowVocabularyHints(userLevel);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 36,
        fontWeight: 700,
        marginBottom: 8
      }}>
        {t('dashboard.title')}
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 40 }}>
        {t('dashboard.subtitle')}
      </p>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Settings</h2>
        <SettingsToggles />
      </div>

      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Your Level</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setUserLevel(level)}
              style={{
                padding: '10px 20px',
                background: userLevel === level ? 'var(--amber)' : 'var(--surface2)',
                border: `2px solid ${userLevel === level ? 'var(--amber)' : 'var(--border)'}`,
                borderRadius: 8,
                color: userLevel === level ? '#0e0f1a' : 'var(--text)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {level} - {t(`levels.${level}.name`)}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--muted)' }}>
          {t(`levels.${userLevel}.desc`)}
          {!canShowVocab && ' · Vocabulary hints disabled at this level'}
        </p>
      </div>

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
          {curriculum.level} Curriculum
        </h2>

        {curriculum.units.map((unit, idx) => (
          <div key={unit.id} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{unit.icon}</span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                  {t('dashboard.unit')} {idx + 1}: {unit.titleEN}
                </h3>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {unit.lessons.length} {t('dashboard.lessons')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {unit.lessons.map((lesson, lessonIdx) => (
                <Link
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(245,166,35,0.2)',
                      color: 'var(--amber)',
                      fontSize: 18,
                      fontWeight: 700
                    }}>
                      {lessonIdx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {lesson.titleEN}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                        {lesson.type} · {lesson.xp} {t('dashboard.xp')} · {lesson.exercises.length} {t('dashboard.exercises')}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 14px',
                    background: 'rgba(245,166,35,0.15)',
                    color: 'var(--amber)',
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    {t('dashboard.start')} →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
