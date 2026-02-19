// lib/curriculum/generator.ts
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

/**
 * KEY UPGRADE:
 * - No “Option A/B/C …”
 * - Deterministic (SSR-safe): no Math.random
 * - Exercises look real: plausible distractors, different sentences, simple explanations
 */

type Template = {
  topic: string;
  grammarKey: GrammarKey;
  storyEN: string;
  vocab: string[];
};

type GrammarKey =
  | 'A1_BE'
  | 'A1_POSSESSIVE_ADJ'
  | 'A1_HOW_QUESTIONS'
  | 'A1_PRESENT_SIMPLE'
  | 'A1_LIKE_WANT'
  | 'A1_ADJECTIVES'
  | 'A1_TIME_PREP'
  | 'A1_THERE_IS_ARE'
  | 'A1_CAN_CANNOT'
  | 'A1_HOW_MUCH_MANY'
  | 'A2_PAST_SIMPLE_REG'
  | 'A2_PAST_SIMPLE_IRREG'
  | 'A2_WILL_VS_GOING_TO'
  | 'A2_COMPARATIVES'
  | 'A2_SHOULD'
  | 'A2_HAVE_TO_MUST'
  | 'A2_PRESENT_PERF_BASIC';

const XP_BASE: Record<CEFRLevel, number> = {
  A1: 20,
  A2: 25,
  B1: 30,
  B2: 40,
  C1: 50
};

const ICONS = ['📚', '✏️', '🎯', '🌟'];

/**
 * Minimal-but-good template set for A1/A2.
 * (You can extend later; the generator logic already supports it.)
 */
const LESSON_TEMPLATES: Record<CEFRLevel, Template[]> = {
  A1: [
    {
      topic: 'Personal Information',
      grammarKey: 'A1_BE',
      storyEN:
        'You meet someone new. You introduce yourself, ask their name, and say where you are from.',
      vocab: ['hello', 'name', 'from', 'country', 'city', 'nice', 'meet', 'student', 'teacher', 'friend']
    },
    {
      topic: 'Family Members',
      grammarKey: 'A1_POSSESSIVE_ADJ',
      storyEN:
        'You talk about your family: your mother, your father, and who they are to you.',
      vocab: ['mother', 'father', 'sister', 'brother', 'family', 'parent', 'child', 'grandmother', 'grandfather', 'baby']
    },
    {
      topic: 'Numbers and Age',
      grammarKey: 'A1_HOW_QUESTIONS',
      storyEN:
        'At a birthday party you ask ages and simple questions with “How…?”.',
      vocab: ['one', 'two', 'three', 'ten', 'twenty', 'age', 'year', 'old', 'birthday', 'party']
    },
    {
      topic: 'Daily Activities',
      grammarKey: 'A1_PRESENT_SIMPLE',
      storyEN:
        'You describe a typical day: what you do in the morning, afternoon, and evening.',
      vocab: ['wake up', 'work', 'study', 'eat', 'walk', 'go', 'come', 'sleep', 'start', 'finish']
    },
    {
      topic: 'Food and Drinks',
      grammarKey: 'A1_LIKE_WANT',
      storyEN:
        'You order food at a café and say what you like and what you want.',
      vocab: ['water', 'bread', 'rice', 'meat', 'fruit', 'vegetable', 'hungry', 'thirsty', 'delicious', 'menu']
    },
    {
      topic: 'Colors and Objects',
      grammarKey: 'A1_ADJECTIVES',
      storyEN:
        'You go shopping and describe things with simple adjectives and colors.',
      vocab: ['red', 'blue', 'green', 'yellow', 'big', 'small', 'new', 'old', 'good', 'bad']
    },
    {
      topic: 'Time and Schedule',
      grammarKey: 'A1_TIME_PREP',
      storyEN:
        'You plan your day and talk about time: in the morning, at 7, on Monday.',
      vocab: ['morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'week', 'month', 'schedule', 'time']
    },
    {
      topic: 'Locations',
      grammarKey: 'A1_THERE_IS_ARE',
      storyEN:
        'You describe a place using “There is / There are”.',
      vocab: ['here', 'there', 'near', 'far', 'left', 'right', 'inside', 'outside', 'park', 'shop']
    },
    {
      topic: 'Animals',
      grammarKey: 'A1_CAN_CANNOT',
      storyEN:
        'At a zoo you talk about what animals can and cannot do.',
      vocab: ['cat', 'dog', 'bird', 'fish', 'lion', 'tiger', 'run', 'fly', 'swim', 'jump']
    },
    {
      topic: 'Shopping',
      grammarKey: 'A1_HOW_MUCH_MANY',
      storyEN:
        'You buy items and ask “How much…?” and “How many…?”.',
      vocab: ['price', 'cheap', 'expensive', 'money', 'bag', 'bottle', 'apple', 'banana', 'how much', 'how many']
    }
  ],
  A2: [
    {
      topic: 'Past Experiences',
      grammarKey: 'A2_PAST_SIMPLE_REG',
      storyEN:
        'You talk about last weekend and things you did.',
      vocab: ['visited', 'watched', 'played', 'studied', 'cleaned', 'called', 'worked', 'walked', 'talked', 'cooked']
    },
    {
      topic: 'Irregular Verbs',
      grammarKey: 'A2_PAST_SIMPLE_IRREG',
      storyEN:
        'You remember childhood and use irregular past verbs.',
      vocab: ['went', 'saw', 'came', 'took', 'gave', 'made', 'found', 'left', 'met', 'felt']
    },
    {
      topic: 'Future Plans',
      grammarKey: 'A2_WILL_VS_GOING_TO',
      storyEN:
        'You make plans and predictions about next week.',
      vocab: ['plan', 'soon', 'later', 'tomorrow', 'next', 'decide', 'hope', 'expect', 'maybe', 'definitely']
    },
    {
      topic: 'Comparisons',
      grammarKey: 'A2_COMPARATIVES',
      storyEN:
        'You compare two cities: bigger, smaller, more interesting.',
      vocab: ['bigger', 'smaller', 'faster', 'slower', 'better', 'worse', 'more', 'less', 'than', 'as']
    },
    {
      topic: 'Advice',
      grammarKey: 'A2_SHOULD',
      storyEN:
        'You give simple advice about health and study.',
      vocab: ['should', 'advice', 'recommend', 'suggest', 'healthy', 'careful', 'sleep', 'water', 'practice', 'often']
    },
    {
      topic: 'Obligations',
      grammarKey: 'A2_HAVE_TO_MUST',
      storyEN:
        'You talk about rules at work or school.',
      vocab: ['must', 'have to', 'need', 'rule', 'law', 'required', 'important', 'allowed', 'forbidden', 'permission']
    },
    {
      topic: 'Present Perfect Intro',
      grammarKey: 'A2_PRESENT_PERF_BASIC',
      storyEN:
        'You talk about life experiences: things you have done.',
      vocab: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'experience', 'travel', 'learn']
    }
  ],
  B1: [],
  B2: [],
  C1: []
};

