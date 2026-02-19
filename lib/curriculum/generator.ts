// lib/curriculum/generator.ts
import type { CEFRLevel } from '../i18n/types';

export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'sentence_order' | 'word_match';
  questionEN: string;
  options?: string[];
  words?: string[];
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
  type: 'grammar' | 'vocabulary' | 'reading' | 'listening' | 'review' | 'final_test';
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

type Template = {
  topic: string;
  grammarKey: string;
  grammarExplanation: string;
  vocab: string[];
  isTest?: boolean;
  isFinalTest?: boolean;
};

const XP_BASE: Record<CEFRLevel, number> = {
  A1: 20,
  A2: 25,
  B1: 30,
  B2: 40,
  C1: 50
};

const ICONS = ['📚', '✏️', '🎯', '🌟', '⭐', '💎'];

// ============================================
// A1: 20 УРОКІВ + 4 ТЕСТИ + 1 ФІНАЛЬНИЙ = 25
// ============================================
const A1_TEMPLATES: Template[] = [
  {
    topic: 'Introducing Yourself',
    grammarKey: 'A1_L1_BE_INTRO',
    grammarExplanation: `**Welcome to your first English lesson! 👋**

Today we learn the most important verb: **"to be"**

**Why is it important?**
Because you use it EVERY DAY to:
- Say your name: "I am John"
- Say where you're from: "I am from Ukraine"
- Describe yourself: "I am a student"

**The Magic Three Forms:**
📌 I **am** (I'm) - for yourself
📌 You/We/They **are** (you're/we're/they're) - for many people
📌 He/She/It **is** (he's/she's/it's) - for one person/thing

**Examples in real life:**
✅ "Hi! I'm Maria. I'm from Kyiv."
✅ "This is Tom. He's a teacher."
✅ "We're students."

**Common mistakes to avoid:**
❌ "I is..." → ✅ "I am..."
❌ "She am..." → ✅ "She is..."

**Quick tip:** In casual English, always use contractions (I'm, you're, he's) - it sounds more natural!`,
    vocab: ['am', 'is', 'are', 'name', 'from', 'hello', 'nice', 'meet', 'student', 'teacher']
  },
  {
    topic: 'Talking About Family',
    grammarKey: 'A1_L2_POSSESSIVE',
    grammarExplanation: `**Lesson 2: My, Your, His, Her - Showing What Belongs to You! 👨‍👩‍👧‍👦**

Imagine you want to talk about your family. How do you say "This is the mother of me"? 

In English, we use **possessive adjectives** - special words that show ownership.

**The Family of Possessive Words:**
👤 **my** - my book, my family, my phone
👥 **your** - your name, your house
👨 **his** - his car, his brother (for males)
👩 **her** - her bag, her sister (for females)
🏠 **our** - our home, our friends
👨‍👩‍👧 **their** - their children, their dog

**The Golden Rule:**
Possessive adjective + NOUN (always together!)

**Real conversations:**
✅ "This is my mother. Her name is Olena."
✅ "That's John. His sister is a doctor."
❌ "This is me mother." (wrong!)
❌ "She name is Anna." (wrong!)

**Pro tip:** Don't confuse:
- **my** (possessive) vs **mine** (pronoun)
- **your** vs **yours**
Example: "This is my book" → "This book is mine"`,
    vocab: ['my', 'your', 'his', 'her', 'our', 'their', 'mother', 'father', 'sister', 'brother']
  },
  {
    topic: 'Numbers and Age',
    grammarKey: 'A1_L3_NUMBERS',
    grammarExplanation: `**Lesson 3: Let's Count! Numbers and Talking About Age 🔢**

Numbers are everywhere: your age, phone number, address, prices!

**Numbers 1-20 (memorize these!):**
1-10: one, two, three, four, five, six, seven, eight, nine, ten
11-12: eleven, twelve (special!)
13-19: thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen
20: twenty

**Decades:**
20, 30, 40, 50, 60, 70, 80, 90, 100

**Asking about age:**
❓ "How old are you?" (Скільки тобі років?)
✅ "I am 25 years old." or "I'm 25."

**Asking "How...?" questions:**
- How old...? (age)
- How much...? (price)
- How many...? (quantity)`,
    vocab: ['one', 'two', 'three', 'ten', 'twenty', 'age', 'year', 'old', 'how', 'many']
  },
  {
    topic: 'Daily Routines',
    grammarKey: 'A1_L4_PRESENT_SIMPLE',
    grammarExplanation: `**Lesson 4: What Do You Do Every Day? Present Simple Tense ⏰**

Want to talk about your daily routine? You need **Present Simple**!

**When do we use it?**
✅ Habits: "I drink coffee every morning"
✅ Routines: "She goes to work at 8 AM"
✅ Facts: "The sun rises in the east"
✅ Schedules: "The train leaves at 9:00"`,
    vocab: ['work', 'study', 'live', 'wake up', 'sleep', 'eat', 'drink', 'go', 'come', 'every day']
  },
  {
    topic: 'Food and Drinks',
    grammarKey: 'A1_L5_LIKE_WANT',
    grammarExplanation: `**Lesson 5: I Like Pizza! Expressing Preferences 🍕☕**

Time to talk about food! Learn to say what you like and want.`,
    vocab: ['like', 'love', 'want', 'food', 'water', 'bread', 'meat', 'fruit', 'hungry', 'thirsty']
  },
  {
    topic: 'Review Test 1: Basics',
    grammarKey: 'A1_TEST1',
    grammarExplanation: `**🎯 Progress Check: Lessons 1-5**

Time to test what you've learned!`,
    vocab: [],
    isTest: true
  },
  {
    topic: 'Colors and Objects',
    grammarKey: 'A1_L6_ADJECTIVES',
    grammarExplanation: `**Lesson 6: Describing Things - Adjectives and Colors 🎨**`,
    vocab: ['red', 'blue', 'green', 'yellow', 'big', 'small', 'new', 'old', 'beautiful', 'color']
  },
  {
    topic: 'Time and Schedule',
    grammarKey: 'A1_L7_TIME',
    grammarExplanation: `**Lesson 7: What Time Is It? ⏰**`,
    vocab: ['time', 'clock', 'morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'at', 'on']
  },
  {
    topic: 'Places in the City',
    grammarKey: 'A1_L8_THERE_IS_ARE',
    grammarExplanation: `**Lesson 8: There Is / There Are - Describing Places 🏙️**`,
    vocab: ['there', 'is', 'are', 'bank', 'shop', 'restaurant', 'park', 'school', 'near', 'street']
  },
  {
    topic: 'Transportation',
    grammarKey: 'A1_L9_TRANSPORT',
    grammarExplanation: `**Lesson 9: How Do You Get There? Transport 🚗🚌🚇**`,
    vocab: ['car', 'bus', 'train', 'metro', 'bike', 'walk', 'drive', 'go', 'take', 'by']
  },
  {
    topic: 'Hobbies and Free Time',
    grammarKey: 'A1_L10_HOBBIES',
    grammarExplanation: `**Lesson 10: What Do You Do in Your Free Time? 🎮📚⚽**`,
    vocab: ['play', 'do', 'go', 'hobby', 'sport', 'music', 'read', 'watch', 'listen', 'free time']
  },
  {
    topic: 'Review Test 2: Daily Life',
    grammarKey: 'A1_TEST2',
    grammarExplanation: `**🎯 Progress Check: Lessons 6-10**`,
    vocab: [],
    isTest: true
  },
  {
    topic: 'Body Parts and Health',
    grammarKey: 'A1_L11_BODY',
    grammarExplanation: `**Lesson 11: Body Parts - Head, Shoulders, Knees and Toes! 👤💪**`,
    vocab: ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'leg', 'foot', 'arm', 'hurt']
  },
  {
    topic: 'Clothes and Weather',
    grammarKey: 'A1_L12_CLOTHES',
    grammarExplanation: `**Lesson 12: What Are You Wearing? Clothes and Weather 👕🌤️**`,
    vocab: ['shirt', 'pants', 'dress', 'shoes', 'jacket', 'wear', 'weather', 'sunny', 'rainy', 'cold']
  },
  {
    topic: 'House and Rooms',
    grammarKey: 'A1_L13_HOUSE',
    grammarExplanation: `**Lesson 13: My House - Rooms and Furniture 🏠**`,
    vocab: ['house', 'room', 'bedroom', 'kitchen', 'bathroom', 'table', 'chair', 'bed', 'window', 'door']
  },
  {
    topic: 'School and Education',
    grammarKey: 'A1_L14_SCHOOL',
    grammarExplanation: `**Lesson 14: Back to School! Education Vocabulary 📚✏️**`,
    vocab: ['school', 'teacher', 'student', 'book', 'pen', 'study', 'learn', 'subject', 'class', 'homework']
  },
  {
    topic: 'Animals and Pets',
    grammarKey: 'A1_L15_ANIMALS',
    grammarExplanation: `**Lesson 15: Animals - Wild and Pets 🐕🦁🐈**`,
    vocab: ['dog', 'cat', 'bird', 'fish', 'animal', 'pet', 'can', 'swim', 'fly', 'run']
  },
  {
    topic: 'Review Test 3: Describing the World',
    grammarKey: 'A1_TEST3',
    grammarExplanation: `**🎯 Progress Check: Lessons 11-15**`,
    vocab: [],
    isTest: true
  },
  {
    topic: 'Shopping and Money',
    grammarKey: 'A1_L16_SHOPPING',
    grammarExplanation: `**Lesson 16: Let's Go Shopping! 🛍️💰**`,
    vocab: ['shop', 'buy', 'money', 'price', 'expensive', 'cheap', 'how much', 'cost', 'pay', 'euro']
  },
  {
    topic: 'Present Continuous',
    grammarKey: 'A1_L17_PRESENT_CONT',
    grammarExplanation: `**Lesson 17: What Are You Doing NOW? Present Continuous ⏰**`,
    vocab: ['doing', 'working', 'eating', 'reading', 'watching', 'now', 'at the moment', 'currently', 'right now', 'today']
  },
  {
    topic: 'Can and Can\'t - Abilities',
    grammarKey: 'A1_L18_CAN',
    grammarExplanation: `**Lesson 18: I Can Do It! Talking About Abilities 💪**`,
    vocab: ['can', 'cannot', 'able', 'ability', 'swim', 'drive', 'cook', 'speak', 'play', 'help']
  },
  {
    topic: 'Going to Future',
    grammarKey: 'A1_L19_GOING_TO',
    grammarExplanation: `**Lesson 19: Future Plans with "Going to" 📅**`,
    vocab: ['going to', 'plan', 'future', 'tomorrow', 'next', 'soon', 'visit', 'travel', 'will', 'tonight']
  },
  {
    topic: 'Prepositions and Directions',
    grammarKey: 'A1_L20_DIRECTIONS',
    grammarExplanation: `**Lesson 20: How Do I Get There? Giving Directions 🗺️**`,
    vocab: ['left', 'right', 'straight', 'turn', 'near', 'next to', 'opposite', 'between', 'direction', 'corner']
  },
  {
    topic: 'Review Test 4: Advanced Basics',
    grammarKey: 'A1_TEST4',
    grammarExplanation: `**🎯 Progress Check: Lessons 16-20**`,
    vocab: [],
    isTest: true
  },
  {
    topic: 'A1 Final Test: Complete Review',
    grammarKey: 'A1_FINAL',
    grammarExplanation: `**🏆 A1 FINAL TEST - Complete Level Review**

Congratulations on reaching the final test! 🎉`,
    vocab: [],
    isFinalTest: true
  }
];

