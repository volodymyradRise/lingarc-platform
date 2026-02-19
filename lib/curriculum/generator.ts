// lib/curriculum/generator.ts
import type { CEFRLevel, SupportedLanguage } from '../i18n/types';

interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'sentence_order' | 'word_match';
  questionEN: string;
  options?: string[];
  correct: number | string;
  explanations: Record<string, string>;
}

interface VocabularyItem {
  wordEN: string;
  translations: {
    uk: string;
    ru: string;
    es: string;
  };
}

interface Lesson {
  id: string;
  titleEN: string;
  type: 'grammar' | 'vocabulary' | 'reading' | 'listening';
  level: CEFRLevel;
  xp: number;
  storyEN: string;
  exercises: Exercise[];
  vocabulary: VocabularyItem[];
}

interface Unit {
  id: string;
  titleEN: string;
  icon: string;
  lessons: Lesson[];
}

interface LevelCurriculum {
  level: CEFRLevel;
  units: Unit[];
}

const LESSON_TEMPLATES = {
  A1: [
    { topic: 'Personal Information', grammar: 'verb to be', story: 'basic introductions' },
    { topic: 'Family Members', grammar: 'possessive adjectives', story: 'describing family' },
    { topic: 'Numbers and Age', grammar: 'questions with how', story: 'birthday party' },
    { topic: 'Daily Activities', grammar: 'present simple', story: 'typical day' },
    { topic: 'Food and Drinks', grammar: 'like/want + noun', story: 'at restaurant' },
    { topic: 'Colors and Objects', grammar: 'adjectives', story: 'shopping' },
    { topic: 'Time and Schedule', grammar: 'prepositions of time', story: 'planning day' },
    { topic: 'Weather', grammar: 'present continuous', story: 'seasons' },
    { topic: 'Locations', grammar: 'there is/are', story: 'describing places' },
    { topic: 'Transportation', grammar: 'prepositions of movement', story: 'going somewhere' },
    { topic: 'Jobs and Work', grammar: 'simple questions', story: 'careers' },
    { topic: 'Hobbies', grammar: 'frequency adverbs', story: 'free time' },
    { topic: 'Body Parts', grammar: 'imperatives', story: 'exercise' },
    { topic: 'Clothing', grammar: 'present continuous for wearing', story: 'getting dressed' },
    { topic: 'House and Rooms', grammar: 'prepositions of place', story: 'home tour' },
    { topic: 'School Subjects', grammar: 'like/dislike + gerund', story: 'at school' },
    { topic: 'Animals', grammar: 'can/cannot', story: 'zoo visit' },
    { topic: 'Shopping', grammar: 'how much/many', story: 'buying items' },
    { topic: 'Holidays', grammar: 'going to future', story: 'vacation plans' },
    { topic: 'Common Verbs Review', grammar: 'mixed tenses', story: 'daily routine' }
  ],
  A2: [
    { topic: 'Past Experiences', grammar: 'past simple regular', story: 'last weekend' },
    { topic: 'Irregular Verbs', grammar: 'past simple irregular', story: 'childhood memories' },
    { topic: 'Future Plans', grammar: 'will vs going to', story: 'next year' },
    { topic: 'Comparisons', grammar: 'comparative adjectives', story: 'two cities' },
    { topic: 'Superlatives', grammar: 'superlative adjectives', story: 'world records' },
    { topic: 'Quantity', grammar: 'much/many/some/any', story: 'grocery shopping' },
    { topic: 'Advice', grammar: 'should/shouldnt', story: 'health tips' },
    { topic: 'Obligations', grammar: 'have to/must', story: 'rules' },
    { topic: 'Abilities', grammar: 'can/could', story: 'skills' },
    { topic: 'Permission', grammar: 'may/might', story: 'asking politely' },
    { topic: 'Conditionals Type 0', grammar: 'if + present simple', story: 'general truths' },
    { topic: 'Conditionals Type 1', grammar: 'if + will', story: 'possible situations' },
    { topic: 'Present Perfect Introduction', grammar: 'have/has + past participle', story: 'life experiences' },
    { topic: 'Time Expressions', grammar: 'already/yet/just', story: 'recent events' },
    { topic: 'Questions Formation', grammar: 'wh-questions', story: 'interview' },
    { topic: 'Adverbs of Manner', grammar: 'adjective + ly', story: 'how things happen' },
    { topic: 'Linking Words', grammar: 'and/but/because', story: 'storytelling' },
    { topic: 'There was/were', grammar: 'past existence', story: 'history' },
    { topic: 'Used to', grammar: 'past habits', story: 'how things changed' },
    { topic: 'Review Mixed Tenses', grammar: 'all A2 grammar', story: 'comprehensive story' }
  ],
  B1: [
    { topic: 'Present Perfect vs Past Simple', grammar: 'finished vs unfinished time', story: 'work experience' },
    { topic: 'Present Perfect Continuous', grammar: 'duration emphasis', story: 'ongoing activities' },
    { topic: 'Past Continuous', grammar: 'interrupted actions', story: 'what was happening' },
    { topic: 'Past Perfect', grammar: 'earlier past', story: 'regrets' },
    { topic: 'Future Continuous', grammar: 'future in progress', story: 'this time tomorrow' },
    { topic: 'Future Perfect', grammar: 'completion by future time', story: 'achievements' },
    { topic: 'Conditionals Type 2', grammar: 'unreal present', story: 'imaginary situations' },
    { topic: 'Conditionals Type 3', grammar: 'unreal past', story: 'missed opportunities' },
    { topic: 'Modal Verbs of Deduction', grammar: 'must/might/cant be', story: 'mysteries' },
    { topic: 'Passive Voice Present', grammar: 'is/are + past participle', story: 'processes' },
    { topic: 'Passive Voice Past', grammar: 'was/were + past participle', story: 'inventions' },
    { topic: 'Reported Speech Statements', grammar: 'say/tell + that', story: 'gossip' },
    { topic: 'Reported Speech Questions', grammar: 'ask + if/wh', story: 'survey results' },
    { topic: 'Relative Clauses Defining', grammar: 'who/which/that', story: 'descriptions' },
    { topic: 'Relative Clauses Non-defining', grammar: 'commas + who/which', story: 'extra information' },
    { topic: 'Gerunds and Infinitives', grammar: 'verb patterns', story: 'preferences' },
    { topic: 'Articles', grammar: 'a/an/the/zero', story: 'specificity' },
    { topic: 'Quantifiers', grammar: 'few/little/several', story: 'amounts' },
    { topic: 'Phrasal Verbs', grammar: 'verb + preposition', story: 'everyday actions' },
    { topic: 'Mixed Tenses Review', grammar: 'all B1 structures', story: 'comprehensive narrative' }
  ],
  B2: [
    { topic: 'Advanced Perfect Tenses', grammar: 'perfect aspect usage', story: 'complex timelines' },
    { topic: 'Passive with Modals', grammar: 'modal + be + past participle', story: 'obligations and possibilities' },
    { topic: 'Passive Reporting Structures', grammar: 'it is said that', story: 'news reports' },
    { topic: 'Causative Have/Get', grammar: 'have/get something done', story: 'services' },
    { topic: 'Mixed Conditionals', grammar: 'combining types', story: 'complex hypotheticals' },
    { topic: 'Wish and Regrets', grammar: 'wish + past/would', story: 'desires' },
    { topic: 'Cleft Sentences', grammar: 'what/it is...that', story: 'emphasis' },
    { topic: 'Inversion', grammar: 'negative adverbials', story: 'formal writing' },
    { topic: 'Subjunctive', grammar: 'formal suggestions', story: 'recommendations' },
    { topic: 'Advanced Linking', grammar: 'despite/although', story: 'contrasts' },
    { topic: 'Participle Clauses', grammar: 'reduced relative clauses', story: 'concise writing' },
    { topic: 'Noun Phrases', grammar: 'complex subjects', story: 'academic style' },
    { topic: 'Advanced Modals', grammar: 'may well/could have', story: 'speculation' },
    { topic: 'Conditionals in Context', grammar: 'mixed uses', story: 'negotiations' },
    { topic: 'Discourse Markers', grammar: 'furthermore/moreover', story: 'argumentation' },
    { topic: 'Emphasis Structures', grammar: 'do/does/did emphasis', story: 'persuasion' },
    { topic: 'Substitution', grammar: 'so/neither/nor', story: 'avoiding repetition' },
    { topic: 'Ellipsis', grammar: 'omitting understood words', story: 'natural speech' },
    { topic: 'Fronting', grammar: 'topic-comment structure', story: 'information flow' },
    { topic: 'Comprehensive Review', grammar: 'all B2 structures', story: 'integrated skills' }
  ],
  C1: [
    { topic: 'Stylistic Inversion', grammar: 'literary devices', story: 'formal registers' },
    { topic: 'Nominalisation', grammar: 'verb to noun conversion', story: 'academic writing' },
    { topic: 'Hedging Language', grammar: 'tentative expressions', story: 'scholarly discourse' },
    { topic: 'Stance Markers', grammar: 'personal positioning', story: 'critical analysis' },
    { topic: 'Metadiscourse', grammar: 'text organization signals', story: 'coherent arguments' },
    { topic: 'Complex Conditionals', grammar: 'layered hypotheticals', story: 'philosophical discussions' },
    { topic: 'Subjunctive Moods', grammar: 'formal demands', story: 'legal language' },
    { topic: 'Split Infinitives', grammar: 'stylistic choices', story: 'nuanced meaning' },
    { topic: 'Nested Clauses', grammar: 'embedded structures', story: 'sophisticated sentences' },
    { topic: 'Apposition', grammar: 'noun phrase elaboration', story: 'detailed descriptions' },
    { topic: 'Parallelism', grammar: 'balanced structures', story: 'rhetorical effect' },
    { topic: 'Antithesis', grammar: 'contrasting ideas', story: 'persuasive techniques' },
    { topic: 'Chiasmus', grammar: 'inverted parallelism', story: 'memorable phrasing' },
    { topic: 'Litotes', grammar: 'understatement', story: 'subtle communication' },
    { topic: 'Zeugma', grammar: 'economical expression', story: 'linguistic creativity' },
    { topic: 'Register Shifts', grammar: 'contextual appropriacy', story: 'code-switching' },
    { topic: 'Pragmatic Markers', grammar: 'interpersonal functions', story: 'conversational management' },
    { topic: 'Evaluative Language', grammar: 'attitudinal lexis', story: 'critical stance' },
    { topic: 'Cohesive Devices', grammar: 'textual integration', story: 'seamless writing' },
    { topic: 'Integrated Mastery', grammar: 'all advanced features', story: 'professional competence' }
  ]
};