function vocabToItems(vocab: string[]): VocabularyItem[] {
  return vocab.map((word) => ({
    wordEN: word,
    translations: {
      uk: `[${word}_uk]`,
      ru: `[${word}_ru]`,
      es: `[${word}_es]`
    }
  }));
}

function explain(en: string, uk: string, ru: string, es: string): Record<string, string> {
  return { en, uk, ru, es };
}

function mcq(
  id: string,
  questionEN: string,
  options: string[],
  correctIndex: number,
  exp: Record<string, string>
): Exercise {
  return {
    id,
    type: 'multiple_choice',
    questionEN,
    options,
    correct: correctIndex,
    explanations: exp
  };
}

function fillBlank(
  id: string,
  prompt: string,
  correct: string,
  exp: Record<string, string>
): Exercise {
  return {
    id,
    type: 'fill_blank',
    questionEN: prompt,
    correct,
    explanations: exp
  };
}

function sentenceOrder(
  id: string,
  prompt: string,
  correctSentence: string,
  exp: Record<string, string>
): Exercise {
  return {
    id,
    type: 'sentence_order',
    questionEN: prompt,
    correct: correctSentence,
    explanations: exp
  };
}

function buildExercises(grammarKey: GrammarKey, lessonId: string, topic: string): Exercise[] {
  // NOTE: deterministic: we use fixed arrays and indexes, no randomness.
  const ex: Exercise[] = [];

  if (grammarKey === 'A1_POSSESSIVE_ADJ') {
    // Realistic MCQs: only 1 correct, others are common mistakes
    const set = [
      {
        q: 'Choose the correct sentence:',
        options: [
          'This is my sister.',
          'This is me sister.',
          'This is mine sister.',
          'This is the my sister.'
        ],
        c: 0,
        e: explain(
          'Use possessive adjective: my + noun.',
          'Використовуй присвійний прикметник: my + іменник.',
          'Используй притяжательное прилагательное: my + существительное.',
          'Usa el adjetivo posesivo: my + sustantivo.'
        )
      },
      {
        q: 'Choose the correct sentence:',
        options: [
          'He is her brother.',
          'He is she brother.',
          'He is hers brother.',
          'He is the her brother.'
        ],
        c: 0,
        e: explain(
          'Use her before a noun (her brother).',
          'Her ставимо перед іменником (her brother).',
          'Her ставим перед существительным (her brother).',
          'Her va antes del sustantivo (her brother).'
        )
      },
      {
        q: 'Choose the correct sentence:',
        options: [
          'Their parents are very kind.',
          'They parents are very kind.',
          'Theirs parents are very kind.',
          'Their are parents very kind.'
        ],
        c: 0,
        e: explain(
          'Their + noun = possession.',
          'Their + іменник = належність.',
          'Their + существительное = принадлежность.',
          'Their + sustantivo = posesión.'
        )
      }
    ];

    set.forEach((s, i) => ex.push(mcq(`${lessonId}-e${i + 1}`, s.q, s.options, s.c, s.e)));

    ex.push(
      fillBlank(
        `${lessonId}-e4`,
        'Fill the blank with a possessive adjective: "This is ___ mother." (I)',
        'my',
        explain(
          'I → my (before a noun).',
          'I → my (перед іменником).',
          'I → my (перед существительным).',
          'I → my (antes del sustantivo).'
        )
      )
    );

    ex.push(
      sentenceOrder(
        `${lessonId}-e5`,
        'Put the words in order to make a correct sentence:',
        'This is our family.',
        explain(
          'Our comes before the noun: our family.',
          'Our стоїть перед іменником: our family.',
          'Our стоит перед существительным: our family.',
          'Our va antes del sustantivo: our family.'
        )
      )
    );

    return ex;
  }

  if (grammarKey === 'A1_BE') {
    ex.push(
      mcq(
        `${lessonId}-e1`,
        'Choose the correct sentence:',
        ['I am from Ukraine.', 'I is from Ukraine.', 'I are from Ukraine.', 'I be from Ukraine.'],
        0,
        explain('I → am.', 'I → am.', 'I → am.', 'I → am.')
      )
    );
    ex.push(
      mcq(
        `${lessonId}-e2`,
        'Choose the correct question:',
        ['Where are you from?', 'Where you are from?', 'Where from you are?', 'Where is you from?'],
        0,
        explain(
          'Question word + are + subject.',
          'Питальне слово + are + підмет.',
          'Вопросительное слово + are + подлежащее.',
          'Palabra interrogativa + are + sujeto.'
        )
      )
    );
    ex.push(
      fillBlank(
        `${lessonId}-e3`,
        'Fill the blank: "She ___ a teacher."',
        'is',
        explain('She → is.', 'She → is.', 'She → is.', 'She → is.')
      )
    );
    ex.push(
      mcq(
        `${lessonId}-e4`,
        'Choose the correct negative:',
        ["He isn't tired.", "He don't tired.", "He not is tired.", "He no tired."],
        0,
        explain(
          "Use isn't (= is not).",
          "Використовуй isn't (= is not).",
          "Используй isn't (= is not).",
          "Usa isn't (= is not)."
        )
      )
    );
    ex.push(
      sentenceOrder(
        `${lessonId}-e5`,
        'Put the words in order:',
        'Nice to meet you.',
        explain('Common greeting phrase.', 'Типова фраза-знайомство.', 'Типичная фраза знакомства.', 'Frase típica para conocer a alguien.')
      )
    );
    return ex;
  }

  if (grammarKey === 'A1_HOW_MUCH_MANY') {
    ex.push(
      mcq(
        `${lessonId}-e1`,
        'Choose the correct question:',
        ['How much is this?', 'How many is this?', 'How much are these?', 'How many are this?'],
        0,
        explain(
          'How much + singular price.',
          'How much + ціна (однина).',
          'How much + цена (ед. число).',
          'How much + precio (singular).'
        )
      )
    );
    ex.push(
      mcq(
        `${lessonId}-e2`,
        'Choose the correct question:',
        ['How many apples do you want?', 'How much apples do you want?', 'How many apple do you want?', 'How much apple do you wants?'],
        0,
        explain(
          'How many + countable plural.',
          'How many + злічуване у множині.',
          'How many + исчисляемое во множественном.',
          'How many + contable en plural.'
        )
      )
    );
    ex.push(
      fillBlank(
        `${lessonId}-e3`,
        'Fill the blank: "I want ___ bottle of water."',
        'a',
        explain('Use a/an for singular countable.', 'A/An для однини злічуваного.', 'A/An для ед. числа исчисляемого.', 'A/An para singular contable.')
      )
    );
    ex.push(
      mcq(
        `${lessonId}-e4`,
        'Choose the correct answer:',
        ['Two euros, please.', 'Two apple, please.', 'Much euros, please.', 'Many money, please.'],
        0,
        explain(
          'Price answers: number + currency.',
          'Ціна: число + валюта.',
          'Цена: число + валюта.',
          'Precio: número + moneda.'
        )
      )
    );
    ex.push(
      sentenceOrder(
        `${lessonId}-e5`,
        'Put the words in order:',
        'How many bananas do you need?',
        explain('Correct word order for a question.', 'Правильний порядок слів у питанні.', 'Правильный порядок слов в вопросе.', 'Orden correcto en una pregunta.')
      )
    );
    return ex;
  }

  // Generic fallback (better than "Option A"): still looks OK
  // This prevents crashes if you add new templates later.
  ex.push(
    mcq(
      `${lessonId}-e1`,
      `Choose the best sentence for "${topic}":`,
      [
        `This is a simple sentence about ${topic.toLowerCase()}.`,
        `This are a simple sentence about ${topic.toLowerCase()}.`,
        `This is simple sentence about ${topic.toLowerCase()}.`,
        `This is a simple sentences about ${topic.toLowerCase()}.`
      ],
      0,
      explain(
        'Correct grammar and article usage.',
        'Правильна граматика та артикль.',
        'Правильная грамматика и артикль.',
        'Gramática correcta y artículo.'
      )
    )
  );
  ex.push(
    fillBlank(
      `${lessonId}-e2`,
      `Fill the blank with the best word: "I ___ English every day."`,
      'study',
      explain('Common verb for learning.', 'Поширене дієслово для навчання.', 'Обычный глагол для обучения.', 'Verbo común para aprender.')
    )
  );
  ex.push(
    mcq(
      `${lessonId}-e3`,
      'Choose the correct question:',
      ['What do you like?', 'What you do like?', 'What do like you?', 'What likes you?'],
      0,
      explain(
        'Do + subject + base verb.',
        'Do + підмет + базове дієслово.',
        'Do + подлежащее + базовый глагол.',
        'Do + sujeto + verbo base.'
      )
    )
  );
  ex.push(
    sentenceOrder(
      `${lessonId}-e4`,
      'Put the words in order:',
      'I like learning English.',
      explain('Natural sentence structure.', 'Природна структура речення.', 'Естественная структура предложения.', 'Estructura natural.')
    )
  );
  ex.push(
    mcq(
      `${lessonId}-e5`,
      'Choose the correct negative:',
      ["I don't understand.", "I no understand.", "I not understand.", "I doesn't understand."],
      0,
      explain(
        "Use don't + base verb.",
        "Використовуй don't + базове дієслово.",
        "Используй don't + базовый глагол.",
        "Usa don't + verbo base."
      )
    )
  );

  return ex;
}

