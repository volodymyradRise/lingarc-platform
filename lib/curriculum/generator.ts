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

type Template = {
  topic: string;
  grammarKey: GrammarKey;
  storyEN: string;
  vocab: string[];
};

type GrammarKey =
  // A1 (30 topics)
  | 'A1_BE_PRESENT'
  | 'A1_BE_QUESTIONS'
  | 'A1_BE_NEGATIVE'
  | 'A1_POSSESSIVE_ADJ'
  | 'A1_POSSESSIVE_S'
  | 'A1_ARTICLES'
  | 'A1_THIS_THAT'
  | 'A1_PLURAL_NOUNS'
  | 'A1_PRESENT_SIMPLE_I_YOU'
  | 'A1_PRESENT_SIMPLE_HE_SHE'
  | 'A1_PRESENT_SIMPLE_QUESTIONS'
  | 'A1_PRESENT_SIMPLE_NEGATIVE'
  | 'A1_LIKE_WANT'
  | 'A1_HAVE_GOT'
  | 'A1_CAN_ABILITY'
  | 'A1_CAN_PERMISSION'
  | 'A1_THERE_IS_ARE'
  | 'A1_PREPOSITIONS_PLACE'
  | 'A1_PREPOSITIONS_TIME'
  | 'A1_ADJECTIVES_ORDER'
  | 'A1_ADVERBS_FREQUENCY'
  | 'A1_COUNTABLE_UNCOUNTABLE'
  | 'A1_SOME_ANY'
  | 'A1_HOW_MUCH_MANY'
  | 'A1_PRESENT_CONTINUOUS'
  | 'A1_IMPERATIVE'
  | 'A1_WH_QUESTIONS'
  | 'A1_OBJECT_PRONOUNS'
  | 'A1_WHOSE'
  | 'A1_GOING_TO_FUTURE'
  // A2 (30 topics)
  | 'A2_PAST_SIMPLE_REGULAR'
  | 'A2_PAST_SIMPLE_IRREGULAR'
  | 'A2_PAST_SIMPLE_QUESTIONS'
  | 'A2_PAST_SIMPLE_NEGATIVE'
  | 'A2_PAST_CONTINUOUS'
  | 'A2_PAST_CONTINUOUS_VS_SIMPLE'
  | 'A2_USED_TO'
  | 'A2_FUTURE_WILL'
  | 'A2_WILL_VS_GOING_TO'
  | 'A2_PRESENT_CONTINUOUS_FUTURE'
  | 'A2_COMPARATIVES'
  | 'A2_SUPERLATIVES'
  | 'A2_AS_AS'
  | 'A2_MUCH_MANY_MORE'
  | 'A2_SHOULD_OUGHT_TO'
  | 'A2_HAVE_TO_MUST'
  | 'A2_DONT_HAVE_TO_MUSTNT'
  | 'A2_MAY_MIGHT_PERMISSION'
  | 'A2_INFINITIVE_PURPOSE'
  | 'A2_WOULD_LIKE'
  | 'A2_TOO_ENOUGH'
  | 'A2_PRESENT_PERFECT_JUST_ALREADY'
  | 'A2_PRESENT_PERFECT_YET'
  | 'A2_PRESENT_PERFECT_EVER_NEVER'
  | 'A2_PRESENT_PERFECT_FOR_SINCE'
  | 'A2_SOMETHING_ANYTHING'
  | 'A2_FIRST_CONDITIONAL'
  | 'A2_CONNECTING_WORDS'
  | 'A2_QUESTIONS_TAGS'
  | 'A2_REFLEXIVE_PRONOUNS'
  // B1 (30 topics)
  | 'B1_PRESENT_PERFECT_VS_PAST'
  | 'B1_PRESENT_PERFECT_CONTINUOUS'
  | 'B1_PAST_PERFECT'
  | 'B1_PAST_PERFECT_CONTINUOUS'
  | 'B1_FUTURE_PERFECT'
  | 'B1_FUTURE_CONTINUOUS'
  | 'B1_MIXED_FUTURES'
  | 'B1_ZERO_CONDITIONAL'
  | 'B1_SECOND_CONDITIONAL'
  | 'B1_THIRD_CONDITIONAL'
  | 'B1_WISH_PAST'
  | 'B1_WISH_PRESENT'
  | 'B1_PASSIVE_PRESENT'
  | 'B1_PASSIVE_PAST'
  | 'B1_PASSIVE_FUTURE'
  | 'B1_PASSIVE_CONTINUOUS'
  | 'B1_REPORTED_SPEECH_STATEMENTS'
  | 'B1_REPORTED_SPEECH_QUESTIONS'
  | 'B1_REPORTED_COMMANDS'
  | 'B1_DEFINING_RELATIVE_CLAUSES'
  | 'B1_NON_DEFINING_RELATIVE_CLAUSES'
  | 'B1_RELATIVE_PRONOUNS'
  | 'B1_GERUNDS'
  | 'B1_INFINITIVES'
  | 'B1_GERUND_VS_INFINITIVE'
  | 'B1_MODAL_DEDUCTION_PRESENT'
  | 'B1_MODAL_DEDUCTION_PAST'
  | 'B1_PHRASAL_VERBS_1'
  | 'B1_PHRASAL_VERBS_2'
  | 'B1_CAUSATIVE_HAVE'
  // B2 (30 topics)
  | 'B2_ADVANCED_PERFECT_FORMS'
  | 'B2_MIXED_CONDITIONALS'
  | 'B2_UNREAL_PAST'
  | 'B2_PASSIVE_MODALS'
  | 'B2_PASSIVE_PERFECT'
  | 'B2_PASSIVE_REPORTING'
  | 'B2_CLEFT_SENTENCES_WHAT'
  | 'B2_CLEFT_SENTENCES_IT'
  | 'B2_EMPHASIS_DO'
  | 'B2_INVERSION_NEGATIVE'
  | 'B2_INVERSION_CONDITIONALS'
  | 'B2_INVERSION_SO_SUCH'
  | 'B2_SUBJUNCTIVE'
  | 'B2_PARTICIPLE_CLAUSES'
  | 'B2_REDUCED_RELATIVE_CLAUSES'
  | 'B2_NOUN_CLAUSES'
  | 'B2_ADVANCED_RELATIVES'
  | 'B2_QUANTIFIERS'
  | 'B2_DISCOURSE_MARKERS'
  | 'B2_LINKING_CONTRAST'
  | 'B2_LINKING_CAUSE_EFFECT'
  | 'B2_ELLIPSIS'
  | 'B2_SUBSTITUTION'
  | 'B2_FRONTING'
  | 'B2_ADVANCED_MODALS'
  | 'B2_FUTURE_IN_PAST'
  | 'B2_ADVANCED_COMPARATIVES'
  | 'B2_CAUSATIVE_GET'
  | 'B2_PHRASAL_VERBS_3'
  | 'B2_COLLOCATIONS'
  // C1 (30 topics)
  | 'C1_INVERSION_STYLISTIC'
  | 'C1_INVERSION_LITERARY'
  | 'C1_CLEFT_ADVANCED'
  | 'C1_SUBJUNCTIVE_ADVANCED'
  | 'C1_NOMINALISATION'
  | 'C1_HEDGING'
  | 'C1_STANCE_MARKERS'
  | 'C1_METADISCOURSE'
  | 'C1_PARALLELISM'
  | 'C1_ANTITHESIS'
  | 'C1_CHIASMUS'
  | 'C1_LITOTES'
  | 'C1_ZEUGMA'
  | 'C1_REGISTER_SHIFTS'
  | 'C1_PRAGMATIC_MARKERS'
  | 'C1_EVALUATIVE_LANGUAGE'
  | 'C1_COHESIVE_DEVICES'
  | 'C1_COMPLEX_CONDITIONALS'
  | 'C1_NESTED_CLAUSES'
  | 'C1_APPOSITION'
  | 'C1_ADVANCED_PASSIVE'
  | 'C1_PARTICIPLE_ADVANCED'
  | 'C1_ABSTRACT_NOUNS'
  | 'C1_ACADEMIC_VOCABULARY'
  | 'C1_ADVANCED_LINKING'
  | 'C1_NOUN_PHRASES_COMPLEX'
  | 'C1_MODAL_NUANCES'
  | 'C1_SPLIT_INFINITIVES'
  | 'C1_STYLISTIC_VARIATION'
  | 'C1_INTEGRATED_SKILLS';

const XP_BASE: Record<CEFRLevel, number> = {
  A1: 20,
  A2: 25,
  B1: 30,
  B2: 40,
  C1: 50
};

const ICONS = ['📚', '✏️', '🎯', '🌟', '⭐', '💎'];

