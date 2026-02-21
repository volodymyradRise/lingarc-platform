'use client';
// DEBUG - видали після тестування
useEffect(() => {
  if (currentExercise && currentExercise.type === 'sentence_order') {
    console.log('🔍 SENTENCE ORDER DEBUG:', {
      id: currentExercise.id,
      type: currentExercise.type,
      hasWords: !!currentExercise.words,
      wordsCount: currentExercise.words?.length || 0,
      words: currentExercise.words,
      question: currentExercise.questionEN
    });
  }
}, [currentExercise]);
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateCurriculum } from '@/lib/curriculum/generator';
import type { Lesson, Exercise } from '@/lib/curriculum/generator';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const curriculum = generateCurriculum();
    let foundLesson: Lesson | null = null;

    for (const level of Object.values(curriculum)) {
      for (const unit of level.units) {
        const found = unit.lessons.find((l) => l.id === lessonId);
        if (found) {
          foundLesson = found;
          break;
        }
      }
      if (foundLesson) break;
    }

    setLesson(foundLesson);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const handleMultipleChoice = (answerIdx: number) => {
    setSelectedAnswer(answerIdx);
    setShowResult(true);
    if (answerIdx === currentExercise.correct) {
      setScore(score + 1);
    }
  };

  const handleFillBlank = () => {
    setShowResult(true);
    const isCorrect = userInput.trim().toLowerCase() === String(currentExercise.correct).toLowerCase();
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleSentenceOrder = () => {
    setShowResult(true);
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

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput('');
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      router.push(`/${params.locale}/learn`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push(`/${params.locale}/learn`)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold">{lesson.titleEN}</h1>
            <div className="text-sm text-gray-400">
              {currentExerciseIndex + 1}/{lesson.exercises.length}
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentExerciseIndex === 0 && lesson.storyEN && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
              {lesson.storyEN}
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700">
          <div className="mb-6">
            <p className="text-2xl font-semibold mb-2">{currentExercise.questionEN}</p>
          </div>

          {currentExercise.type === 'multiple_choice' && currentExercise.options && (
            <div className="space-y-3">
              {currentExercise.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !showResult && handleMultipleChoice(idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                    showResult
                      ? idx === currentExercise.correct
                        ? 'bg-green-600 text-white'
                        : idx === selectedAnswer
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <span className="mr-3 inline-block w-8 h-8 bg-gray-600 rounded-full text-center leading-8">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentExercise.type === 'fill_blank' && (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!showResult) handleFillBlank();
                  }
                }}
                disabled={showResult}
                className={`w-full p-4 bg-gray-900 border-2 rounded-lg text-white text-lg ${
                  showResult
                    ? isCorrect()
                      ? 'border-green-500'
                      : 'border-red-500'
                    : 'border-gray-700 focus:border-yellow-500'
                } focus:outline-none transition-colors`}
                placeholder="Type your answer..."
              />
              {!showResult && (
                <button
                  onClick={handleFillBlank}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
                >
                  Check Answer
                </button>
              )}
            </div>
          )}

          {currentExercise.type === 'sentence_order' && (
            <div className="space-y-4">
              {currentExercise.words && currentExercise.words.length > 0 && (
                <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-3">💡 Words to use:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.words.map((word, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-lg"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!showResult) handleSentenceOrder();
                  }
                }}
                disabled={showResult}
                className={`w-full p-4 bg-gray-900 border-2 rounded-lg text-white text-lg min-h-[120px] ${
                  showResult
                    ? isCorrect()
                      ? 'border-green-500'
                      : 'border-red-500'
                    : 'border-gray-700 focus:border-yellow-500'
                } focus:outline-none transition-colors resize-none`}
                placeholder="Type the complete sentence..."
              />
              {!showResult && (
                <button
                  onClick={handleSentenceOrder}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
                >
                  Check Answer
                </button>
              )}
            </div>
          )}

          {showResult && (
            <div className="mt-6 space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect()
                    ? 'bg-green-900/30 border border-green-500'
                    : 'bg-red-900/30 border border-red-500'
                }`}
              >
                <p className="font-bold text-lg mb-2">
                  {isCorrect() ? '✅ Correct!' : '❌ Not quite!'}
                </p>
                {!isCorrect() && (
                  <p className="text-gray-300">
                    Correct answer: <span className="font-bold text-white">{String(currentExercise.correct)}</span>
                  </p>
                )}
                <p className="text-sm text-gray-300 mt-2">
                  {currentExercise.explanations.en || 'Keep practicing!'}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-lg transition-all shadow-lg"
              >
                {currentExerciseIndex < lesson.exercises.length - 1 ? 'Next Question →' : 'Complete Lesson 🎉'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Score: <span className="text-yellow-500 font-bold">{score}</span> / {currentExerciseIndex + 1}
          </p>
        </div>
      </div>
    </div>
  );
}