const VOCABULARY_BANKS = {
  A1: [
    ['hello', 'goodbye', 'please', 'thank you', 'yes', 'no', 'sorry', 'excuse me', 'help', 'name'],
    ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'child', 'parent', 'family', 'baby'],
    ['one', 'two', 'three', 'ten', 'twenty', 'hundred', 'age', 'year', 'old', 'young'],
    ['eat', 'sleep', 'work', 'study', 'walk', 'run', 'sit', 'stand', 'open', 'close'],
    ['water', 'bread', 'rice', 'meat', 'fruit', 'vegetable', 'hungry', 'thirsty', 'delicious', 'hot'],
    ['red', 'blue', 'green', 'yellow', 'big', 'small', 'new', 'old', 'good', 'bad'],
    ['morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'yesterday', 'week', 'month', 'year'],
    ['sunny', 'rainy', 'cloudy', 'windy', 'cold', 'warm', 'hot', 'cool', 'weather', 'temperature'],
    ['here', 'there', 'near', 'far', 'left', 'right', 'up', 'down', 'inside', 'outside'],
    ['car', 'bus', 'train', 'plane', 'walk', 'drive', 'travel', 'arrive', 'leave', 'station']
  ],
  A2: [
    ['bought', 'went', 'saw', 'came', 'took', 'gave', 'made', 'found', 'left', 'met'],
    ['grew', 'knew', 'thought', 'brought', 'taught', 'caught', 'wore', 'won', 'lost', 'felt'],
    ['tomorrow', 'next', 'soon', 'later', 'future', 'plan', 'hope', 'expect', 'predict', 'decide'],
    ['bigger', 'smaller', 'faster', 'slower', 'better', 'worse', 'more', 'less', 'than', 'as'],
    ['best', 'worst', 'fastest', 'slowest', 'most', 'least', 'highest', 'lowest', 'ever', 'never'],
    ['much', 'many', 'some', 'any', 'few', 'little', 'enough', 'plenty', 'several', 'couple'],
    ['should', 'advice', 'recommend', 'suggest', 'better', 'healthy', 'unhealthy', 'wise', 'careful', 'safe'],
    ['must', 'have to', 'need', 'required', 'necessary', 'rule', 'law', 'obligation', 'duty', 'responsibility'],
    ['can', 'could', 'able', 'skill', 'talent', 'capacity', 'manage', 'succeed', 'achieve', 'accomplish'],
    ['may', 'might', 'perhaps', 'possibly', 'probably', 'permission', 'allow', 'permit', 'let', 'authorize']
  ],
  B1: [
    ['experience', 'recently', 'already', 'yet', 'ever', 'never', 'just', 'since', 'for', 'during'],
    ['while', 'when', 'suddenly', 'interrupt', 'meanwhile', 'simultaneously', 'ongoing', 'progress', 'duration', 'continue'],
    ['before', 'after', 'earlier', 'previously', 'prior', 'sequence', 'chronology', 'timeline', 'order', 'succession'],
    ['imagine', 'suppose', 'pretend', 'hypothetical', 'unreal', 'wish', 'if only', 'unfortunately', 'regret', 'mistake'],
    ['certainly', 'definitely', 'probably', 'possibly', 'obviously', 'clearly', 'apparently', 'seemingly', 'allegedly', 'reportedly'],
    ['process', 'produce', 'manufacture', 'create', 'generate', 'construct', 'assemble', 'build', 'develop', 'establish'],
    ['claim', 'state', 'mention', 'report', 'announce', 'declare', 'assert', 'maintain', 'argue', 'suggest'],
    ['describe', 'define', 'identify', 'specify', 'characterize', 'distinguish', 'recognize', 'determine', 'establish', 'clarify'],
    ['achieve', 'accomplish', 'attain', 'reach', 'obtain', 'acquire', 'gain', 'secure', 'earn', 'realize'],
    ['prefer', 'enjoy', 'avoid', 'consider', 'practice', 'continue', 'finish', 'stop', 'keep', 'quit']
  ],
  B2: [
    ['accomplish', 'achieve', 'acquire', 'adapt', 'advocate', 'allocate', 'ambiguous', 'anticipate', 'arbitrary', 'assert'],
    ['assume', 'attain', 'attribute', 'clarify', 'coincide', 'collapse', 'commence', 'compensate', 'complement', 'comprehensive'],
    ['comprise', 'conceive', 'conform', 'consent', 'consequent', 'considerable', 'consistent', 'constrain', 'constitute', 'contemporary'],
    ['context', 'contract', 'contradict', 'contrary', 'contribute', 'controversy', 'convene', 'converse', 'convert', 'cooperate'],
    ['coordinate', 'corporate', 'correspond', 'criteria', 'crucial', 'despite', 'detect', 'deviate', 'device', 'diminish'],
    ['discrete', 'discriminate', 'displace', 'dispose', 'distinct', 'distort', 'distribute', 'diverge', 'diverse', 'dominate'],
    ['duration', 'dynamic', 'eliminate', 'emerge', 'emphasis', 'empirical', 'enable', 'encounter', 'enhance', 'enormous'],
    ['ensure', 'entity', 'environment', 'equate', 'equivalent', 'erode', 'establish', 'estimate', 'ethic', 'ethnic'],
    ['evaluate', 'eventual', 'evident', 'evolve', 'exceed', 'exclude', 'exhibit', 'expand', 'explicit', 'exploit'],
    ['external', 'extract', 'facilitate', 'factor', 'feature', 'federal', 'finite', 'fluctuate', 'format', 'foundation']
  ],
  C1: [
    ['abstract', 'accommodate', 'accumulate', 'acknowledge', 'adequacy', 'adhere', 'adjacent', 'advocate', 'aesthetic', 'aggregate'],
    ['albeit', 'allocate', 'ambiguity', 'analogous', 'anomaly', 'anticipate', 'arbitrary', 'articulate', 'ascertain', 'aspire'],
    ['assimilate', 'attenuate', 'augment', 'auspicious', 'authenticate', 'autonomous', 'belligerent', 'benevolent', 'bilateral', 'bolster'],
    ['bureaucracy', 'catalyst', 'coalesce', 'coerce', 'cogent', 'coherent', 'cohesive', 'collateral', 'commence', 'commodity'],
    ['complementary', 'compliance', 'comprehensive', 'comprise', 'concurrent', 'condone', 'conducive', 'confer', 'configuration', 'confine'],
    ['congenial', 'conjecture', 'consensus', 'construe', 'contemplate', 'contentious', 'contiguous', 'contingent', 'contradict', 'converge'],
    ['correlation', 'corroborate', 'criterion', 'critique', 'cumulative', 'curtail', 'deference', 'definitive', 'deliberate', 'delineate'],
    ['denote', 'deplete', 'depreciate', 'deride', 'derivative', 'detrimental', 'deviate', 'differentiate', 'digress', 'dilute'],
    ['diminish', 'discern', 'discretion', 'discriminate', 'disparate', 'disparity', 'disperse', 'displace', 'disposition', 'disseminate'],
    ['distort', 'diverge', 'domain', 'dynamic', 'efficacy', 'elaborate', 'elicit', 'elucidate', 'embody', 'empirical']
  ]
};

