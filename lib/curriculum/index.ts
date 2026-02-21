// lib/curriculum/index.ts
import type { CEFRLevel } from '../i18n/types';
import { generateCurriculum } from './generator';

export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'sentence_order' | 'word_match';
  questionEN: string;
  options?: string[];
  words?: string[]; // ✅ ДОДАНО для sentence_order
  correct: number | string;
  explanations: Record<string, string>;
}

export interface VocabularyItem {
  wordEN: string;
  translations: {
    uk: string;
    ru: string;
    es: string;
  };
}

export interface Lesson {
  id: string;
  titleEN: string;
  type: 'grammar' | 'vocabulary' | 'reading' | 'listening' | 'review' | 'final_test'; // ✅ ДОДАНО review і final_test
  level: CEFRLevel;
  xp: number;
  storyEN: string;
  exercises: Exercise[];
  vocabulary: VocabularyItem[];
}

export interface Unit {
  id: string;
  titleEN: string;
  icon: string;
  lessons: Lesson[];
}

export interface LevelCurriculum {
  level: CEFRLevel;
  units: Unit[];
}

// Generate curriculum at build time (SSR-safe)
export const CURRICULUM: Record<CEFRLevel, LevelCurriculum> = generateCurriculum();
