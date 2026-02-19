// app/[locale]/lesson/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/provider';
import { CURRICULUM } from '@/lib/curriculum';
import type { Lesson } from '@/lib/curriculum';
import { getEffectiveLanguageForExplanation, shouldShowVocabularyHints } from '@/lib/i18n/fade-out';
import Link from 'next/link';

function findLesson(id: string): Lesson | null {
  for (const levelData of Object.values(CURRICULUM)) {
    for (const unit of levelData.units) {
      const lesson = unit.lessons.find(l => l.id === id);
      if (lesson) return lesson;
    }
  }
  return null;
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const { t, language, userLevel, showExplanations } = useI18n();
  const [phase, setPhase] = useState<'story' | 'exercise' | 'complete'>('story');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showVocabTranslations, setShowVocabTranslations] = useState(false);

  const lesson = findLesson(params.id);
  if (!lesson) return <div>Lesson not found</div>;

  const currentExercise = lesson.exercises[currentExerciseIdx];
  const canShowVocab = shouldShowVocabularyHints(userLevel);
  const explanationLang = getEffectiveLanguageForExplanation(language, userLevel);

  const handleMultipleChoice = (answerIdx: number) => {
    setSelectedAnswer(answerIdx);
    setShowFeedback(true);
    if (answerIdx === currentExercise.correct) {
      setScore(score + 1);
    }
  };

  const handleFillBlank = () => {
    setShowFeedback(true);
    const isCorrect = userInput.trim().toLowerCase() === String(currentExercise.correct).toLowerCase();
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleSentenceOrder = () => {
    setShowFeedback(true);
    const isCorrect = userInput.trim().toLowerCase() === String(currentExercise.correct).toLowerCase();
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const isCorrect = () => {
    if (currentExercise.type === 'multiple_choice') {
      return selectedAnswer === currentExercise.correct;
    }
    if (currentExercise.type === 'fill_blank' || currentExercise.type === 'sentence_order') {
      return userInput.trim().toLowerCase() === String(currentExercise.correct).toLowerCase();
    }
    return false;
  };

  const nextExercise = () => {
    if (currentExerciseIdx < lesson.exercises.length - 1) {
      setCurrentExerciseIdx(currentExerciseIdx + 1);
      setSelectedAnswer(null);
      setUserInput('');
      setShowFeedback(false);
    } else {
      setPhase('complete');
    }
  };

  if (phase === 'story') {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>
        <Link href="/dashboard" className="btn" style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          marginBottom: 24,
          display: 'inline-flex'
        }}>
          ← {t('lesson.back')}
        </Link>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 8
        }}>
          {lesson.titleEN}
        </h1>

        <div className="card" style={{
          marginBottom: 32,
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          borderColor: 'var(--amber)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <div style={{
              fontSize: 13,
              color: 'var(--amber)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}>
              📖 {t('lesson.context')}
            </div>

            {canShowVocab && language !== 'en' && (
              <button
                onClick={() => setShowVocabTranslations(!showVocabTranslations)}
                style={{
                  padding: '6px 12px',
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  color: 'var(--text)',
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                🔤 {showVocabTranslations ? t('lesson.hideVocab') : t('lesson.showVocab')}
              </button>
            )}
          </div>

          <p style={{ lineHeight: 1.85, fontSize: 16, fontStyle: 'italic', marginBottom: showVocabTranslations ? 20 : 0 }}>
            {lesson.storyEN}
          </p>

          {showVocabTranslations && canShowVocab && language !== 'en' && (
            <div style={{
              paddingTop: 20,
              borderTop: '1px solid var(--border)'
            }}>
              <div style={{
                fontSize: 12,
                color: 'var(--muted)',
                marginBottom: 12,
                fontWeight: 600
              }}>
                📚 {t('lesson.vocabularyHelp')}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8
              }}>
                {lesson.vocabulary.map((item, idx) => (
                  <div key={idx} style={{ fontSize: 13, color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                      {item.wordEN}
                    </span>
                    {' → '}
                    <span>{item.translations[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setPhase('exercise')}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: 17, padding: '18px 40px' }}
        >
          {t('lesson.startExercises')} →
        </button>
      </div>
    );
  }

  if (phase === 'exercise') {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px', paddingBottom: showFeedback ? 140 : 40 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 13,
            color: 'var(--muted)'
          }}>
            <span>{lesson.titleEN}</span>
            <span>{currentExerciseIdx + 1}/{lesson.exercises.length}</span>
          </div>
          <div style={{ width: '100%', height: 8, background: 'var(--surface2)', borderRadius: 99 }}>
            <div style={{
              height: '100%',
              width: `${((currentExerciseIdx + 1) / lesson.exercises.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--amber), var(--coral))',
              borderRadius: 99,
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        <div style={{
          padding: '12px 16px',
          background: 'var(--surface2)',
          borderRadius: 8,
          marginBottom: 24,
          fontSize: 14,
          color: 'var(--muted)'
        }}>
          💡 {t('instructions.multipleChoice')}
        </div>

        <h2 style={{
          fontSize: 22,
          fontWeight: 600,
          marginBottom: 32,
          lineHeight: 1.4
        }}>
          {currentExercise.questionEN}
        </h2>

        {/* MULTIPLE CHOICE */}
        {currentExercise.type === 'multiple_choice' && currentExercise.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentExercise.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && handleMultipleChoice(idx)}
                disabled={showFeedback}
                className={`option-btn ${showFeedback ? (idx === currentExercise.correct ? 'correct' : idx === selectedAnswer ? 'incorrect' : '') : ''}`}
              >
                <span style={{
                  display: 'inline-flex',
                  width: 28,
                  height: 28,
                  background: 'var(--bg)',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  marginRight: 12
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        )}

        {/* FILL IN THE BLANK */}
        {currentExercise.type === 'fill_blank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showFeedback}
              placeholder="Type your answer here..."
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--surface2)',
                border: `2px solid ${showFeedback ? (isCorrect() ? 'var(--success)' : 'var(--error)') : 'var(--border)'}`,
                borderRadius: 8,
                color: 'var(--text)',
                fontSize: 16,
                fontFamily: 'inherit'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !showFeedback && userInput.trim()) {
                  handleFillBlank();
                }
              }}
            />
            {!showFeedback && (
              <button
                onClick={handleFillBlank}
                disabled={!userInput.trim()}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-end' }}
              >
                Check Answer
              </button>
            )}
          </div>
        )}

        {/* SENTENCE ORDER */}
        {currentExercise.type === 'sentence_order' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showFeedback}
              placeholder="Type the complete sentence..."
              rows={3}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--surface2)',
                border: `2px solid ${showFeedback ? (isCorrect() ? 'var(--success)' : 'var(--error)') : 'var(--border)'}`,
                borderRadius: 8,
                color: 'var(--text)',
                fontSize: 16,
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            {!showFeedback && (
              <button
                onClick={handleSentenceOrder}
                disabled={!userInput.trim()}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-end' }}
              >
                Check Answer
              </button>
            )}
          </div>
        )}

        {showFeedback && showExplanations && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 32px',
            background: isCorrect() ? '#166534' : '#7f1d1d',
            borderTop: `3px solid ${isCorrect() ? 'var(--success)' : 'var(--error)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                {isCorrect() ? t('lesson.correct') : t('lesson.incorrect')}
              </div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>
                {explanationLang === 'mixed'
                  ? currentExercise.explanations[currentExerciseIdx % 2 === 0 ? language : 'en']
                  : currentExercise.explanations[explanationLang]
                }
              </div>
              {!isCorrect() && (
                <div style={{ fontSize: 13, marginTop: 8, opacity: 0.7 }}>
                  Correct answer: <strong>{String(currentExercise.correct)}</strong>
                </div>
              )}
            </div>
            <button onClick={nextExercise} className="btn btn-primary">
              {currentExerciseIdx < lesson.exercises.length - 1 ? t('lesson.next') : t('lesson.finish')} →
            </button>
          </div>
        )}
      </div>
    );
  }

  const accuracy = Math.round((score / lesson.exercises.length) * 100);

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>
        {accuracy === 100 ? '🏆' : '✅'}
      </div>
      <h1 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 36,
        fontWeight: 700,
        marginBottom: 8
      }}>
        {accuracy === 100 ? t('lesson.perfect') : t('lesson.lessonComplete')}
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 40 }}>
        {score}/{lesson.exercises.length} {t('lesson.correctAnswers')}
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40 }}>
        <div className="card" style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--amber)' }}>
            +{lesson.xp}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {t('lesson.xpEarned')}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--mint)' }}>
            {accuracy}%
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {t('lesson.accuracy')}
          </div>
        </div>
      </div>

      <Link href="/dashboard" className="btn btn-primary" style={{ width: '100%', fontSize: 17, padding: '18px 40px' }}>
        {t('lesson.continueJourney')} →
      </Link>
    </div>
  );
}