function generateLesson(
  level: CEFRLevel,
  lessonIndex: number,
  template: { topic: string; grammar: string; story: string }
): Lesson {
  const lessonId = `${level.toLowerCase()}-l${lessonIndex + 1}`;
  const xpBase = { A1: 20, A2: 25, B1: 30, B2: 40, C1: 50 };
  
  const vocab = VOCABULARY_BANKS[level][lessonIndex] || VOCABULARY_BANKS[level][0];
  const vocabularyItems: VocabularyItem[] = vocab.map(word => ({
    wordEN: word,
    translations: {
      uk: `[${word}_uk]`,
      ru: `[${word}_ru]`,
      es: `[${word}_es]`
    }
  }));

  const exercises: Exercise[] = [];
  for (let i = 0; i < 5; i++) {
    exercises.push({
      id: `${lessonId}-e${i + 1}`,
      type: 'multiple_choice',
      questionEN: `Which sentence correctly uses ${template.grammar}?`,
      options: [
        `Option A for ${template.topic}`,
        `Option B for ${template.topic}`,
        `Option C for ${template.topic}`,
        `Option D for ${template.topic}`
      ],
      correct: i % 4,
      explanations: {
        en: `This sentence demonstrates proper use of ${template.grammar} in the context of ${template.topic}.`,
        uk: `Це речення демонструє правильне використання ${template.grammar} у контексті ${template.topic}.`,
        ru: `Это предложение демонстрирует правильное использование ${template.grammar} в контексте ${template.topic}.`,
        es: `Esta oración demuestra el uso correcto de ${template.grammar} en el contexto de ${template.topic}.`
      }
    });
  }

  return {
    id: lessonId,
    titleEN: template.topic,
    type: 'grammar',
    level,
    xp: xpBase[level],
    storyEN: `A contextual story about ${template.story} demonstrating ${template.grammar}. The narrative includes practical examples and real-world usage.`,
    exercises,
    vocabulary: vocabularyItems
  };
}

