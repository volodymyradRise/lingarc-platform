// lib/curriculum/index.ts
import type { CEFRLevel } from '../i18n/types';

export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'sentence_order' | 'word_match';
  questionEN: string;
  options?: string[];
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
  type: 'grammar' | 'vocabulary' | 'reading' | 'listening';
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

export const CURRICULUM: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    units: [
      {
        id: 'a1-u1',
        titleEN: 'Hello, World!',
        icon: '👋',
        lessons: [
          {
            id: 'a1-u1-l1',
            titleEN: 'Greetings and Introductions',
            type: 'grammar',
            level: 'A1',
            xp: 20,
            storyEN: 'Maria walks into a coffee shop. The barista smiles and says: "Good morning! My name is Tom. What is your name?" Maria replies: "Hi Tom! I am Maria. Nice to meet you!"',
            exercises: [
              {
                id: 'a1-u1-l1-e1',
                type: 'multiple_choice',
                questionEN: 'What does Tom say first?',
                options: ['Good morning!', 'Goodbye!', 'Thank you!', 'Yes, please!'],
                correct: 0,
                explanations: {
                  en: '"Good morning!" is a common greeting used in the morning.',
                  uk: '"Good morning!" — це поширене вітання, яке використовується вранці.',
                  ru: '"Good morning!" — это распространённое приветствие, которое используется утром.',
                  es: '"Good morning!" es un saludo común que se usa por la mañana.'
                }
              }
            ],
            vocabulary: [
              { wordEN: 'morning', translations: { uk: 'ранок', ru: 'утро', es: 'mañana' } },
              { wordEN: 'name', translations: { uk: "ім'я", ru: 'имя', es: 'nombre' } },
              { wordEN: 'meet', translations: { uk: 'зустрічати', ru: 'встречать', es: 'conocer' } }
            ]
          }
        ]
      }
    ]
  },
  A2: {
    level: 'A2',
    units: [
      {
        id: 'a2-u1',
        titleEN: 'Daily Routines',
        icon: '⏰',
        lessons: [
          {
            id: 'a2-u1-l1',
            titleEN: 'Present Simple for Routines',
            type: 'grammar',
            level: 'A2',
            xp: 25,
            storyEN: 'Carlos wakes up at 7 every morning. He drinks coffee and reads the news. He goes to work by bus. He finishes at 6 and cooks dinner at home.',
            exercises: [
              {
                id: 'a2-u1-l1-e1',
                type: 'multiple_choice',
                questionEN: 'Which is correct for daily routines?',
                options: ['She is work every day.', 'She works every day.', 'She working every day.', 'She did work every day.'],
                correct: 1,
                explanations: {
                  en: 'Present Simple: subject + base verb (+s for he/she/it) for habits and routines.',
                  uk: 'Present Simple: підмет + дієслово (+s для he/she/it) для звичок і рутини.',
                  ru: 'Present Simple: подлежащее + глагол (+s для he/she/it) для привычек и рутины.',
                  es: 'Present Simple: sujeto + verbo base (+s para he/she/it) para hábitos y rutinas.'
                }
              }
            ],
            vocabulary: [
              { wordEN: 'wakes up', translations: { uk: 'прокидається', ru: 'просыпается', es: 'se despierta' } },
              { wordEN: 'drinks', translations: { uk: "п'є", ru: 'пьёт', es: 'bebe' } },
              { wordEN: 'goes', translations: { uk: 'йде', ru: 'идёт', es: 'va' } }
            ]
          }
        ]
      }
    ]
  },
  B1: {
    level: 'B1',
    units: [
      {
        id: 'b1-u1',
        titleEN: 'Work & Career',
        icon: '💼',
        lessons: [
          {
            id: 'b1-u1-l1',
            titleEN: 'Present Perfect vs Past Simple',
            type: 'grammar',
            level: 'B1',
            xp: 30,
            storyEN: 'James has worked at TechCorp for three years. Last year, he led a major project. He has learned a lot since he joined the company. Yesterday, he presented his results to th