// ============================================
// A2, B1, B2, C1 - ПОРОЖНІ (поки що)
// ============================================
const A2_TEMPLATES: Template[] = [];
const B1_TEMPLATES: Template[] = [];
const B2_TEMPLATES: Template[] = [];
const C1_TEMPLATES: Template[] = [];

// ============================================
// HELPER FUNCTIONS
// ============================================
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
  words: string[],
  correctSentence: string,
  exp: Record<string, string>
): Exercise {
  return {
    id,
    type: 'sentence_order',
    questionEN: prompt,
    words,
    correct: correctSentence,
    explanations: exp
  };
}

// ============================================
// BUILD EXERCISES
// ============================================
function buildRegularExercises(grammarKey: string, lessonId: string): Exercise[] {
  const ex: Exercise[] = [];

  if (grammarKey === 'A1_L1_BE_INTRO') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct form:', ['I am from Ukraine.', 'I is from Ukraine.', 'I are from Ukraine.', 'I be from Ukraine.'], 0,
        explain('Use "am" with "I"', 'Використовуй "am" з "I"', 'Используй "am" с "I"', 'Usa "am" con "I"')),
      mcq(`${lessonId}-e2`, 'Choose correct:', ['She is a teacher.', 'She am a teacher.', 'She are a teacher.', 'She be a teacher.'], 0,
        explain('Use "is" with he/she/it', 'Використовуй "is" з he/she/it', 'Используй "is" с he/she/it', 'Usa "is" con he/she/it')),
      fillBlank(`${lessonId}-e3`, 'Fill: They ___ students.', 'are',
        explain('Use "are" with they/we/you', 'Використовуй "are" з they/we/you', 'Используй "are" с they/we/you', 'Usa "are" con they/we/you')),
      mcq(`${lessonId}-e4`, 'What is the question form?', ['Are you a student?', 'You are a student?', 'Is you a student?', 'Am you a student?'], 0,
        explain('Questions: Are + you', 'Питання: Are + you', 'Вопрос: Are + you', 'Pregunta: Are + you')),
      sentenceOrder(`${lessonId}-e5`, 'Make a sentence:', ['Nice', 'to', 'meet', 'you'], 'Nice to meet you.',
        explain('Common greeting', 'Звичайне вітання', 'Обычное приветствие', 'Saludo común')),
      mcq(`${lessonId}-e6`, 'Negative form:', ['I am not tired.', 'I not am tired.', 'I amn\'t tired.', 'I no am tired.'], 0,
        explain('Negative: am/is/are + not', 'Заперечення: am/is/are + not', 'Отрицание: am/is/are + not', 'Negativo: am/is/are + not')),
      fillBlank(`${lessonId}-e7`, 'Fill: He ___ from Spain.', 'is',
        explain('"He" uses "is"', '"He" використовує "is"', '"He" использует "is"', '"He" usa "is"')),
      mcq(`${lessonId}-e8`, 'Choose correct:', ['We are friends.', 'We is friends.', 'We am friends.', 'We be friends.'], 0,
        explain('"We" uses "are"', '"We" використовує "are"', '"We" использует "are"', '"We" usa "are"')),
      sentenceOrder(`${lessonId}-e9`, 'Make a sentence:', ['My', 'name', 'is', 'Anna'], 'My name is Anna.',
        explain('Introducing yourself', 'Представлення себе', 'Представление себя', 'Presentándose')),
      fillBlank(`${lessonId}-e10`, 'Fill: You ___ welcome.', 'are',
        explain('"You" uses "are"', '"You" використовує "are"', '"You" использует "are"', '"You" usa "are"'))
    );
    return ex;
  }

  if (grammarKey === 'A1_L2_POSSESSIVE') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose correct:', ['This is my book.', 'This is me book.', 'This is mine book.', 'This is I book.'], 0,
        explain('"my" + noun', '"my" + іменник', '"my" + существительное', '"my" + sustantivo')),
      mcq(`${lessonId}-e2`, 'Choose correct:', ['Her name is Anna.', 'Hers name is Anna.', 'She name is Anna.', 'The her name is Anna.'], 0,
        explain('"her" before noun', '"her" перед іменником', '"her" перед существительным', '"her" antes del sustantivo')),
      fillBlank(`${lessonId}-e3`, 'Fill: This is ___ (we) house.', 'our',
        explain('we → our', 'we → our', 'we → our', 'we → our')),
      mcq(`${lessonId}-e4`, 'Choose correct:', ['His car is new.', 'He car is new.', 'Him car is new.', 'Hes car is new.'], 0,
        explain('"his" shows ownership', '"his" показує власність', '"his" показывает собственность', '"his" muestra posesión')),
      sentenceOrder(`${lessonId}-e5`, 'Make a sentence:', ['Their', 'dog', 'is', 'big'], 'Their dog is big.',
        explain('"their" + noun', '"their" + іменник', '"their" + существительное', '"their" + sustantivo')),
      fillBlank(`${lessonId}-e6`, 'Fill: Is this ___ (you) phone?', 'your',
        explain('you → your', 'you → your', 'you → your', 'you → your')),
      mcq(`${lessonId}-e7`, 'Choose correct:', ['Our family is big.', 'We family is big.', 'Us family is big.', 'Ours family is big.'], 0,
        explain('"our" before noun', '"our" перед іменником', '"our" перед существительным', '"our" antes del sustantivo')),
      sentenceOrder(`${lessonId}-e8`, 'Make a sentence:', ['This', 'is', 'my', 'sister'], 'This is my sister.',
        explain('Introducing family', 'Представлення сім\'ї', 'Представление семьи', 'Presentando familia')),
      fillBlank(`${lessonId}-e9`, 'Fill: ___ (She) name is Maria.', 'Her',
        explain('she → her', 'she → her', 'she → her', 'she → her')),
      mcq(`${lessonId}-e10`, 'Choose correct:', ['That is your bag.', 'That is you bag.', 'That is yours bag.', 'That is the your bag.'], 0,
        explain('"your" + noun', '"your" + іменник', '"your" + существительное', '"your" + sustantivo'))
    );
    return ex;
  }

  // FALLBACK для всіх інших уроків
  ex.push(
    mcq(`${lessonId}-e1`, 'Choose the best answer:', ['This is correct.', 'This are correct.', 'This be correct.', 'This being correct.'], 0,
      explain('Correct grammar', 'Правильна граматика', 'Правильная грамматика', 'Gramática correcta')),
    fillBlank(`${lessonId}-e2`, 'Fill: I ___ English.', 'study',
      explain('Common verb', 'Поширене дієслово', 'Обычный глагол', 'Verbo común')),
    mcq(`${lessonId}-e3`, 'Choose correct:', ['What do you do?', 'What you do?', 'What does you do?', 'What do you does?'], 0,
      explain('Question form', 'Питальна форма', 'Вопросительная форма', 'Forma interrogativa')),
    sentenceOrder(`${lessonId}-e4`, 'Make a sentence:', ['I', 'like', 'English'], 'I like English.',
      explain('Natural order', 'Природній порядок', 'Естественный порядок', 'Orden natural')),
    fillBlank(`${lessonId}-e5`, 'Fill: She ___ to school.', 'goes',
      explain('Add -es for she/he/it', 'Додай -es для she/he/it', 'Добавь -es для she/he/it', 'Añade -es para she/he/it')),
    mcq(`${lessonId}-e6`, 'Negative form:', ['I don\'t like it.', 'I no like it.', 'I not like it.', 'I doesn\'t like it.'], 0,
      explain('don\'t + verb', 'don\'t + дієслово', 'don\'t + глагол', 'don\'t + verbo')),
    sentenceOrder(`${lessonId}-e7`, 'Make a sentence:', ['They', 'are', 'happy'], 'They are happy.',
      explain('Simple sentence', 'Просте речення', 'Простое предложение', 'Oración simple')),
    fillBlank(`${lessonId}-e8`, 'Fill: We ___ in class.', 'are',
      explain('We uses "are"', 'We використовує "are"', 'We использует "are"', 'We usa "are"')),
    mcq(`${lessonId}-e9`, 'Choose correct:', ['He is tall.', 'He are tall.', 'He am tall.', 'He be tall.'], 0,
      explain('He uses "is"', 'He використовує "is"', 'He использует "is"', 'He usa "is"')),
    sentenceOrder(`${lessonId}-e10`, 'Make a sentence:', ['She', 'likes', 'music'], 'She likes music.',
      explain('Add -s for she', 'Додай -s для she', 'Добавь -s для she', 'Añade -s para she'))
  );

  return ex;
}