function generateLesson(level: CEFRLevel, lessonIndex: number, template: Template): Lesson {
  const lessonId = `${level.toLowerCase()}-l${lessonIndex + 1}`;

  return {
    id: lessonId,
    titleEN: template.topic,
    type: 'grammar',
    level,
    xp: XP_BASE[level],
    storyEN: template.storyEN,
    exercises: buildExercises(template.grammarKey, lessonId, template.topic),
    vocabulary: vocabToItems(template.vocab)
  };
}

export function generateCurriculum(): Record<CEFRLevel, LevelCurriculum> {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const curriculum = {} as Record<CEFRLevel, LevelCurriculum>;

  for (const level of levels) {
    const templates = LESSON_TEMPLATES[level] ?? [];
    const lessons = templates.map((t, i) => generateLesson(level, i, t));

    const lessonsPerUnit = 5;
    const unitCount = Math.max(1, Math.ceil(lessons.length / lessonsPerUnit));
    const units: Unit[] = [];

    for (let i = 0; i < unitCount; i++) {
      const slice = lessons.slice(i * lessonsPerUnit, (i + 1) * lessonsPerUnit);

      units.push({
        id: `${level.toLowerCase()}-u${i + 1}`,
        titleEN: `${level} Unit ${i + 1}`,
        icon: ICONS[i % ICONS.length],
        lessons: slice
      });
    }

    curriculum[level] = { level, units };
  }

  return curriculum;
}

export function generateLessonsByLevel(level: CEFRLevel, count: number = 20): Lesson[] {
  const templates = (LESSON_TEMPLATES[level] ?? []).slice(0, count);
  return templates.map((t, i) => generateLesson(level, i, t));
}

export function generateSingleLesson(level: CEFRLevel, topic: string, grammar: string, storyEN: string): Lesson {
  // For quick tests. Uses fallback grammarKey-like behavior:
  const template: Template = {
    topic,
    grammarKey: 'A1_BE',
    storyEN: storyEN || `A short story about ${topic}.`,
    vocab: [grammar, topic, 'example', 'practice', 'learn']
  };

  return generateLesson(level, 0, template);
}