export function generateCurriculum(): Record<CEFRLevel, LevelCurriculum> {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const curriculum: Record<CEFRLevel, LevelCurriculum> = {} as any;

  for (const level of levels) {
    const templates = LESSON_TEMPLATES[level];
    const lessons: Lesson[] = templates.map((template, index) => 
      generateLesson(level, index, template)
    );

    const units: Unit[] = [];
    const lessonsPerUnit = 5;
    const unitCount = Math.ceil(lessons.length / lessonsPerUnit);

    for (let i = 0; i < unitCount; i++) {
      const unitLessons = lessons.slice(i * lessonsPerUnit, (i + 1) * lessonsPerUnit);
      units.push({
        id: `${level.toLowerCase()}-u${i + 1}`,
        titleEN: `${level} Unit ${i + 1}`,
        icon: ['📚', '✏️', '🎯', '🌟'][i % 4],
        lessons: unitLessons
      });
    }

    curriculum[level] = {
      level,
      units
    };
  }

  return curriculum;
}

export function generateLessonsByLevel(level: CEFRLevel, count: number = 20): Lesson[] {
  const templates = LESSON_TEMPLATES[level].slice(0, count);
  return templates.map((template, index) => generateLesson(level, index, template));
}

export function generateSingleLesson(
  level: CEFRLevel,
  topic: string,
  grammar: string,
  story: string
): Lesson {
  return generateLesson(level, 0, { topic, grammar, story });
}