const LESSON_TEMPLATES: Record<CEFRLevel, Template[]> = {
  A1: [
    {
      topic: 'Be: Affirmative',
      grammarKey: 'A1_BE_PRESENT',
      storyEN: 'You introduce yourself: your name, where you are from, and your job.',
      vocab: ['am', 'is', 'are', 'name', 'from', 'country', 'teacher', 'student', 'doctor', 'engineer']
    },
    {
      topic: 'Be: Questions',
      grammarKey: 'A1_BE_QUESTIONS',
      storyEN: 'You ask someone about their identity and origin.',
      vocab: ['where', 'what', 'who', 'question', 'answer', 'ask', 'tell', 'say', 'speak', 'language']
    },
    {
      topic: 'Be: Negative',
      grammarKey: 'A1_BE_NEGATIVE',
      storyEN: 'You talk about things that are not true about you.',
      vocab: ['not', 'isn\'t', 'aren\'t', 'no', 'never', 'wrong', 'false', 'correct', 'true', 'right']
    },
    {
      topic: 'Possessive Adjectives',
      grammarKey: 'A1_POSSESSIVE_ADJ',
      storyEN: 'You describe your family and friends.',
      vocab: ['my', 'your', 'his', 'her', 'our', 'their', 'family', 'friend', 'sister', 'brother']
    },
    {
      topic: 'Possessive \'s',
      grammarKey: 'A1_POSSESSIVE_S',
      storyEN: 'You talk about things that belong to people.',
      vocab: ['John\'s', 'book', 'pen', 'bag', 'car', 'house', 'phone', 'computer', 'desk', 'chair']
    },
    {
      topic: 'Articles: a/an/the',
      grammarKey: 'A1_ARTICLES',
      storyEN: 'You describe objects and use articles correctly.',
      vocab: ['apple', 'orange', 'book', 'table', 'chair', 'door', 'window', 'wall', 'floor', 'ceiling']
    },
    {
      topic: 'This/That/These/Those',
      grammarKey: 'A1_THIS_THAT',
      storyEN: 'You point at things near and far from you.',
      vocab: ['this', 'that', 'these', 'those', 'here', 'there', 'near', 'far', 'close', 'away']
    },
    {
      topic: 'Plural Nouns',
      grammarKey: 'A1_PLURAL_NOUNS',
      storyEN: 'You count and describe multiple objects.',
      vocab: ['cats', 'dogs', 'books', 'pens', 'boxes', 'dishes', 'children', 'men', 'women', 'people']
    },
    {
      topic: 'Present Simple: I/You',
      grammarKey: 'A1_PRESENT_SIMPLE_I_YOU',
      storyEN: 'You talk about your daily habits.',
      vocab: ['work', 'study', 'live', 'speak', 'eat', 'drink', 'sleep', 'wake', 'start', 'finish']
    },
    {
      topic: 'Present Simple: He/She/It',
      grammarKey: 'A1_PRESENT_SIMPLE_HE_SHE',
      storyEN: 'You describe what other people do every day.',
      vocab: ['works', 'studies', 'lives', 'speaks', 'eats', 'drinks', 'sleeps', 'wakes', 'starts', 'finishes']
    },
    {
      topic: 'Present Simple: Questions',
      grammarKey: 'A1_PRESENT_SIMPLE_QUESTIONS',
      storyEN: 'You ask about daily routines.',
      vocab: ['do', 'does', 'usually', 'always', 'sometimes', 'often', 'never', 'every', 'day', 'week']
    },
    {
      topic: 'Present Simple: Negative',
      grammarKey: 'A1_PRESENT_SIMPLE_NEGATIVE',
      storyEN: 'You talk about things you don\'t do.',
      vocab: ['don\'t', 'doesn\'t', 'hate', 'dislike', 'avoid', 'refuse', 'stop', 'quit', 'give up', 'forget']
    },
    {
      topic: 'Like/Want/Need',
      grammarKey: 'A1_LIKE_WANT',
      storyEN: 'You express preferences and desires.',
      vocab: ['like', 'love', 'want', 'need', 'prefer', 'enjoy', 'hate', 'dislike', 'wish', 'hope']
    },
    {
      topic: 'Have/Have Got',
      grammarKey: 'A1_HAVE_GOT',
      storyEN: 'You describe possessions.',
      vocab: ['have', 'has', 'got', 'own', 'possess', 'belong', 'keep', 'hold', 'carry', 'wear']
    },
    {
      topic: 'Can: Ability',
      grammarKey: 'A1_CAN_ABILITY',
      storyEN: 'You talk about your skills and abilities.',
      vocab: ['can', 'swim', 'drive', 'cook', 'sing', 'dance', 'run', 'jump', 'read', 'write']
    },
    {
      topic: 'Can: Permission',
      grammarKey: 'A1_CAN_PERMISSION',
      storyEN: 'You ask for permission politely.',
      vocab: ['can', 'may', 'could', 'please', 'sorry', 'excuse', 'help', 'ask', 'borrow', 'use']
    },
    {
      topic: 'There is/There are',
      grammarKey: 'A1_THERE_IS_ARE',
      storyEN: 'You describe what exists in a place.',
      vocab: ['there', 'park', 'shop', 'restaurant', 'school', 'hospital', 'bank', 'post office', 'library', 'museum']
    },
    {
      topic: 'Prepositions of Place',
      grammarKey: 'A1_PREPOSITIONS_PLACE',
      storyEN: 'You describe where things are located.',
      vocab: ['in', 'on', 'under', 'behind', 'in front of', 'next to', 'between', 'opposite', 'near', 'far from']
    },
    {
      topic: 'Prepositions of Time',
      grammarKey: 'A1_PREPOSITIONS_TIME',
      storyEN: 'You talk about when things happen.',
      vocab: ['at', 'on', 'in', 'morning', 'afternoon', 'evening', 'night', 'Monday', 'January', 'summer']
    },
    {
      topic: 'Adjectives: Order',
      grammarKey: 'A1_ADJECTIVES_ORDER',
      storyEN: 'You describe things with multiple adjectives.',
      vocab: ['big', 'small', 'old', 'new', 'red', 'blue', 'beautiful', 'ugly', 'good', 'bad']
    },
    {
      topic: 'Adverbs of Frequency',
      grammarKey: 'A1_ADVERBS_FREQUENCY',
      storyEN: 'You say how often you do things.',
      vocab: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'frequently', 'occasionally', 'seldom', 'hardly']
    },
    {
      topic: 'Countable/Uncountable',
      grammarKey: 'A1_COUNTABLE_UNCOUNTABLE',
      storyEN: 'You learn which nouns can be counted.',
      vocab: ['apple', 'water', 'book', 'milk', 'car', 'money', 'chair', 'information', 'dog', 'advice']
    },
    {
      topic: 'Some/Any',
      grammarKey: 'A1_SOME_ANY',
      storyEN: 'You talk about quantities in different sentences.',
      vocab: ['some', 'any', 'bread', 'eggs', 'sugar', 'coffee', 'tea', 'rice', 'meat', 'cheese']
    },
    {
      topic: 'How much/How many',
      grammarKey: 'A1_HOW_MUCH_MANY',
      storyEN: 'You ask about quantities and prices.',
      vocab: ['how much', 'how many', 'price', 'cost', 'expensive', 'cheap', 'euro', 'dollar', 'pound', 'money']
    },
    {
      topic: 'Present Continuous',
      grammarKey: 'A1_PRESENT_CONTINUOUS',
      storyEN: 'You describe actions happening right now.',
      vocab: ['wearing', 'eating', 'drinking', 'reading', 'writing', 'sitting', 'standing', 'walking', 'running', 'talking']
    },
    {
      topic: 'Imperatives',
      grammarKey: 'A1_IMPERATIVE',
      storyEN: 'You give commands and instructions.',
      vocab: ['open', 'close', 'sit', 'stand', 'come', 'go', 'listen', 'look', 'stop', 'wait']
    },
    {
      topic: 'Wh- Questions',
      grammarKey: 'A1_WH_QUESTIONS',
      storyEN: 'You ask detailed questions.',
      vocab: ['what', 'where', 'when', 'why', 'who', 'which', 'how', 'whose', 'whom', 'whatever']
    },
    {
      topic: 'Object Pronouns',
      grammarKey: 'A1_OBJECT_PRONOUNS',
      storyEN: 'You use pronouns after verbs.',
      vocab: ['me', 'you', 'him', 'her', 'it', 'us', 'them', 'help', 'see', 'know']
    },
    {
      topic: 'Whose',
      grammarKey: 'A1_WHOSE',
      storyEN: 'You ask about ownership.',
      vocab: ['whose', 'belong', 'owner', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs', 'possession']
    },
    {
      topic: 'Going to: Future',
      grammarKey: 'A1_GOING_TO_FUTURE',
      storyEN: 'You talk about future plans.',
      vocab: ['going to', 'plan', 'tomorrow', 'next week', 'next month', 'next year', 'soon', 'later', 'future', 'will']
    }
  ],
  A2: [
    {
      topic: 'Past Simple: Regular Verbs',
      grammarKey: 'A2_PAST_SIMPLE_REGULAR',
      storyEN: 'You describe what you did yesterday.',
      vocab: ['worked', 'played', 'watched', 'walked', 'talked', 'cooked', 'cleaned', 'studied', 'visited', 'called']
    },
    {
      topic: 'Past Simple: Irregular Verbs',
      grammarKey: 'A2_PAST_SIMPLE_IRREGULAR',
      storyEN: 'You talk about past experiences with irregular verbs.',
      vocab: ['went', 'saw', 'came', 'took', 'gave', 'made', 'bought', 'thought', 'found', 'left']
    },
    {
      topic: 'Past Simple: Questions',
      grammarKey: 'A2_PAST_SIMPLE_QUESTIONS',
      storyEN: 'You ask about past events.',
      vocab: ['did', 'yesterday', 'last week', 'last month', 'last year', 'ago', 'when', 'where', 'why', 'how']
    },
    {
      topic: 'Past Simple: Negative',
      grammarKey: 'A2_PAST_SIMPLE_NEGATIVE',
      storyEN: 'You say what you didn\'t do in the past.',
      vocab: ['didn\'t', 'wasn\'t', 'weren\'t', 'forget', 'miss', 'lose', 'fail', 'refuse', 'avoid', 'skip']
    },
    {
      topic: 'Past Continuous',
      grammarKey: 'A2_PAST_CONTINUOUS',
      storyEN: 'You describe actions in progress in the past.',
      vocab: ['was', 'were', 'reading', 'watching', 'listening', 'sleeping', 'cooking', 'working', 'studying', 'playing']
    },
    {
      topic: 'Past Continuous vs Simple',
      grammarKey: 'A2_PAST_CONTINUOUS_VS_SIMPLE',
      storyEN: 'You talk about interrupted actions in the past.',
      vocab: ['while', 'when', 'during', 'suddenly', 'immediately', 'interrupt', 'happen', 'occur', 'arrive', 'appear']
    },
    {
      topic: 'Used to',
      grammarKey: 'A2_USED_TO',
      storyEN: 'You describe past habits that are no longer true.',
      vocab: ['used to', 'past', 'before', 'childhood', 'young', 'habit', 'routine', 'regular', 'frequent', 'normal']
    },
    {
      topic: 'Future: Will',
      grammarKey: 'A2_FUTURE_WILL',
      storyEN: 'You make predictions and promises.',
      vocab: ['will', 'won\'t', 'shall', 'predict', 'promise', 'decide', 'offer', 'refuse', 'agree', 'hope']
    },
    {
      topic: 'Will vs Going to',
      grammarKey: 'A2_WILL_VS_GOING_TO',
      storyEN: 'You distinguish between predictions and plans.',
      vocab: ['will', 'going to', 'plan', 'intend', 'predict', 'spontaneous', 'decision', 'intention', 'evidence', 'sign']
    },
    {
      topic: 'Present Continuous: Future',
      grammarKey: 'A2_PRESENT_CONTINUOUS_FUTURE',
      storyEN: 'You talk about fixed future arrangements.',
      vocab: ['meeting', 'appointment', 'arrangement', 'schedule', 'tonight', 'tomorrow', 'next', 'this weekend', 'plan', 'organize']
    },
    {
      topic: 'Comparatives',
      grammarKey: 'A2_COMPARATIVES',
      storyEN: 'You compare two things.',
      vocab: ['bigger', 'smaller', 'faster', 'slower', 'better', 'worse', 'more', 'less', 'than', 'compare']
    },
    {
      topic: 'Superlatives',
      grammarKey: 'A2_SUPERLATIVES',
      storyEN: 'You talk about extremes.',
      vocab: ['biggest', 'smallest', 'fastest', 'slowest', 'best', 'worst', 'most', 'least', 'ever', 'never']
    },
    {
      topic: 'As...as',
      grammarKey: 'A2_AS_AS',
      storyEN: 'You show equality in comparisons.',
      vocab: ['as', 'same', 'equal', 'similar', 'alike', 'identical', 'equivalent', 'comparable', 'like', 'different']
    },
    {
      topic: 'Much/Many/More',
      grammarKey: 'A2_MUCH_MANY_MORE',
      storyEN: 'You describe larger quantities.',
      vocab: ['much', 'many', 'more', 'less', 'fewer', 'quantity', 'amount', 'number', 'plenty', 'lot']
    },
    {
      topic: 'Should/Ought to',
      grammarKey: 'A2_SHOULD_OUGHT_TO',
      storyEN: 'You give advice.',
      vocab: ['should', 'ought to', 'advice', 'recommend', 'suggest', 'better', 'wise', 'sensible', 'reasonable', 'practical']
    },
    {
      topic: 'Have to/Must',
      grammarKey: 'A2_HAVE_TO_MUST',
      storyEN: 'You talk about obligations.',
      vocab: ['have to', 'must', 'need', 'necessary', 'essential', 'required', 'obligatory', 'compulsory', 'mandatory', 'rule']
    },
    {
      topic: 'Don\'t have to vs Mustn\'t',
      grammarKey: 'A2_DONT_HAVE_TO_MUSTNT',
      storyEN: 'You distinguish between lack of obligation and prohibition.',
      vocab: ['don\'t have to', 'mustn\'t', 'prohibited', 'forbidden', 'banned', 'illegal', 'allowed', 'permitted', 'optional', 'choice']
    },
    {
      topic: 'May/Might: Permission',
      grammarKey: 'A2_MAY_MIGHT_PERMISSION',
      storyEN: 'You ask permission politely.',
      vocab: ['may', 'might', 'could', 'permission', 'allow', 'let', 'permit', 'authorize', 'approve', 'consent']
    },
    {
      topic: 'Infinitive of Purpose',
      grammarKey: 'A2_INFINITIVE_PURPOSE',
      storyEN: 'You explain why you do things.',
      vocab: ['to', 'in order to', 'so as to', 'purpose', 'reason', 'goal', 'aim', 'objective', 'target', 'intention']
    },
    {
      topic: 'Would like',
      grammarKey: 'A2_WOULD_LIKE',
      storyEN: 'You express polite desires.',
      vocab: ['would like', 'want', 'prefer', 'desire', 'wish', 'fancy', 'care for', 'feel like', 'order', 'request']
    },
    {
      topic: 'Too/Enough',
      grammarKey: 'A2_TOO_ENOUGH',
      storyEN: 'You describe excessive and sufficient amounts.',
      vocab: ['too', 'enough', 'sufficient', 'excessive', 'inadequate', 'plenty', 'lack', 'shortage', 'surplus', 'extra']
    },
    {
      topic: 'Present Perfect: Just/Already',
      grammarKey: 'A2_PRESENT_PERFECT_JUST_ALREADY',
      storyEN: 'You talk about very recent actions.',
      vocab: ['just', 'already', 'recently', 'lately', 'now', 'finished', 'completed', 'done', 'ready', 'fresh']
    },
    {
      topic: 'Present Perfect: Yet',
      grammarKey: 'A2_PRESENT_PERFECT_YET',
      storyEN: 'You ask if something has happened.',
      vocab: ['yet', 'still', 'not yet', 'already', 'so far', 'until now', 'up to now', 'waiting', 'expecting', 'pending']
    },
    {
      topic: 'Present Perfect: Ever/Never',
      grammarKey: 'A2_PRESENT_PERFECT_EVER_NEVER',
      storyEN: 'You talk about life experiences.',
      vocab: ['ever', 'never', 'before', 'experience', 'try', 'visit', 'see', 'meet', 'taste', 'hear']
    },
    {
      topic: 'Present Perfect: For/Since',
      grammarKey: 'A2_PRESENT_PERFECT_FOR_SINCE',
      storyEN: 'You describe duration.',
      vocab: ['for', 'since', 'long time', 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'duration']
    },
    {
      topic: 'Something/Anything/Nothing',
      grammarKey: 'A2_SOMETHING_ANYTHING',
      storyEN: 'You talk about unspecified things.',
      vocab: ['something', 'anything', 'nothing', 'everything', 'someone', 'anyone', 'no one', 'everyone', 'somewhere', 'anywhere']
    },
    {
      topic: 'First Conditional',
      grammarKey: 'A2_FIRST_CONDITIONAL',
      storyEN: 'You talk about real future possibilities.',
      vocab: ['if', 'will', 'unless', 'when', 'as soon as', 'possible', 'likely', 'probable', 'chance', 'opportunity']
    },
    {
      topic: 'Connecting Words',
      grammarKey: 'A2_CONNECTING_WORDS',
      storyEN: 'You link ideas in sentences.',
      vocab: ['and', 'but', 'or', 'so', 'because', 'although', 'however', 'therefore', 'moreover', 'furthermore']
    },
    {
      topic: 'Question Tags',
      grammarKey: 'A2_QUESTIONS_TAGS',
      storyEN: 'You check information.',
      vocab: ['isn\'t it', 'aren\'t they', 'doesn\'t he', 'didn\'t she', 'won\'t we', 'haven\'t you', 'can\'t they', 'shouldn\'t I', 'confirm', 'check']
    },
    {
      topic: 'Reflexive Pronouns',
      grammarKey: 'A2_REFLEXIVE_PRONOUNS',
      storyEN: 'You talk about actions you do to yourself.',
      vocab: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves', 'enjoy', 'hurt']
    }
  ],
  B1: [
    {
      topic: 'Present Perfect vs Past Simple',
      grammarKey: 'B1_PRESENT_PERFECT_VS_PAST',
      storyEN: 'You distinguish between finished time and unfinished time.',
      vocab: ['have been', 'went', 'have done', 'did', 'experience', 'specific', 'time', 'moment', 'period', 'duration']
    },
    {
      topic: 'Present Perfect Continuous',
      grammarKey: 'B1_PRESENT_PERFECT_CONTINUOUS',
      storyEN: 'You emphasize duration of ongoing actions.',
      vocab: ['have been working', 'have been studying', 'have been waiting', 'duration', 'continuous', 'ongoing', 'still', 'progress', 'activity', 'process']
    },
    {
      topic: 'Past Perfect',
      grammarKey: 'B1_PAST_PERFECT',
      storyEN: 'You talk about actions before other past actions.',
      vocab: ['had done', 'had gone', 'had seen', 'before', 'already', 'earlier', 'previously', 'prior', 'sequence', 'order']
    },
    {
      topic: 'Past Perfect Continuous',
      grammarKey: 'B1_PAST_PERFECT_CONTINUOUS',
      storyEN: 'You describe ongoing actions before a past moment.',
      vocab: ['had been working', 'had been living', 'had been studying', 'duration', 'exhausted', 'tired', 'busy', 'occupied', 'engaged', 'involved']
    },
    {
      topic: 'Future Perfect',
      grammarKey: 'B1_FUTURE_PERFECT',
      storyEN: 'You talk about completion before a future time.',
      vocab: ['will have finished', 'will have completed', 'will have done', 'by then', 'by that time', 'deadline', 'target', 'goal', 'achievement', 'milestone']
    },
    {
      topic: 'Future Continuous',
      grammarKey: 'B1_FUTURE_CONTINUOUS',
      storyEN: 'You describe actions in progress at a future time.',
      vocab: ['will be working', 'will be studying', 'will be traveling', 'this time tomorrow', 'at this moment', 'meanwhile', 'simultaneously', 'concurrent', 'parallel', 'ongoing']
    },
    {
      topic: 'Mixed Future Forms',
      grammarKey: 'B1_MIXED_FUTURES',
      storyEN: 'You use all future forms appropriately.',
      vocab: ['will', 'going to', 'present continuous', 'present simple', 'future perfect', 'future continuous', 'plan', 'schedule', 'predict', 'arrange']
    },
    {
      topic: 'Zero Conditional',
      grammarKey: 'B1_ZERO_CONDITIONAL',
      storyEN: 'You talk about general truths and scientific facts.',
      vocab: ['if', 'when', 'always', 'happens', 'result', 'consequence', 'fact', 'truth', 'reality', 'certainty']
    },
    {
      topic: 'Second Conditional',
      grammarKey: 'B1_SECOND_CONDITIONAL',
      storyEN: 'You imagine unreal present situations.',
      vocab: ['would', 'could', 'might', 'imaginary', 'hypothetical', 'unreal', 'impossible', 'unlikely', 'dream', 'fantasy']
    },
    {
      topic: 'Third Conditional',
      grammarKey: 'B1_THIRD_CONDITIONAL',
      storyEN: 'You talk about imaginary past situations.',
      vocab: ['would have', 'could have', 'might have', 'regret', 'mistake', 'missed opportunity', 'different outcome', 'alternative', 'hindsight', 'retrospect']
    },
    {
      topic: 'Wish: Past',
      grammarKey: 'B1_WISH_PAST',
      storyEN: 'You express regrets about the past.',
      vocab: ['wish', 'had done', 'hadn\'t done', 'regret', 'sorry', 'mistake', 'error', 'wrong decision', 'if only', 'too late']
    },
    {
      topic: 'Wish: Present',
      grammarKey: 'B1_WISH_PRESENT',
      storyEN: 'You express desires about the present.',
      vocab: ['wish', 'were', 'had', 'could', 'desire', 'want', 'dissatisfied', 'unhappy', 'disappointed', 'unsatisfied']
    },
    {
      topic: 'Passive Voice: Present',
      grammarKey: 'B1_PASSIVE_PRESENT',
      storyEN: 'You describe processes and facts without mentioning the doer.',
      vocab: ['is made', 'are produced', 'is grown', 'are sold', 'process', 'manufacture', 'produce', 'create', 'generate', 'construct']
    },
    {
      topic: 'Passive Voice: Past',
      grammarKey: 'B1_PASSIVE_PAST',
      storyEN: 'You talk about past events focusing on the action.',
      vocab: ['was built', 'were invented', 'was discovered', 'were created', 'history', 'invention', 'discovery', 'construction', 'foundation', 'establishment']
    },
    {
      topic: 'Passive Voice: Future',
      grammarKey: 'B1_PASSIVE_FUTURE',
      storyEN: 'You describe future plans without mentioning who will do them.',
      vocab: ['will be done', 'will be completed', 'will be finished', 'project', 'task', 'assignment', 'work', 'job', 'duty', 'responsibility']
    },
    {
      topic: 'Passive Voice: Continuous',
      grammarKey: 'B1_PASSIVE_CONTINUOUS',
      storyEN: 'You describe ongoing passive actions.',
      vocab: ['is being done', 'was being built', 'are being prepared', 'currently', 'at the moment', 'now', 'presently', 'right now', 'these days', 'nowadays']
    },
    {
      topic: 'Reported Speech: Statements',
      grammarKey: 'B1_REPORTED_SPEECH_STATEMENTS',
      storyEN: 'You report what someone said.',
      vocab: ['said', 'told', 'mentioned', 'explained', 'stated', 'claimed', 'announced', 'declared', 'admitted', 'confessed']
    },
    {
      topic: 'Reported Speech: Questions',
      grammarKey: 'B1_REPORTED_SPEECH_QUESTIONS',
      storyEN: 'You report questions.',
      vocab: ['asked', 'wondered', 'wanted to know', 'inquired', 'questioned', 'if', 'whether', 'what', 'where', 'when']
    },
    {
      topic: 'Reported Commands',
      grammarKey: 'B1_REPORTED_COMMANDS',
      storyEN: 'You report orders and requests.',
      vocab: ['told', 'asked', 'ordered', 'commanded', 'instructed', 'advised', 'warned', 'reminded', 'urged', 'begged']
    },
    {
      topic: 'Defining Relative Clauses',
      grammarKey: 'B1_DEFINING_RELATIVE_CLAUSES',
      storyEN: 'You define people and things.',
      vocab: ['who', 'which', 'that', 'where', 'when', 'person', 'thing', 'place', 'time', 'reason']
    },
    {
      topic: 'Non-defining Relative Clauses',
      grammarKey: 'B1_NON_DEFINING_RELATIVE_CLAUSES',
      storyEN: 'You add extra information.',
      vocab: ['who', 'which', 'whose', 'where', 'when', 'additional', 'extra', 'furthermore', 'moreover', 'incidentally']
    },
    {
      topic: 'Relative Pronouns',
      grammarKey: 'B1_RELATIVE_PRONOUNS',
      storyEN: 'You use all relative pronouns correctly.',
      vocab: ['who', 'whom', 'whose', 'which', 'that', 'where', 'when', 'why', 'person', 'thing']
    },
    {
      topic: 'Gerunds',
      grammarKey: 'B1_GERUNDS',
      storyEN: 'You use -ing forms as nouns.',
      vocab: ['swimming', 'reading', 'writing', 'cooking', 'dancing', 'enjoy', 'finish', 'avoid', 'suggest', 'practice']
    },
    {
      topic: 'Infinitives',
      grammarKey: 'B1_INFINITIVES',
      storyEN: 'You use to + verb forms.',
      vocab: ['to go', 'to see', 'to learn', 'to understand', 'to achieve', 'want', 'decide', 'plan', 'hope', 'expect']
    },
    {
      topic: 'Gerund vs Infinitive',
      grammarKey: 'B1_GERUND_VS_INFINITIVE',
      storyEN: 'You choose between -ing and to + verb.',
      vocab: ['stop', 'remember', 'forget', 'try', 'regret', 'mean', 'go on', 'need', 'like', 'love']
    },
    {
      topic: 'Modal Deduction: Present',
      grammarKey: 'B1_MODAL_DEDUCTION_PRESENT',
      storyEN: 'You make logical conclusions about the present.',
      vocab: ['must', 'can\'t', 'might', 'may', 'could', 'certain', 'impossible', 'possible', 'probable', 'likely']
    },
    {
      topic: 'Modal Deduction: Past',
      grammarKey: 'B1_MODAL_DEDUCTION_PAST',
      storyEN: 'You make logical conclusions about the past.',
      vocab: ['must have', 'can\'t have', 'might have', 'may have', 'could have', 'certainly', 'definitely', 'probably', 'possibly', 'perhaps']
    },
    {
      topic: 'Phrasal Verbs: Type 1',
      grammarKey: 'B1_PHRASAL_VERBS_1',
      storyEN: 'You learn common phrasal verbs.',
      vocab: ['get up', 'wake up', 'turn on', 'turn off', 'put on', 'take off', 'look for', 'look after', 'give up', 'carry on']
    },
    {
      topic: 'Phrasal Verbs: Type 2',
      grammarKey: 'B1_PHRASAL_VERBS_2',
      storyEN: 'You learn more phrasal verbs.',
      vocab: ['break down', 'break up', 'bring up', 'call off', 'come across', 'deal with', 'fall out', 'figure out', 'get over', 'go through']
    },
    {
      topic: 'Causative Have',
      grammarKey: 'B1_CAUSATIVE_HAVE',
      storyEN: 'You talk about services you arrange.',
      vocab: ['have', 'cut', 'repaired', 'fixed', 'cleaned', 'painted', 'checked', 'delivered', 'installed', 'serviced']
    }
  ],
  B2: [
    {
      topic: 'Advanced Perfect Forms',
      grammarKey: 'B2_ADVANCED_PERFECT_FORMS',
      storyEN: 'You master complex perfect tenses.',
      vocab: ['have been doing', 'had been doing', 'will have been doing', 'duration', 'continuous', 'completion', 'timeline', 'sequence', 'progression', 'development']
    },
    {
      topic: 'Mixed Conditionals',
      grammarKey: 'B2_MIXED_CONDITIONALS',
      storyEN: 'You combine different conditional types.',
      vocab: ['would be', 'had done', 'would have', 'were', 'consequence', 'result', 'outcome', 'effect', 'impact', 'influence']
    },
    {
      topic: 'Unreal Past',
      grammarKey: 'B2_UNREAL_PAST',
      storyEN: 'You express complex hypotheticals.',
      vocab: ['if only', 'suppose', 'supposing', 'imagine', 'what if', 'had better', 'would rather', 'it\'s time', 'as if', 'as though']
    },
    {
      topic: 'Passive with Modals',
      grammarKey: 'B2_PASSIVE_MODALS',
      storyEN: 'You combine passive voice with modal verbs.',
      vocab: ['must be done', 'should be completed', 'can be seen', 'may be found', 'might be considered', 'obligation', 'possibility', 'permission', 'ability', 'advice']
    },
    {
      topic: 'Passive Perfect Forms',
      grammarKey: 'B2_PASSIVE_PERFECT',
      storyEN: 'You use perfect passive structures.',
      vocab: ['has been done', 'had been completed', 'will have been finished', 'being done', 'having been done', 'completion', 'achievement', 'accomplishment', 'realization', 'fulfillment']
    },
    {
      topic: 'Passive Reporting Structures',
      grammarKey: 'B2_PASSIVE_REPORTING',
      storyEN: 'You report information impersonally.',
      vocab: ['it is said', 'it is believed', 'it is thought', 'it is reported', 'it is claimed', 'allegedly', 'supposedly', 'apparently', 'evidently', 'presumably']
    },
    {
      topic: 'Cleft Sentences: What',
      grammarKey: 'B2_CLEFT_SENTENCES_WHAT',
      storyEN: 'You emphasize using "what" clauses.',
      vocab: ['what', 'need', 'want', 'like', 'hate', 'love', 'prefer', 'require', 'desire', 'wish']
    },
    {
      topic: 'Cleft Sentences: It',
      grammarKey: 'B2_CLEFT_SENTENCES_IT',
      storyEN: 'You emphasize using "it" structures.',
      vocab: ['it', 'was', 'is', 'that', 'who', 'when', 'where', 'emphasis', 'focus', 'highlight']
    },
    {
      topic: 'Emphasis with Do',
      grammarKey: 'B2_EMPHASIS_DO',
      storyEN: 'You add emphasis to statements.',
      vocab: ['do', 'does', 'did', 'really', 'certainly', 'definitely', 'absolutely', 'truly', 'indeed', 'actually']
    },
    {
      topic: 'Inversion: Negative Adverbials',
      grammarKey: 'B2_INVERSION_NEGATIVE',
      storyEN: 'You use formal negative inversions.',
      vocab: ['never', 'rarely', 'seldom', 'hardly', 'scarcely', 'barely', 'no sooner', 'not only', 'under no circumstances', 'at no time']
    },
    {
      topic: 'Inversion: Conditionals',
      grammarKey: 'B2_INVERSION_CONDITIONALS',
      storyEN: 'You use formal conditional inversions.',
      vocab: ['had', 'were', 'should', 'formal', 'literary', 'sophisticated', 'elegant', 'refined', 'polished', 'professional']
    },
    {
      topic: 'Inversion: So/Such',
      grammarKey: 'B2_INVERSION_SO_SUCH',
      storyEN: 'You emphasize with inverted structures.',
      vocab: ['so', 'such', 'that', 'result', 'consequence', 'extreme', 'intense', 'remarkable', 'extraordinary', 'exceptional']
    },
    {
      topic: 'Subjunctive Mood',
      grammarKey: 'B2_SUBJUNCTIVE',
      storyEN: 'You use formal subjunctive structures.',
      vocab: ['suggest', 'recommend', 'propose', 'demand', 'insist', 'request', 'essential', 'important', 'necessary', 'vital']
    },
    {
      topic: 'Participle Clauses',
      grammarKey: 'B2_PARTICIPLE_CLAUSES',
      storyEN: 'You reduce clauses with participles.',
      vocab: ['walking', 'having finished', 'being tired', 'seen', 'written', 'made', 'simultaneous', 'reason', 'result', 'time']
    },
    {
      topic: 'Reduced Relative Clauses',
      grammarKey: 'B2_REDUCED_RELATIVE_CLAUSES',
      storyEN: 'You omit relative pronouns.',
      vocab: ['working', 'made', 'built', 'written', 'painted', 'designed', 'created', 'constructed', 'established', 'founded']
    },
    {
      topic: 'Noun Clauses',
      grammarKey: 'B2_NOUN_CLAUSES',
      storyEN: 'You use clauses as nouns.',
      vocab: ['what', 'that', 'whether', 'if', 'how', 'when', 'where', 'why', 'whoever', 'whatever']
    },
    {
      topic: 'Advanced Relative Structures',
      grammarKey: 'B2_ADVANCED_RELATIVES',
      storyEN: 'You master complex relative clauses.',
      vocab: ['whereby', 'wherein', 'whereupon', 'whereas', 'which', 'whom', 'whose', 'formal', 'academic', 'technical']
    },
    {
      topic: 'Quantifiers',
      grammarKey: 'B2_QUANTIFIERS',
      storyEN: 'You use precise quantity expressions.',
      vocab: ['few', 'a few', 'little', 'a little', 'several', 'plenty of', 'a number of', 'a great deal of', 'a large amount of', 'numerous']
    },
    {
      topic: 'Discourse Markers',
      grammarKey: 'B2_DISCOURSE_MARKERS',
      storyEN: 'You organize complex arguments.',
      vocab: ['furthermore', 'moreover', 'however', 'nevertheless', 'nonetheless', 'consequently', 'therefore', 'thus', 'hence', 'accordingly']
    },
    {
      topic: 'Linking: Contrast',
      grammarKey: 'B2_LINKING_CONTRAST',
      storyEN: 'You show contrasts effectively.',
      vocab: ['although', 'though', 'even though', 'despite', 'in spite of', 'whereas', 'while', 'whilst', 'conversely', 'on the contrary']
    },
    {
      topic: 'Linking: Cause and Effect',
      grammarKey: 'B2_LINKING_CAUSE_EFFECT',
      storyEN: 'You show relationships between ideas.',
      vocab: ['because', 'since', 'as', 'due to', 'owing to', 'because of', 'on account of', 'as a result', 'consequently', 'therefore']
    },
    {
      topic: 'Ellipsis',
      grammarKey: 'B2_ELLIPSIS',
      storyEN: 'You omit understood words naturally.',
      vocab: ['omission', 'understood', 'implied', 'assumed', 'obvious', 'clear', 'evident', 'apparent', 'natural', 'fluent']
    },
    {
      topic: 'Substitution',
      grammarKey: 'B2_SUBSTITUTION',
      storyEN: 'You replace repeated words.',
      vocab: ['so', 'neither', 'nor', 'do', 'does', 'did', 'one', 'ones', 'such', 'likewise']
    },
    {
      topic: 'Fronting',
      grammarKey: 'B2_FRONTING',
      storyEN: 'You reorder for emphasis.',
      vocab: ['emphasis', 'topic', 'comment', 'focus', 'highlight', 'stress', 'accent', 'underline', 'prominence', 'importance']
    },
    {
      topic: 'Advanced Modal Meanings',
      grammarKey: 'B2_ADVANCED_MODALS',
      storyEN: 'You express subtle modal meanings.',
      vocab: ['may well', 'might well', 'could well', 'can\'t possibly', 'must surely', 'probability', 'certainty', 'uncertainty', 'likelihood', 'possibility']
    },
    {
      topic: 'Future in the Past',
      grammarKey: 'B2_FUTURE_IN_PAST',
      storyEN: 'You report future plans from past perspective.',
      vocab: ['was going to', 'would', 'was about to', 'was to', 'planned', 'intended', 'expected', 'anticipated', 'foresaw', 'predicted']
    },
    {
      topic: 'Advanced Comparative Structures',
      grammarKey: 'B2_ADVANCED_COMPARATIVES',
      storyEN: 'You make sophisticated comparisons.',
      vocab: ['the more', 'the less', 'the better', 'the worse', 'increasingly', 'progressively', 'proportionally', 'correspondingly', 'comparatively', 'relatively']
    },
    {
      topic: 'Causative Get',
      grammarKey: 'B2_CAUSATIVE_GET',
      storyEN: 'You talk about arranging services with "get".',
      vocab: ['get', 'done', 'fixed', 'repaired', 'cleaned', 'painted', 'checked', 'delivered', 'arranged', 'organized']
    },
    {
      topic: 'Phrasal Verbs: Advanced',
      grammarKey: 'B2_PHRASAL_VERBS_3',
      storyEN: 'You master complex phrasal verbs.',
      vocab: ['put up with', 'look forward to', 'run out of', 'cut down on', 'catch up with', 'come up with', 'get away with', 'look down on', 'make up for', 'stand up for']
    },
    {
      topic: 'Collocations',
      grammarKey: 'B2_COLLOCATIONS',
      storyEN: 'You use natural word combinations.',
      vocab: ['make', 'do', 'have', 'take', 'give', 'get', 'decision', 'mistake', 'effort', 'impression']
    }
  ],
  C1: [
    {
      topic: 'Stylistic Inversion',
      grammarKey: 'C1_INVERSION_STYLISTIC',
      storyEN: 'You master literary inversion patterns.',
      vocab: ['seldom', 'rarely', 'never', 'little', 'hardly', 'scarcely', 'formal', 'literary', 'elegant', 'sophisticated']
    },
    {
      topic: 'Literary Inversion',
      grammarKey: 'C1_INVERSION_LITERARY',
      storyEN: 'You use advanced literary devices.',
      vocab: ['only', 'not only', 'no sooner', 'under no circumstances', 'at no time', 'in no way', 'on no account', 'rhetorical', 'emphasis', 'dramatic']
    },
    {
      topic: 'Advanced Cleft Structures',
      grammarKey: 'C1_CLEFT_ADVANCED',
      storyEN: 'You emphasize with sophisticated structures.',
      vocab: ['all', 'thing', 'reason', 'way', 'place', 'time', 'person', 'focus', 'prominence', 'salience']
    },
    {
      topic: 'Advanced Subjunctive',
      grammarKey: 'C1_SUBJUNCTIVE_ADVANCED',
      storyEN: 'You use formal mandative subjunctive.',
      vocab: ['imperative', 'crucial', 'essential', 'vital', 'critical', 'paramount', 'mandatory', 'compulsory', 'obligatory', 'required']
    },
    {
      topic: 'Nominalisation',
      grammarKey: 'C1_NOMINALISATION',
      storyEN: 'You transform verbs into abstract nouns.',
      vocab: ['implementation', 'development', 'establishment', 'achievement', 'improvement', 'reduction', 'increase', 'production', 'construction', 'creation']
    },
    {
      topic: 'Hedging Language',
      grammarKey: 'C1_HEDGING',
      storyEN: 'You express academic caution.',
      vocab: ['suggest', 'indicate', 'appear', 'seem', 'tend', 'possible', 'probable', 'likely', 'potential', 'tentative']
    },
    {
      topic: 'Stance Markers',
      grammarKey: 'C1_STANCE_MARKERS',
      storyEN: 'You position yourself in discourse.',
      vocab: ['arguably', 'undoubtedly', 'clearly', 'obviously', 'evidently', 'apparently', 'presumably', 'supposedly', 'allegedly', 'ostensibly']
    },
    {
      topic: 'Metadiscourse',
      grammarKey: 'C1_METADISCOURSE',
      storyEN: 'You guide readers through complex text.',
      vocab: ['firstly', 'secondly', 'furthermore', 'in conclusion', 'to summarize', 'as mentioned', 'as outlined', 'following', 'preceding', 'subsequent']
    },
    {
      topic: 'Parallelism',
      grammarKey: 'C1_PARALLELISM',
      storyEN: 'You create balanced rhetorical structures.',
      vocab: ['balance', 'symmetry', 'parallel', 'structure', 'pattern', 'rhythm', 'repetition', 'coordination', 'alignment', 'correspondence']
    },
    {
      topic: 'Antithesis',
      grammarKey: 'C1_ANTITHESIS',
      storyEN: 'You contrast opposing ideas dramatically.',
      vocab: ['contrast', 'opposition', 'conflict', 'tension', 'juxtaposition', 'dichotomy', 'polarity', 'contradiction', 'paradox', 'irony']
    },
    {
      topic: 'Chiasmus',
      grammarKey: 'C1_CHIASMUS',
      storyEN: 'You reverse parallel structures for effect.',
      vocab: ['reversal', 'mirror', 'reflection', 'inversion', 'symmetry', 'pattern', 'balance', 'structure', 'rhetorical', 'literary']
    },
    {
      topic: 'Litotes',
      grammarKey: 'C1_LITOTES',
      storyEN: 'You use understatement for emphasis.',
      vocab: ['not', 'un-', 'understatement', 'negative', 'irony', 'subtle', 'indirect', 'implicit', 'understated', 'modest']
    },
    {
      topic: 'Zeugma',
      grammarKey: 'C1_ZEUGMA',
      storyEN: 'You use one word with multiple meanings.',
      vocab: ['economy', 'efficiency', 'wit', 'humor', 'double', 'meaning', 'sense', 'interpretation', 'ambiguity', 'wordplay']
    },
    {
      topic: 'Register Shifts',
      grammarKey: 'C1_REGISTER_SHIFTS',
      storyEN: 'You adapt language to context.',
      vocab: ['formal', 'informal', 'neutral', 'casual', 'academic', 'colloquial', 'technical', 'professional', 'appropriate', 'suitable']
    },
    {
      topic: 'Pragmatic Markers',
      grammarKey: 'C1_PRAGMATIC_MARKERS',
      storyEN: 'You manage conversational flow.',
      vocab: ['well', 'you know', 'I mean', 'sort of', 'kind of', 'basically', 'actually', 'frankly', 'honestly', 'literally']
    },
    {
      topic: 'Evaluative Language',
      grammarKey: 'C1_EVALUATIVE_LANGUAGE',
      storyEN: 'You express judgments and attitudes.',
      vocab: ['remarkably', 'surprisingly', 'interestingly', 'unfortunately', 'fortunately', 'disturbingly', 'encouragingly', 'disappointingly', 'impressively', 'strikingly']
    },
    {
      topic: 'Cohesive Devices',
      grammarKey: 'C1_COHESIVE_DEVICES',
      storyEN: 'You create seamless text connections.',
      vocab: ['consequently', 'therefore', 'hence', 'thus', 'accordingly', 'subsequently', 'simultaneously', 'meanwhile', 'moreover', 'furthermore']
    },
    {
      topic: 'Complex Conditionals',
      grammarKey: 'C1_COMPLEX_CONDITIONALS',
      storyEN: 'You layer multiple hypotheticals.',
      vocab: ['were', 'had', 'should', 'provided', 'assuming', 'supposing', 'given', 'unless', 'whether', 'if']
    },
    {
      topic: 'Nested Clauses',
      grammarKey: 'C1_NESTED_CLAUSES',
      storyEN: 'You embed clauses within clauses.',
      vocab: ['which', 'that', 'who', 'whom', 'whose', 'where', 'when', 'embedded', 'complex', 'intricate']
    },
    {
      topic: 'Apposition',
      grammarKey: 'C1_APPOSITION',
      storyEN: 'You add noun phrase elaboration.',
      vocab: ['namely', 'specifically', 'particularly', 'especially', 'notably', 'namely', 'that is', 'i.e.', 'viz.', 'to wit']
    },
    {
      topic: 'Advanced Passive Structures',
      grammarKey: 'C1_ADVANCED_PASSIVE',
      storyEN: 'You use sophisticated passive forms.',
      vocab: ['is said to have', 'is believed to be', 'is thought to have been', 'is considered', 'is regarded as', 'is deemed', 'is perceived', 'is viewed', 'is seen as', 'is understood']
    },
    {
      topic: 'Advanced Participle Clauses',
      grammarKey: 'C1_PARTICIPLE_ADVANCED',
      storyEN: 'You master complex participle structures.',
      vocab: ['having', 'being', 'having been', 'having had', 'simultaneous', 'prior', 'subsequent', 'consequent', 'resultant', 'ensuing']
    },
    {
      topic: 'Abstract Nouns',
      grammarKey: 'C1_ABSTRACT_NOUNS',
      storyEN: 'You work with complex abstract concepts.',
      vocab: ['implementation', 'facilitation', 'optimization', 'contextualization', 'conceptualization', 'operationalization', 'legitimization', 'problematization', 'theorization', 'systematization']
    },
    {
      topic: 'Academic Vocabulary',
      grammarKey: 'C1_ACADEMIC_VOCABULARY',
      storyEN: 'You use formal academic lexis.',
      vocab: ['paradigm', 'framework', 'methodology', 'hypothesis', 'empirical', 'theoretical', 'conceptual', 'analytical', 'synthesis', 'discourse']
    },
    {
      topic: 'Advanced Linking Devices',
      grammarKey: 'C1_ADVANCED_LINKING',
      storyEN: 'You connect ideas sophisticatedly.',
      vocab: ['notwithstanding', 'albeit', 'whereby', 'wherein', 'whereupon', 'insofar as', 'inasmuch as', 'vis-à-vis', 'qua', 'per se']
    },
    {
      topic: 'Complex Noun Phrases',
      grammarKey: 'C1_NOUN_PHRASES_COMPLEX',
      storyEN: 'You create intricate nominal structures.',
      vocab: ['pre-modification', 'post-modification', 'apposition', 'complement', 'specifier', 'determiner', 'qualifier', 'modifier', 'head', 'dependent']
    },
    {
      topic: 'Modal Nuances',
      grammarKey: 'C1_MODAL_NUANCES',
      storyEN: 'You express subtle modal distinctions.',
      vocab: ['may well', 'might well', 'could conceivably', 'would arguably', 'should presumably', 'must surely', 'can hardly', 'need scarcely', 'dare not', 'ought to have']
    },
    {
      topic: 'Split Infinitives',
      grammarKey: 'C1_SPLIT_INFINITIVES',
      storyEN: 'You understand when to split infinitives.',
      vocab: ['boldly', 'carefully', 'deliberately', 'intentionally', 'purposefully', 'consciously', 'willingly', 'knowingly', 'wittingly', 'advisedly']
    },
    {
      topic: 'Stylistic Variation',
      grammarKey: 'C1_STYLISTIC_VARIATION',
      storyEN: 'You vary sentence structure for effect.',
      vocab: ['variation', 'diversity', 'range', 'variety', 'assortment', 'mixture', 'combination', 'blend', 'synthesis', 'integration']
    },
    {
      topic: 'Integrated Advanced Skills',
      grammarKey: 'C1_INTEGRATED_SKILLS',
      storyEN: 'You demonstrate near-native competence.',
      vocab: ['mastery', 'proficiency', 'competence', 'expertise', 'fluency', 'eloquence', 'articulacy', 'sophistication', 'refinement', 'polish']
    }
  ]
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
  const ex: Exercise[] = [];

  // A1 EXERCISES
  if (grammarKey === 'A1_BE_PRESENT') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['I am from Spain.', 'I is from Spain.', 'I are from Spain.', 'I be from Spain.'], 0,
        explain('I → am', 'I → am', 'I → am', 'I → am')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['She is a teacher.', 'She am a teacher.', 'She are a teacher.', 'She be a teacher.'], 0,
        explain('She → is', 'She → is', 'She → is', 'She → is')),
      fillBlank(`${lessonId}-e3`, 'Fill: They ___ students.', 'are',
        explain('They → are', 'They → are', 'They → are', 'They → are')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['We are from Italy.', 'We is from Italy.', 'We am from Italy.', 'We be from Italy.'], 0,
        explain('We → are', 'We → are', 'We → are', 'We → are')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'You are welcome.',
        explain('Correct order: You are welcome.', 'Правильний порядок: You are welcome.', 'Правильный порядок: You are welcome.', 'Orden correcto: You are welcome.'))
    );
    return ex;
  }

  if (grammarKey === 'A1_POSSESSIVE_ADJ') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['This is my book.', 'This is me book.', 'This is mine book.', 'This is I book.'], 0,
        explain('my + noun', 'my + іменник', 'my + существительное', 'my + sustantivo')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['Her name is Anna.', 'Hers name is Anna.', 'She name is Anna.', 'The her name is Anna.'], 0,
        explain('her + noun', 'her + іменник', 'her + существительное', 'her + sustantivo')),
      fillBlank(`${lessonId}-e3`, 'Fill: This is ___ (we) house.', 'our',
        explain('we → our', 'we → our', 'we → our', 'we → our')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['Their car is new.', 'They car is new.', 'Theirs car is new.', 'Them car is new.'], 0,
        explain('their + noun', 'their + іменник', 'their + существительное', 'their + sustantivo')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'His brother is tall.',
        explain('Order: His brother is tall.', 'Порядок: His brother is tall.', 'Порядок: His brother is tall.', 'Orden: His brother is tall.'))
    );
    return ex;
  }

  if (grammarKey === 'A1_PRESENT_SIMPLE_HE_SHE') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['She works here.', 'She work here.', 'She working here.', 'She is work here.'], 0,
        explain('Add -s with he/she/it', 'Додай -s для he/she/it', 'Добавь -s для he/she/it', 'Añade -s para he/she/it')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['He speaks English.', 'He speak English.', 'He speaking English.', 'He is speak English.'], 0,
        explain('Add -s/-es with he/she/it', 'Додай -s/-es для he/she/it', 'Добавь -s/-es для he/she/it', 'Añade -s/-es para he/she/it')),
      fillBlank(`${lessonId}-e3`, 'Fill: It ___ (rain) a lot here.', 'rains',
        explain('it → rains', 'it → rains', 'it → rains', 'it → rains')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['She lives in Paris.', 'She live in Paris.', 'She living in Paris.', 'She is live in Paris.'], 0,
        explain('she → lives', 'she → lives', 'she → lives', 'she → lives')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'He watches TV every day.',
        explain('Order: He watches TV every day.', 'Порядок: He watches TV every day.', 'Порядок: He watches TV every day.', 'Orden: He watches TV every day.'))
    );
    return ex;
  }

  // A2 EXERCISES
  if (grammarKey === 'A2_PAST_SIMPLE_REGULAR') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['I worked yesterday.', 'I work yesterday.', 'I working yesterday.', 'I have work yesterday.'], 0,
        explain('Add -ed for past simple', 'Додай -ed для минулого часу', 'Добавь -ed для прошедшего времени', 'Añade -ed para pasado simple')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['They visited London last year.', 'They visit London last year.', 'They are visit London last year.', 'They have visit London last year.'], 0,
        explain('Past simple: verb + -ed', 'Минулий час: дієслово + -ed', 'Прошедшее: глагол + -ed', 'Pasado simple: verbo + -ed')),
      fillBlank(`${lessonId}-e3`, 'Fill: She ___ (study) hard.', 'studied',
        explain('study → studied', 'study → studied', 'study → studied', 'study → studied')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['We watched a movie.', 'We watch a movie.', 'We watching a movie.', 'We have watch a movie.'], 0,
        explain('Past simple for completed actions', 'Минулий час для завершених дій', 'Прошедшее для завершённых действий', 'Pasado para acciones completadas')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'He called me yesterday.',
        explain('Order: He called me yesterday.', 'Порядок: He called me yesterday.', 'Порядок: He called me yesterday.', 'Orden: He called me yesterday.'))
    );
    return ex;
  }

  if (grammarKey === 'A2_PAST_SIMPLE_IRREGULAR') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['I went to Paris.', 'I goed to Paris.', 'I go to Paris.', 'I have go to Paris.'], 0,
        explain('go → went (irregular)', 'go → went (неправильне)', 'go → went (неправильный)', 'go → went (irregular)')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['She saw him yesterday.', 'She seed him yesterday.', 'She see him yesterday.', 'She have see him yesterday.'], 0,
        explain('see → saw (irregular)', 'see → saw (неправильне)', 'see → saw (неправильный)', 'see → saw (irregular)')),
      fillBlank(`${lessonId}-e3`, 'Fill: They ___ (buy) a car.', 'bought',
        explain('buy → bought', 'buy → bought', 'buy → bought', 'buy → bought')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['We made a cake.', 'We maked a cake.', 'We make a cake.', 'We have make a cake.'], 0,
        explain('make → made', 'make → made', 'make → made', 'make → made')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'He took the bus.',
        explain('take → took', 'take → took', 'take → took', 'take → took'))
    );
    return ex;
  }

  if (grammarKey === 'A2_WILL_VS_GOING_TO') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['It is going to rain. (prediction with evidence)', 'It will rain. (spontaneous)', 'It rain. (wrong)', 'It is rain. (wrong)'], 0,
        explain('Use "going to" for predictions with present evidence', 'Використовуй "going to" для прогнозів з доказами', 'Используй "going to" для прогнозов с доказательствами', 'Usa "going to" para predicciones con evidencia')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['I will help you. (spontaneous offer)', 'I am going to help you. (planned)', 'I help you. (wrong)', 'I helping you. (wrong)'], 0,
        explain('Use "will" for spontaneous decisions', 'Використовуй "will" для спонтанних рішень', 'Используй "will" для спонтанных решений', 'Usa "will" para decisiones espontáneas')),
      fillBlank(`${lessonId}-e3`, 'Fill: We ___ visit Spain next month. (plan)', 'are going to',
        explain('Plans → going to', 'Плани → going to', 'Планы → going to', 'Planes → going to')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['She is going to study medicine. (intention)', 'She will study medicine. (prediction)', 'She study medicine. (wrong)', 'She studying medicine. (wrong)'], 0,
        explain('Intentions → going to', 'Наміри → going to', 'Намерения → going to', 'Intenciones → going to')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'I think it will be sunny.',
        explain('"will" for predictions without evidence', '"will" для прогнозів без доказів', '"will" для прогнозов без доказательств', '"will" para predicciones sin evidencia'))
    );
    return ex;
  }

  // B1 EXERCISES
  if (grammarKey === 'B1_PRESENT_PERFECT_VS_PAST') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['I have been to Paris. (life experience)', 'I went to Paris. (specific time)', 'I go to Paris. (wrong)', 'I am go to Paris. (wrong)'], 0,
        explain('Present perfect for life experiences without specific time', 'Present perfect для життєвого досвіду без конкретного часу', 'Present perfect для жизненного опыта без точного времени', 'Present perfect para experiencias sin tiempo específico')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['She visited Rome in 2020.', 'She has visited Rome in 2020.', 'She visits Rome in 2020.', 'She visiting Rome in 2020.'], 0,
        explain('Past simple with specific past time (2020)', 'Past simple з конкретним часом (2020)', 'Past simple с точным временем (2020)', 'Past simple con tiempo específico (2020)')),
      fillBlank(`${lessonId}-e3`, 'Fill: They ___ (live) here since 2015.', 'have lived',
        explain('"since" → present perfect', '"since" → present perfect', '"since" → present perfect', '"since" → present perfect')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['We have finished the project.', 'We finished the project.', 'We finish the project.', 'We finishing the project.'], 0,
        explain('Present perfect for recent completion (no specific time)', 'Present perfect для нещодавнього завершення (без часу)', 'Present perfect для недавнего завершения (без времени)', 'Present perfect para terminación reciente (sin tiempo)')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'He has already done his homework.',
        explain('"already" → present perfect', '"already" → present perfect', '"already" → present perfect', '"already" → present perfect'))
    );
    return ex;
  }

  if (grammarKey === 'B1_SECOND_CONDITIONAL') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['If I were rich, I would travel.', 'If I was rich, I would travel.', 'If I am rich, I will travel.', 'If I were rich, I will travel.'], 0,
        explain('Second conditional: if + past, would + verb', 'Другий умовний: if + минулий, would + дієслово', 'Второе условное: if + прошедшее, would + глагол', 'Segundo condicional: if + pasado, would + verbo')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['If she studied harder, she would pass.', 'If she studies harder, she will pass.', 'If she study harder, she would pass.', 'If she studied harder, she will pass.'], 0,
        explain('Unreal present situation', 'Нереальна теперішня ситуація', 'Нереальная настоящая ситуация', 'Situación irreal presente')),
      fillBlank(`${lessonId}-e3`, 'Fill: If I ___ (have) time, I would help.', 'had',
        explain('if-clause → past simple', 'if-clause → минулий простий', 'if-clause → прошедшее простое', 'cláusula if → pasado simple')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['They would buy a house if they had money.', 'They will buy a house if they had money.', 'They would buy a house if they have money.', 'They buy a house if they had money.'], 0,
        explain('Result clause: would + verb', 'Результат: would + дієслово', 'Результат: would + глагол', 'Resultado: would + verbo')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'If we knew the answer, we would tell you.',
        explain('Second conditional structure', 'Структура другого умовного', 'Структура второго условного', 'Estructura segundo condicional'))
    );
    return ex;
  }

  if (grammarKey === 'B1_PASSIVE_PRESENT') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['English is spoken in many countries.', 'English speaks in many countries.', 'English is speak in many countries.', 'English speaking in many countries.'], 0,
        explain('Passive: is/are + past participle', 'Пасив: is/are + дієприкметник', 'Пассив: is/are + причастие', 'Pasiva: is/are + participio')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['These cars are made in Japan.', 'These cars make in Japan.', 'These cars are make in Japan.', 'These cars making in Japan.'], 0,
        explain('Plural subject → are', 'Множина → are', 'Множественное → are', 'Plural → are')),
      fillBlank(`${lessonId}-e3`, 'Fill: Coffee ___ (grow) in Brazil.', 'is grown',
        explain('is/are + past participle', 'is/are + дієприкметник', 'is/are + причастие', 'is/are + participio')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['The letter is delivered every morning.', 'The letter delivers every morning.', 'The letter is deliver every morning.', 'The letter delivering every morning.'], 0,
        explain('Passive for processes', 'Пасив для процесів', 'Пассив для процессов', 'Pasiva para procesos')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'This room is cleaned twice a week.',
        explain('Passive structure', 'Структура пасиву', 'Структура пассива', 'Estructura pasiva'))
    );
    return ex;
  }

  // B2 EXERCISES
  if (grammarKey === 'B2_MIXED_CONDITIONALS') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['If I had studied medicine, I would be a doctor now.', 'If I studied medicine, I would be a doctor now.', 'If I have studied medicine, I would be a doctor now.', 'If I had studied medicine, I will be a doctor now.'], 0,
        explain('Past condition → present result', 'Минула умова → теперішній результат', 'Прошлое условие → настоящий результат', 'Condición pasada → resultado presente')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['If she were more careful, she wouldn\'t have broken the vase.', 'If she was more careful, she wouldn\'t have broken the vase.', 'If she is more careful, she wouldn\'t have broken the vase.', 'If she were more careful, she wouldn\'t break the vase.'], 0,
        explain('Present condition → past result', 'Теперішня умова → минулий результат', 'Настоящее условие → прошлый результат', 'Condición presente → resultado pasado')),
      fillBlank(`${lessonId}-e3`, 'Fill: If I ___ (be) taller, I would have played basketball.', 'were',
        explain('Present unreal → past result', 'Нереальне теперішнє → минулий результат', 'Нереальное настоящее → прошлый результат', 'Irreal presente → resultado pasado')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['If he had left earlier, he would be here now.', 'If he left earlier, he would be here now.', 'If he has left earlier, he would be here now.', 'If he had left earlier, he will be here now.'], 0,
        explain('Mixed conditional: past → present', 'Змішаний умовний: минуле → теперішнє', 'Смешанное условное: прошлое → настоящее', 'Condicional mixto: pasado → presente')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'If I knew more, I would have helped.',
        explain('Present → past mixed conditional', 'Теперішнє → минуле змішане', 'Настоящее → прошлое смешанное', 'Presente → pasado mixto'))
    );
    return ex;
  }

  if (grammarKey === 'B2_INVERSION_NEGATIVE') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['Never have I seen such beauty.', 'Never I have seen such beauty.', 'I have never seen such beauty.', 'I never have seen such beauty.'], 0,
        explain('Inversion after "never"', 'Інверсія після "never"', 'Инверсия после "never"', 'Inversión después de "never"')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['Rarely does he make mistakes.', 'Rarely he does make mistakes.', 'He rarely does make mistakes.', 'He does rarely make mistakes.'], 0,
        explain('Inversion after "rarely"', 'Інверсія після "rarely"', 'Инверсия после "rarely"', 'Inversión después de "rarely"')),
      fillBlank(`${lessonId}-e3`, 'Fill: Seldom ___ she complain.', 'does',
        explain('Inversion: auxiliary + subject', 'Інверсія: допоміжне + підмет', 'Инверсия: вспомогательный + подлежащее', 'Inversión: auxiliar + sujeto')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['Not only did she win, but she also broke the record.', 'Not only she did win, but she also broke the record.', 'She not only did win, but she also broke the record.', 'She did not only win, but she also broke the record.'], 0,
        explain('Inversion after "not only"', 'Інверсія після "not only"', 'Инверсия после "not only"', 'Inversión después de "not only"')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'Hardly had I arrived when it started raining.',
        explain('Inversion with "hardly"', 'Інверсія з "hardly"', 'Инверсия с "hardly"', 'Inversión con "hardly"'))
    );
    return ex;
  }

  if (grammarKey === 'B2_PASSIVE_REPORTING') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['It is said that he is rich.', 'It says that he is rich.', 'It is saying that he is rich.', 'It said that he is rich.'], 0,
        explain('Impersonal passive reporting', 'Безособовий пасивний репортинг', 'Безличный пассивный репортинг', 'Reportaje pasivo impersonal')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['It is believed that the earth is round.', 'It believes that the earth is round.', 'It is believing that the earth is round.', 'It believed that the earth is round.'], 0,
        explain('Reporting structure: it is believed', 'Структура: it is believed', 'Структура: it is believed', 'Estructura: it is believed')),
      fillBlank(`${lessonId}-e3`, 'Fill: It is ___ that prices will rise.', 'thought',
        explain('it is thought that...', 'it is thought that...', 'it is thought that...', 'it is thought that...')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['It was reported that the president resigned.', 'It reported that the president resigned.', 'It is reporting that the president resigned.', 'It reports that the president resigned.'], 0,
        explain('Past reporting: it was reported', 'Минулий репортинг: it was reported', 'Прошлый репортинг: it was reported', 'Reportaje pasado: it was reported')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'It is claimed that the product is safe.',
        explain('Reporting structure', 'Структура репортингу', 'Структура репортинга', 'Estructura de reporte'))
    );
    return ex;
  }

  // C1 EXERCISES
  if (grammarKey === 'C1_INVERSION_STYLISTIC') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['Seldom have I witnessed such dedication.', 'Seldom I have witnessed such dedication.', 'I have seldom witnessed such dedication.', 'I seldom have witnessed such dedication.'], 0,
        explain('Literary inversion for emphasis', 'Літературна інверсія для емфази', 'Литературная инверсия для эмфазы', 'Inversión literaria para énfasis')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['Little did she know what awaited her.', 'Little she did know what awaited her.', 'She little did know what awaited her.', 'She did little know what awaited her.'], 0,
        explain('Stylistic inversion', 'Стилістична інверсія', 'Стилистическая инверсия', 'Inversión estilística')),
      fillBlank(`${lessonId}-e3`, 'Fill: Under no circumstances ___ you reveal this.', 'should',
        explain('Inversion: auxiliary + subject', 'Інверсія: допоміжне + підмет', 'Инверсия: вспомогательный + подлежащее', 'Inversión: auxiliar + sujeto')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['Only then did I realize my mistake.', 'Only then I did realize my mistake.', 'I only then did realize my mistake.', 'I did only then realize my mistake.'], 0,
        explain('Inversion after "only"', 'Інверсія після "only"', 'Инверсия после "only"', 'Inversión después de "only"')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'Never before had such a thing happened.',
        explain('Emphatic inversion', 'Емфатична інверсія', 'Эмфатическая инверсия', 'Inversión enfática'))
    );
    return ex;
  }

  if (grammarKey === 'C1_HEDGING') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['The data suggests a possible correlation.', 'The data proves a correlation.', 'The data shows definitely a correlation.', 'The data confirms absolutely a correlation.'], 0,
        explain('Hedging: use tentative language', 'Хеджинг: використовуй обережну мову', 'Хеджинг: используй осторожный язык', 'Hedging: usa lenguaje tentativo')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['This finding may be explained by several factors.', 'This finding is explained by several factors.', 'This finding must be explained by several factors.', 'This finding will be explained by several factors.'], 0,
        explain('Academic caution with "may"', 'Академічна обережність з "may"', 'Академическая осторожность с "may"', 'Precaución académica con "may"')),
      fillBlank(`${lessonId}-e3`, 'Fill: It would ___ that further research is needed.', 'appear',
        explain('Hedging phrase: would appear', 'Фраза хеджингу: would appear', 'Фраза хеджинга: would appear', 'Frase de hedging: would appear')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['The results tend to support the hypothesis.', 'The results always support the hypothesis.', 'The results definitely support the hypothesis.', 'The results absolutely support the hypothesis.'], 0,
        explain('Hedging with "tend to"', 'Хеджинг з "tend to"', 'Хеджинг с "tend to"', 'Hedging con "tend to"')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'There is some evidence to support this theory.',
        explain('Hedging quantifier "some"', 'Квантифікатор хеджингу "some"', 'Квантификатор хеджинга "some"', 'Cuantificador de hedging "some"'))
    );
    return ex;
  }

  if (grammarKey === 'C1_NOMINALISATION') {
    ex.push(
      mcq(`${lessonId}-e1`, 'Choose the correct sentence:', ['The implementation of the policy resulted in improvement.', 'Implementing the policy resulted in improving.', 'To implement the policy resulted in to improve.', 'The policy implemented resulted in improved.'], 0,
        explain('Nominalisation for academic style', 'Номіналізація для академічного стилю', 'Номинализация для академического стиля', 'Nominalización para estilo académico')),
      mcq(`${lessonId}-e2`, 'Choose the correct sentence:', ['The decision was made following the consideration of all factors.', 'Deciding was made following considering all factors.', 'To decide was made following to consider all factors.', 'The decide was made following the consider of all factors.'], 0,
        explain('Noun forms for formality', 'Іменники для формальності', 'Существительные для формальности', 'Formas nominales para formalidad')),
      fillBlank(`${lessonId}-e3`, 'Fill: The ___ (develop) of new technology takes time.', 'development',
        explain('develop → development', 'develop → development', 'develop → development', 'develop → development')),
      mcq(`${lessonId}-e4`, 'Choose the correct sentence:', ['The reduction in costs led to increased profits.', 'Reducing costs led to increasing profits.', 'To reduce costs led to to increase profits.', 'The reduce in costs led to increased profits.'], 0,
        explain('Nominalisation creates formal tone', 'Номіналізація створює формальний тон', 'Номинализация создаёт формальный тон', 'Nominalización crea tono formal')),
      sentenceOrder(`${lessonId}-e5`, 'Put in order:', 'The establishment of new regulations is necessary.',
        explain('Nominalised subject', 'Номіналізований підмет', 'Номинализованное подлежащее', 'Sujeto nominalizado'))
    );
    return ex;
  }

  // GENERIC FALLBACK (untuk grammar keys yang belum didefinisikan)
  ex.push(
    mcq(`${lessonId}-e1`, `Choose the best sentence for "${topic}":`,
      [`This is correct for ${topic.toLowerCase()}.`, `This are correct for ${topic.toLowerCase()}.`, `This be correct for ${topic.toLowerCase()}.`, `This being correct for ${topic.toLowerCase()}.`],
      0, explain('Correct grammar', 'Правильна граматика', 'Правильная грамматика', 'Gramática correcta')),
    fillBlank(`${lessonId}-e2`, 'Fill: I ___ English.', 'study',
      explain('Common verb', 'Поширене дієслово', 'Обычный глагол', 'Verbo común')),
    mcq(`${lessonId}-e3`, 'Choose correct:', ['What do you like?', 'What you like?', 'What like you?', 'What likes you?'],
      0, explain('Question word + do/does', 'Питальне слово + do/does', 'Вопросительное слово + do/does', 'Palabra interrogativa + do/does')),
    sentenceOrder(`${lessonId}-e4`, 'Put in order:', 'I like learning English.',
      explain('Natural order', 'Природний порядок', 'Естественный порядок', 'Orden natural')),
    mcq(`${lessonId}-e5`, 'Choose correct negative:', ['I don\'t understand.', 'I no understand.', 'I not understand.', 'I doesn\'t understand.'],
      0, explain('don\'t + verb', 'don\'t + дієслово', 'don\'t + глагол', 'don\'t + verbo'))
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

export function generateLessonsByLevel(level: CEFRLevel, count: number = 30): Lesson[] {
  const templates = (LESSON_TEMPLATES[level] ?? []).slice(0, count);
  return templates.map((t, i) => generateLesson(level, i, t));
}

export function generateSingleLesson(level: CEFRLevel, topic: string, grammar: string, storyEN: string): Lesson {
  const template: Template = {
    topic,
    grammarKey: 'A1_BE_PRESENT',
    storyEN: storyEN || `A short story about ${topic}.`,
    vocab: [grammar, topic, 'example', 'practice', 'learn']
  };

  return generateLesson(level, 0, template);
}