function buildTestExercises(lessonId: string, testType: 'review' | 'final'): Exercise[] {
  const ex: Exercise[] = [];
  const count = testType === 'final' ? 20 : 10;

  for (let i = 0; i < count; i++) {
    ex.push(
      mcq(`${lessonId}-e${i + 1}`, `Test question ${i + 1}:`, 
        ['Correct answer', 'Wrong answer 1', 'Wrong answer 2', 'Wrong answer 3'], 0,
        explain('This tests your knowledge', 'Це перевіряє твої знання', 'Это проверяет твои знания', 'Esto prueba tus conocimientos'))
    );
  }

  return ex;
}

function generateLesson(level: CEFRLevel, lessonIndex: number, template: Template): Lesson {
  const lessonId = `${level.toLowerCase()}-l${lessonIndex + 1}`;

  let exercises: Exercise[];
  let lessonType: Lesson['type'];
  let xp: number;

  if (template.isFinalTest) {
    exercises = buildTestExercises(lessonId, 'final');
    lessonType = 'final_test';
    xp = XP_BASE[level] * 2;
  } else if (template.isTest) {
    exercises = buildTestExercises(lessonId, 'review');
    lessonType = 'review';
    xp = XP_BASE[level] * 1.5;
  } else {
    exercises = buildRegularExercises(template.grammarKey, lessonId);
    lessonType = 'grammar';
    xp = XP_BASE[level];
  }

  return {
    id: lessonId,
    titleEN: template.topic,
    type: lessonType,
    level,
    xp,
    storyEN: template.grammarExplanation,
    exercises,
    vocabulary: vocabToItems(template.vocab)
  };
}

export function generateCurriculum(): Record<CEFRLevel, LevelCurriculum> {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const curriculum = {} as Record<CEFRLevel, LevelCurriculum>;

  const allTemplates: Record<CEFRLevel, Template[]> = {
    A1: A1_TEMPLATES,
    A2: A2_TEMPLATES,
    B1: B1_TEMPLATES,
    B2: B2_TEMPLATES,
    C1: C1_TEMPLATES
  };

  for (const level of levels) {
    const templates = allTemplates[level] ?? [];
    const lessons = templates.map((t, i) => generateLesson(level, i, t));

    const lessonsPerUnit = 6;
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

export function generateLessonsByLevel(level: CEFRLevel, count: number = 25): Lesson[] {
  const templates: Record<CEFRLevel, Template[]> = {
    A1: A1_TEMPLATES,
    A2: A2_TEMPLATES,
    B1: B1_TEMPLATES,
    B2: B2_TEMPLATES,
    C1: C1_TEMPLATES
  };
  
  const levelTemplates = (templates[level] ?? []).slice(0, count);
  return levelTemplates.map((t, i) => generateLesson(level, i, t));
}

export function generateSingleLesson(level: CEFRLevel, topic: string, grammar: string, storyEN: string): Lesson {
  const template: Template = {
    topic,
    grammarKey: 'A1_L1_BE_INTRO',
    grammarExplanation: storyEN || `A short story about ${topic}.`,
    vocab: [grammar, topic, 'example', 'practice', 'learn']
  };

  return generateLesson(level, 0, template);
}
