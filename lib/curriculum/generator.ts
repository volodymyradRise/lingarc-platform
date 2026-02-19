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

interface GrammarExercise {
  question: string;
  correct: string;
  incorrect: string[];
  explanation: string;
}

const GRAMMAR_EXERCISES: Record<string, GrammarExercise[]> = {
  'verb to be': [
    {
      question: 'My name ___ Sarah.',
      correct: 'is',
      incorrect: ['am', 'are', 'be'],
      explanation: 'Use "is" with third person singular (he/she/it/name).'
    },
    {
      question: 'They ___ from Spain.',
      correct: 'are',
      incorrect: ['is', 'am', 'be'],
      explanation: 'Use "are" with plural subjects and "they".'
    },
    {
      question: 'I ___ a teacher.',
      correct: 'am',
      incorrect: ['is', 'are', 'be'],
      explanation: 'Use "am" only with "I".'
    },
    {
      question: 'She ___ happy today.',
      correct: 'is',
      incorrect: ['am', 'are', 'be'],
      explanation: 'Use "is" with "she" and other third person singular subjects.'
    },
    {
      question: 'We ___ students.',
      correct: 'are',
      incorrect: ['is', 'am', 'be'],
      explanation: 'Use "are" with "we" and other plural subjects.'
    }
  ],
  'possessive adjectives': [
    {
      question: 'This is ___ book.',
      correct: 'my',
      incorrect: ['mine', 'I', 'me'],
      explanation: 'Use "my" (possessive adjective) before a noun.'
    },
    {
      question: 'Is this ___ phone?',
      correct: 'your',
      incorrect: ['yours', 'you', 'you\'re'],
      explanation: 'Use "your" before a noun to show possession.'
    },
    {
      question: 'She loves ___ family.',
      correct: 'her',
      incorrect: ['hers', 'she', 'she\'s'],
      explanation: 'Use "her" (possessive adjective) before a noun.'
    },
    {
      question: '___ house is very big.',
      correct: 'Their',
      incorrect: ['Theirs', 'They', 'They\'re'],
      explanation: 'Use "their" before a noun to show plural possession.'
    },
    {
      question: 'The dog wagged ___ tail.',
      correct: 'its',
      incorrect: ['it\'s', 'it', 'his'],
      explanation: 'Use "its" (no apostrophe) for possession with things and animals.'
    }
  ],
  'present simple': [
    {
      question: 'She ___ to school every day.',
      correct: 'goes',
      incorrect: ['go', 'going', 'is go'],
      explanation: 'Add "s" or "es" to verbs in present simple with he/she/it.'
    },
    {
      question: 'They ___ football on weekends.',
      correct: 'play',
      incorrect: ['plays', 'playing', 'are play'],
      explanation: 'Use base form of verb with plural subjects in present simple.'
    },
    {
      question: 'He ___ coffee every morning.',
      correct: 'drinks',
      incorrect: ['drink', 'drinking', 'is drink'],
      explanation: 'Add "s" to regular verbs with he/she/it in present simple.'
    },
    {
      question: 'I ___ English and Spanish.',
      correct: 'speak',
      incorrect: ['speaks', 'speaking', 'am speak'],
      explanation: 'Use base form of verb with "I" in present simple.'
    },
    {
      question: 'The train ___ at 9 AM.',
      correct: 'leaves',
      incorrect: ['leave', 'leaving', 'is leaving'],
      explanation: 'Use present simple for schedules and timetables.'
    }
  ],
  'past simple regular': [
    {
      question: 'Yesterday, I ___ my friend.',
      correct: 'called',
      incorrect: ['call', 'calling', 'have called'],
      explanation: 'Add "ed" to regular verbs for past simple.'
    },
    {
      question: 'They ___ the movie last night.',
      correct: 'watched',
      incorrect: ['watch', 'watching', 'have watched'],
      explanation: 'Use past simple (verb + ed) for completed past actions.'
    },
    {
      question: 'She ___ in London for five years.',
      correct: 'lived',
      incorrect: ['live', 'living', 'has lived'],
      explanation: 'Use past simple for a completed period in the past.'
    },
    {
      question: 'We ___ at the restaurant yesterday.',
      correct: 'worked',
      incorrect: ['work', 'working', 'have worked'],
      explanation: 'Regular past simple: add "ed" to the base verb.'
    },
    {
      question: 'He ___ his homework last night.',
      correct: 'finished',
      incorrect: ['finish', 'finishing', 'has finished'],
      explanation: 'Use past simple with specific past time expressions.'
    }
  ],
  'past simple irregular': [
    {
      question: 'She ___ a letter yesterday.',
      correct: 'wrote',
      incorrect: ['writed', 'write', 'written'],
      explanation: 'Past simple of "write" is "wrote" (irregular).'
    },
    {
      question: 'They ___ to Paris last summer.',
      correct: 'went',
      incorrect: ['goed', 'go', 'gone'],
      explanation: 'Past simple of "go" is "went" (irregular).'
    },
    {
      question: 'I ___ three cups of coffee today.',
      correct: 'drank',
      incorrect: ['drinked', 'drink', 'drunk'],
      explanation: 'Past simple of "drink" is "drank" (irregular).'
    },
    {
      question: 'He ___ his keys at home.',
      correct: 'left',
      incorrect: ['leaved', 'leave', 'leaving'],
      explanation: 'Past simple of "leave" is "left" (irregular).'
    },
    {
      question: 'We ___ our old car last week.',
      correct: 'sold',
      incorrect: ['selled', 'sell', 'selling'],
      explanation: 'Past simple of "sell" is "sold" (irregular).'
    }
  ],
  'will vs going to': [
    {
      question: 'Look at those clouds! It ___ rain.',
      correct: 'is going to',
      incorrect: ['will', 'going to', 'is will'],
      explanation: 'Use "going to" for predictions based on present evidence.'
    },
    {
      question: 'I think I ___ stay home tonight.',
      correct: 'will',
      incorrect: ['going to', 'am going to', 'will to'],
      explanation: 'Use "will" for spontaneous decisions and predictions without evidence.'
    },
    {
      question: 'We ___ visit our grandparents next month.',
      correct: 'are going to',
      incorrect: ['will', 'going to', 'will to'],
      explanation: 'Use "going to" for planned future actions.'
    },
    {
      question: 'Don\'t worry, I ___ help you with that.',
      correct: 'will',
      incorrect: ['going to', 'am going to', 'will to'],
      explanation: 'Use "will" for offers and promises made at the moment of speaking.'
    },
    {
      question: 'She ___ start her new job on Monday.',
      correct: 'is going to',
      incorrect: ['will', 'going to', 'will to'],
      explanation: 'Use "going to" for intentions and plans.'
    }
  ],
  'comparative adjectives': [
    {
      question: 'This book is ___ than that one.',
      correct: 'more interesting',
      incorrect: ['interestinger', 'most interesting', 'more interest'],
      explanation: 'Use "more + adjective" for long adjectives (3+ syllables).'
    },
    {
      question: 'My brother is ___ than me.',
      correct: 'taller',
      incorrect: ['more tall', 'tallest', 'most tall'],
      explanation: 'Add "er" to short adjectives for comparatives.'
    },
    {
      question: 'This test was ___ than the last one.',
      correct: 'easier',
      incorrect: ['more easy', 'easiest', 'more easier'],
      explanation: 'For adjectives ending in "y", change "y" to "ier".'
    },
    {
      question: 'Today is ___ than yesterday.',
      correct: 'better',
      incorrect: ['more good', 'gooder', 'best'],
      explanation: '"Good" has irregular comparative form "better".'
    },
    {
      question: 'Living in the city is ___ than the countryside.',
      correct: 'more expensive',
      incorrect: ['expensiver', 'most expensive', 'more expensiver'],
      explanation: 'Use "more" with adjectives of 3+ syllables.'
    }
  ],
  'Present Perfect vs Past Simple': [
    {
      question: 'I ___ to London twice.',
      correct: 'have been',
      incorrect: ['was', 'went', 'have gone'],
      explanation: 'Use present perfect for life experiences without specific time.'
    },
    {
      question: 'She ___ her homework yesterday.',
      correct: 'did',
      incorrect: ['has done', 'have done', 'does'],
      explanation: 'Use past simple with specific past time markers like "yesterday".'
    },
    {
      question: 'They ___ here since 2015.',
      correct: 'have lived',
      incorrect: ['lived', 'are living', 'live'],
      explanation: 'Use present perfect with "since" for actions continuing to now.'
    },
    {
      question: 'We ___ that movie last week.',
      correct: 'saw',
      incorrect: ['have seen', 'have saw', 'seeing'],
      explanation: 'Use past simple for completed actions at a specific past time.'
    },
    {
      question: 'He ___ three emails today.',
      correct: 'has sent',
      incorrect: ['sent', 'send', 'is sending'],
      explanation: 'Use present perfect for actions in an unfinished time period.'
    }
  ],
  'Passive Voice Present': [
    {
      question: 'English ___ in many countries.',
      correct: 'is spoken',
      incorrect: ['speaks', 'is speak', 'spoken'],
      explanation: 'Present simple passive: is/are + past participle.'
    },
    {
      question: 'The letters ___ every morning.',
      correct: 'are delivered',
      incorrect: ['deliver', 'are deliver', 'is delivered'],
      explanation: 'Use "are" with plural subjects in present passive.'
    },
    {
      question: 'This room ___ twice a week.',
      correct: 'is cleaned',
      incorrect: ['cleans', 'is clean', 'cleaned'],
      explanation: 'Passive voice emphasizes the action, not the doer.'
    },
    {
      question: 'Coffee ___ in Brazil.',
      correct: 'is grown',
      incorrect: ['grows', 'is grow', 'grown'],
      explanation: 'Use passive when the doer is unknown or unimportant.'
    },
    {
      question: 'These cars ___ in Japan.',
      correct: 'are made',
      incorrect: ['make', 'are make', 'is made'],
      explanation: 'Plural subjects take "are" in passive voice.'
    }
  ],
  'Conditionals Type 2': [
    {
      question: 'If I ___ rich, I would travel the world.',
      correct: 'were',
      incorrect: ['am', 'was', 'would be'],
      explanation: 'Use "were" (not "was") with all subjects in second conditional.'
    },
    {
      question: 'She ___ you if she had your number.',
      correct: 'would call',
      incorrect: ['will call', 'called', 'calls'],
      explanation: 'Use "would + base verb" in the main clause of second conditional.'
    },
    {
      question: 'If they ___ harder, they would pass the exam.',
      correct: 'studied',
      incorrect: ['study', 'would study', 'will study'],
      explanation: 'Use past simple in the "if" clause of second conditional.'
    },
    {
      question: 'I ___ that car if I had enough money.',
      correct: 'would buy',
      incorrect: ['will buy', 'bought', 'buy'],
      explanation: 'Second conditional shows unreal or unlikely present/future.'
    },
    {
      question: 'If we ___ more time, we could visit the museum.',
      correct: 'had',
      incorrect: ['have', 'would have', 'will have'],
      explanation: 'Use past simple after "if" in second conditional.'
    }
  ],
  'Modal Verbs of Deduction': [
    {
      question: 'She ___ be at home. Her car is in the driveway.',
      correct: 'must',
      incorrect: ['can', 'might', 'could'],
      explanation: 'Use "must" for strong deductions based on evidence.'
    },
    {
      question: 'He ___ be tired. He worked all night.',
      correct: 'must',
      incorrect: ['can', 'may', 'should'],
      explanation: '"Must" shows near certainty based on logical reasoning.'
    },
    {
      question: 'They ___ be hungry. They ate an hour ago.',
      correct: 'can\'t',
      incorrect: ['must', 'might', 'could'],
      explanation: 'Use "can\'t" for negative deductions (impossible).'
    },
    {
      question: 'She ___ be at the library. I\'m not sure.',
      correct: 'might',
      incorrect: ['must', 'can\'t', 'will'],
      explanation: 'Use "might/may/could" for uncertainty (50% sure).'
    },
    {
      question: 'That ___ be John. He\'s in Paris this week.',
      correct: 'can\'t',
      incorrect: ['must', 'might', 'should'],
      explanation: '"Can\'t" expresses impossibility based on facts.'
    }
  ],
  'Advanced Perfect Tenses': [
    {
      question: 'By next year, I ___ here for ten years.',
      correct: 'will have worked',
      incorrect: ['will work', 'have worked', 'worked'],
      explanation: 'Use future perfect for actions completed before a future time.'
    },
    {
      question: 'She ___ for three hours when I arrived.',
      correct: 'had been waiting',
      incorrect: ['has been waiting', 'was waiting', 'waited'],
      explanation: 'Use past perfect continuous for duration before a past moment.'
    },
    {
      question: 'They ___ the project before the deadline.',
      correct: 'had finished',
      incorrect: ['have finished', 'finished', 'will finish'],
      explanation: 'Use past perfect to show one action happened before another past action.'
    },
    {
      question: 'I ___ this book for weeks, but I haven\'t finished yet.',
      correct: 'have been reading',
      incorrect: ['read', 'am reading', 'had read'],
      explanation: 'Use present perfect continuous for ongoing actions started in the past.'
    },
    {
      question: 'By the time she arrives, we ___ dinner.',
      correct: 'will have finished',
      incorrect: ['finish', 'have finished', 'will finish'],
      explanation: 'Future perfect shows completion before a future point.'
    }
  ],
  'Hedging Language': [
    {
      question: 'The data ___ a correlation between the variables.',
      correct: 'suggests',
      incorrect: ['proves', 'shows definitely', 'confirms absolutely'],
      explanation: 'Use tentative verbs like "suggests" in academic writing.'
    },
    {
      question: 'This finding ___ be explained by several factors.',
      correct: 'may',
      incorrect: ['must', 'will', 'does'],
      explanation: 'Use "may/might/could" to hedge claims in formal writing.'
    },
    {
      question: 'It ___ that further research is needed.',
      correct: 'would appear',
      incorrect: ['is obvious', 'is certain', 'proves'],
      explanation: 'Use hedging phrases to show academic caution.'
    },
    {
      question: 'The results ___ support the hypothesis.',
      correct: 'tend to',
      incorrect: ['always', 'definitely', 'absolutely'],
      explanation: 'Hedging shows awareness of limitations in research.'
    },
    {
      question: 'There is ___ evidence to support this theory.',
      correct: 'some',
      incorrect: ['absolute', 'definite', 'complete'],
      explanation: 'Use quantifiers like "some" to avoid overgeneralization.'
    }
  ]
};

const LESSON_TEMPLATES = {
  A1: [
    { topic: 'Personal Information', grammar: 'verb to be', story: 'Maria walks into a coffee shop and introduces herself to the barista Tom. They exchange greetings and names, practicing basic introductions in English.' },
    { topic: 'Family Members', grammar: 'possessive adjectives', story: 'John shows his family photos to his classmate, explaining who everyone is. He describes his mother, father, sister, and grandparents using possessive words.' },
    { topic: 'Numbers and Age', grammar: 'questions with how', story: 'At a birthday party, children talk about their ages and count the candles on the cake. They practice numbers from one to twenty.' },
    { topic: 'Daily Activities', grammar: 'present simple', story: 'Carlos describes his typical day: waking up, eating breakfast, going to work, and returning home. He talks about habits and routines.' },
    { topic: 'Food and Drinks', grammar: 'like/want + noun', story: 'At a restaurant, customers order their meals. They say what they like to eat and what they want to drink for lunch.' },
    { topic: 'Colors and Objects', grammar: 'adjectives', story: 'Sarah goes shopping and describes items by their color and size. She looks for a big red bag and small blue shoes.' },
    { topic: 'Time and Schedule', grammar: 'prepositions of time', story: 'Ahmed checks his calendar and talks about his meetings. He has a dentist appointment at 3 PM and dinner plans in the evening.' },
    { topic: 'Weather', grammar: 'present continuous', story: 'People discuss the weather through the seasons. Today it is raining, but tomorrow the sun is going to shine.' },
    { topic: 'Locations', grammar: 'there is/are', story: 'A tour guide describes the city center. There is a beautiful park, and there are many shops and cafes on the main street.' },
    { topic: 'Transportation', grammar: 'prepositions of movement', story: 'Emma explains her commute to work. She walks to the bus stop, gets on the bus, and travels into the city center.' },
    { topic: 'Jobs and Work', grammar: 'simple questions', story: 'At a job fair, people ask each other about their professions. What do you do? Where do you work? Do you like your job?' },
    { topic: 'Hobbies', grammar: 'frequency adverbs', story: 'Friends discuss their free time activities. Tom always plays tennis on Saturdays. Anna sometimes reads books and often watches movies.' },
    { topic: 'Body Parts', grammar: 'imperatives', story: 'In an exercise class, the instructor gives commands. Touch your toes! Raise your arms! Bend your knees!' },
    { topic: 'Clothing', grammar: 'present continuous for wearing', story: 'Lisa is getting ready for a party. She is wearing a blue dress and putting on her favorite shoes.' },
    { topic: 'House and Rooms', grammar: 'prepositions of place', story: 'Mark shows his apartment to a friend. The kitchen is next to the living room, and the bedroom is upstairs.' },
    { topic: 'School Subjects', grammar: 'like/dislike + gerund', story: 'Students talk about their classes. David likes studying history but dislikes doing mathematics homework.' },
    { topic: 'Animals', grammar: 'can/cannot', story: 'At the zoo, children learn about animal abilities. Birds can fly, fish can swim, but elephants cannot jump.' },
    { topic: 'Shopping', grammar: 'how much/many', story: 'In a supermarket, customers ask about quantities and prices. How much does this cost? How many apples do you need?' },
    { topic: 'Holidays', grammar: 'going to future', story: 'A family plans their summer vacation. They are going to visit Spain and are going to stay for two weeks.' },
    { topic: 'Common Verbs Review', grammar: 'mixed tenses', story: 'Elena writes in her journal about yesterday, today, and tomorrow, using different verbs and time expressions together.' }
  ],
  A2: [
    { topic: 'Past Experiences', grammar: 'past simple regular', story: 'Friends meet after the weekend and share stories about what they did. They talk about movies they watched and places they visited.' },
    { topic: 'Irregular Verbs', grammar: 'past simple irregular', story: 'A grandfather tells his grandchildren about his childhood. He went to school, ate simple meals, and had many adventures.' },
    { topic: 'Future Plans', grammar: 'will vs going to', story: 'Colleagues discuss upcoming projects and spontaneous decisions about lunch plans, demonstrating different future forms.' },
    { topic: 'Comparisons', grammar: 'comparative adjectives', story: 'Two cities are compared: one is bigger, the other is more beautiful. The weather is better in one place than the other.' },
    { topic: 'Superlatives', grammar: 'superlative adjectives', story: 'A travel show ranks destinations. Which is the most beautiful country? What is the best hotel? Where is the highest mountain?' },
    { topic: 'Quantity', grammar: 'much/many/some/any', story: 'At the grocery store, shoppers make their lists. They need some bread, many vegetables, but not much sugar.' },
    { topic: 'Advice', grammar: 'should/shouldnt', story: 'A friend gives health advice. You should exercise regularly. You shouldn\'t eat too much sugar. You should sleep eight hours.' },
    { topic: 'Obligations', grammar: 'have to/must', story: 'Workers discuss company rules. You must wear a uniform. You have to arrive on time. Everyone must follow safety procedures.' },
    { topic: 'Abilities', grammar: 'can/could', story: 'People talk about their skills. She can speak three languages. He could swim when he was five. Can you play the piano?' },
    { topic: 'Permission', grammar: 'may/might', story: 'Students ask their teacher politely. May I leave early? Might I borrow your pen? May we work together?' },
    { topic: 'Conditionals Type 0', grammar: 'if + present simple', story: 'A science teacher explains facts. If you heat water to 100 degrees, it boils. If plants don\'t get water, they die.' },
    { topic: 'Conditionals Type 1', grammar: 'if + will', story: 'Making plans with conditions. If it rains tomorrow, we will stay home. If she calls, I will tell her the news.' },
    { topic: 'Present Perfect Introduction', grammar: 'have/has + past participle', story: 'Travelers share their experiences. I have visited Paris. She has tried sushi. Have you ever been to London?' },
    { topic: 'Time Expressions', grammar: 'already/yet/just', story: 'Checking progress on tasks. I have already finished my homework. He hasn\'t called yet. She has just arrived at the airport.' },
    { topic: 'Questions Formation', grammar: 'wh-questions', story: 'A journalist interviews a celebrity. Where do you live? When did you start acting? Why did you choose this career?' },
    { topic: 'Adverbs of Manner', grammar: 'adjective + ly', story: 'Describing how people do things. She speaks quietly. He works carefully. They completed the task quickly and efficiently.' },
    { topic: 'Linking Words', grammar: 'and/but/because', story: 'Telling a story with connections. I wanted to go out, but it was raining. She stayed home because she felt tired.' },
    { topic: 'There was/were', grammar: 'past existence', story: 'Describing a historical place. There was a castle on the hill. There were many soldiers protecting it centuries ago.' },
    { topic: 'Used to', grammar: 'past habits', story: 'Remembering the past. I used to play football every weekend. She used to live in Rome. Did you use to have long hair?' },
    { topic: 'Review Mixed Tenses', grammar: 'all A2 grammar', story: 'A complete narrative using multiple tenses and structures, integrating all grammar points learned at this level.' }
  ],
  B1: [
    { topic: 'Present Perfect vs Past Simple', grammar: 'finished vs unfinished time', story: 'James talks about his career. He has worked at TechCorp for three years, but last year, he led a major project. He has learned a lot since joining the company.' },
    { topic: 'Present Perfect Continuous', grammar: 'duration emphasis', story: 'Athletes discuss their training. She has been running for two hours. They have been practicing since morning. How long have you been studying English?' },
    { topic: 'Past Continuous', grammar: 'interrupted actions', story: 'Describing an accident scene. While I was driving to work, a car suddenly appeared. What were you doing when the phone rang?' },
    { topic: 'Past Perfect', grammar: 'earlier past', story: 'Explaining mistakes and regrets. By the time I arrived, the train had already left. She felt sad because she had forgotten her friend\'s birthday.' },
    { topic: 'Future Continuous', grammar: 'future in progress', story: 'Making arrangements. This time tomorrow, I will be flying to Tokyo. At 8 PM tonight, we will be having dinner at the restaurant.' },
    { topic: 'Future Perfect', grammar: 'completion by future time', story: 'Setting deadlines and goals. By next month, I will have finished the course. In five years, she will have graduated from university.' },
    { topic: 'Conditionals Type 2', grammar: 'unreal present', story: 'Imagining different lives. If I were rich, I would travel the world. If she had more time, she would learn to play piano.' },
    { topic: 'Conditionals Type 3', grammar: 'unreal past', story: 'Expressing regret about the past. If I had studied harder, I would have passed the exam. If we had left earlier, we wouldn\'t have missed the flight.' },
    { topic: 'Modal Verbs of Deduction', grammar: 'must/might/cant be', story: 'Making logical conclusions. She must be at home because her car is there. He can\'t be tired; he slept for ten hours. They might be in the library.' },
    { topic: 'Passive Voice Present', grammar: 'is/are + past participle', story: 'Describing processes and facts. English is spoken in many countries. These cars are made in Germany. Coffee is grown in Brazil.' },
    { topic: 'Passive Voice Past', grammar: 'was/were + past participle', story: 'Historical events. The telephone was invented by Bell. The pyramids were built thousands of years ago. The letter was sent yesterday.' },
    { topic: 'Reported Speech Statements', grammar: 'say/tell + that', story: 'Passing on information. She said that she was tired. He told me that he couldn\'t come to the party. They said they had finished the project.' },
    { topic: 'Reported Speech Questions', grammar: 'ask + if/wh', story: 'Reporting what people asked. She asked if I was ready. He asked me where I lived. They wanted to know what time we would arrive.' },
    { topic: 'Relative Clauses Defining', grammar: 'who/which/that', story: 'Giving essential information. The man who lives next door is a doctor. The book that I bought yesterday is interesting. People who exercise regularly are healthier.' },
    { topic: 'Relative Clauses Non-defining', grammar: 'commas + who/which', story: 'Adding extra information. My brother, who lives in Paris, is visiting next week. The Eiffel Tower, which is in Paris, attracts millions of tourists.' },
    { topic: 'Gerunds and Infinitives', grammar: 'verb patterns', story: 'Expressing preferences and purposes. I enjoy reading novels. She decided to study medicine. They avoid eating fast food. He went to the store to buy milk.' },
    { topic: 'Articles', grammar: 'a/an/the/zero', story: 'Using articles correctly. I saw a dog in the park. The dog was playing with a ball. Life is beautiful. She plays the piano.' },
    { topic: 'Quantifiers', grammar: 'few/little/several', story: 'Describing amounts precisely. A few people came to the meeting. We have little time left. Several students passed the exam. I need a little help.' },
    { topic: 'Phrasal Verbs', grammar: 'verb + preposition', story: 'Using common phrasal verbs. I get up at 7 AM. Please turn off the lights. She looks after her grandmother. They gave up smoking.' },
    { topic: 'Mixed Tenses Review', grammar: 'all B1 structures', story: 'An integrated narrative demonstrating all B1 grammar points in context, showing how different tenses and structures work together.' }
  ],
  B2: [
    { topic: 'Advanced Perfect Tenses', grammar: 'perfect aspect usage', story: 'By next year, I will have worked here for a decade. She had been waiting for three hours when I arrived. Complex timelines require careful tense selection.' },
    { topic: 'Passive with Modals', grammar: 'modal + be + past participle', story: 'The report must be submitted by Friday. The problem could be solved with better planning. Safety regulations should be followed at all times.' },
    { topic: 'Passive Reporting Structures', grammar: 'it is said that', story: 'It is believed that the economy will improve. It is reported that officials have reached an agreement. It was thought that the project would fail.' },
    { topic: 'Causative Have/Get', grammar: 'have/get something done', story: 'I had my car repaired yesterday. She needs to get her hair cut. We are having the house painted next week. He got his phone fixed.' },
    { topic: 'Mixed Conditionals', grammar: 'combining types', story: 'If I had studied medicine, I would be a doctor now. If she were more careful, she wouldn\'t have broken the vase. Combining past and present unreal situations.' },
    { topic: 'Wish and Regrets', grammar: 'wish + past/would', story: 'I wish I knew the answer. She wishes she had studied harder. If only I could speak French. We wish they would stop making noise.' },
    { topic: 'Cleft Sentences', grammar: 'what/it is...that', story: 'What I need is a vacation. It was John who broke the window. What surprised me was her honesty. It is quality that matters, not quantity.' },
    { topic: 'Inversion', grammar: 'negative adverbials', story: 'Never have I seen such beauty. Rarely does he make mistakes. Not only did she win, but she also broke the record. Formal emphasis through inversion.' },
    { topic: 'Subjunctive', grammar: 'formal suggestions', story: 'I suggest that he take the job. It is essential that everyone be present. She demanded that the mistake be corrected. Formal recommendations require subjunctive mood.' },
    { topic: 'Advanced Linking', grammar: 'despite/although', story: 'Despite the rain, we went hiking. Although tired, she continued working. In spite of difficulties, they succeeded. Expressing contrast effectively.' },
    { topic: 'Participle Clauses', grammar: 'reduced relative clauses', story: 'Walking down the street, I saw my friend. Having finished the work, they went home. Being tired, she decided to rest. Concise clause reduction.' },
    { topic: 'Noun Phrases', grammar: 'complex subjects', story: 'The rapid development of technology poses challenges. Her inability to compromise caused problems. The government\'s response to the crisis was criticized. Academic noun phrase structures.' },
    { topic: 'Advanced Modals', grammar: 'may well/could have', story: 'She may well be right about this. He could have been injured. They might have misunderstood the instructions. Expressing degrees of possibility and speculation.' },
    { topic: 'Conditionals in Context', grammar: 'mixed uses', story: 'Various conditional structures in negotiation and discussion. Should you need assistance, please call. Were I to accept, what would happen? Had we known, we wouldn\'t have come.' },
    { topic: 'Discourse Markers', grammar: 'furthermore/moreover', story: 'The proposal is expensive. Furthermore, it lacks detail. Moreover, the timeline is unrealistic. Nevertheless, it deserves consideration. Organizing complex arguments.' },
    { topic: 'Emphasis Structures', grammar: 'do/does/did emphasis', story: 'I do think you should reconsider. She does care about the environment. They did complete the project on time. Emphatic assertion in discourse.' },
    { topic: 'Substitution', grammar: 'so/neither/nor', story: 'I love coffee, and so does she. He can\'t swim, and neither can I. She speaks French, and so do they. Avoiding repetition through substitution.' },
    { topic: 'Ellipsis', grammar: 'omitting understood words', story: 'Want some coffee? Going to the store? Already finished? Natural speech through ellipsis. Reducing unnecessary repetition in conversation.' },
    { topic: 'Fronting', grammar: 'topic-comment structure', story: 'This book, I really enjoyed. Tomorrow, we need to finish. The results, however, were disappointing. Emphasizing information through word order.' },
    { topic: 'Comprehensive Review', grammar: 'all B2 structures', story: 'An integrated demonstration of B2 grammar points in authentic contexts, showing sophisticated language use and natural integration of complex structures.' }
  ],
  C1: [
    { topic: 'Stylistic Inversion', grammar: 'literary devices', story: 'Seldom have I witnessed such dedication. Little did she know what awaited her. Under no circumstances should you reveal this information. Advanced inversion for emphasis.' },
    { topic: 'Nominalisation', grammar: 'verb to noun conversion', story: 'The implementation of the policy resulted in the improvement of conditions. The decision was made following the consideration of all factors. Academic register through nominalisation.' },
    { topic: 'Hedging Language', grammar: 'tentative expressions', story: 'The data suggests a possible correlation. It would appear that further investigation is warranted. There is some evidence to indicate. Academic caution and precision.' },
    { topic: 'Stance Markers', grammar: 'personal positioning', story: 'Arguably, this represents the most significant development. Clearly, intervention is necessary. Interestingly, the results contradict previous findings. Authorial voice in academic writing.' },
    { topic: 'Metadiscourse', grammar: 'text organization signals', story: 'As outlined in the introduction, this paper examines three key areas. To summarize the main points discussed above. The following section will address. Guiding readers through complex texts.' },
    { topic: 'Complex Conditionals', grammar: 'layered hypotheticals', story: 'Were it not for their intervention, had circumstances been different, should the situation have deteriorated further. Sophisticated hypothetical reasoning.' },
    { topic: 'Subjunctive Moods', grammar: 'formal demands', story: 'It is imperative that measures be taken immediately. The board requires that all members attend. We insist that the policy be revised. Legal and formal language.' },
    { topic: 'Split Infinitives', grammar: 'stylistic choices', story: 'The mission aimed to boldly explore new territories. Writers choose to deliberately split infinitives for emphasis. Understanding when style overrides traditional rules.' },
    { topic: 'Nested Clauses', grammar: 'embedded structures', story: 'The theory, which researchers, having conducted extensive studies, believe to be valid, contradicts earlier assumptions. Managing complex syntactic structures.' },
    { topic: 'Apposition', grammar: 'noun phrase elaboration', story: 'The CEO, a Harvard graduate with twenty years of experience in technology, announced the merger. Adding information through appositive structures.' },
    { topic: 'Parallelism', grammar: 'balanced structures', story: 'The proposal offers clarity, provides direction, and ensures accountability. We came, we saw, we conquered. Rhetorical effect through parallel structure.' },
    { topic: 'Antithesis', grammar: 'contrasting ideas', story: 'Ask not what your country can do for you, but what you can do for your country. Setting up contrasts for persuasive effect.' },
    { topic: 'Chiasmus', grammar: 'inverted parallelism', story: 'Never let a fool kiss you or a kiss fool you. It\'s not the years in your life but the life in your years. Memorable reversed structures.' },
    { topic: 'Litotes', grammar: 'understatement', story: 'She is not unkind. The task is not insignificant. This is no small achievement. Emphasizing through understatement.' },
    { topic: 'Zeugma', grammar: 'economical expression', story: 'She arrived in a taxi and a bad mood. He lost his wallet and his temper. Achieving effect through grammatical economy.' },
    { topic: 'Register Shifts', grammar: 'contextual appropriacy', story: 'Understanding when to shift between formal, neutral, and informal registers. Adapting language to audience and purpose.' },
    { topic: 'Pragmatic Markers', grammar: 'interpersonal functions', story: 'Well, to be honest, frankly speaking, if you ask me. Managing social aspects of communication through pragmatic markers.' },
    { topic: 'Evaluative Language', grammar: 'attitudinal lexis', story: 'Remarkably, the results exceeded expectations. Disturbingly, violations continued. Fortunately, intervention proved effective. Conveying attitude through word choice.' },
    { topic: 'Cohesive Devices', grammar: 'textual integration', story: 'Consequently, therefore, hence, thus, accordingly, as a result. Creating seamless text through sophisticated linking.' },
    { topic: 'Integrated Mastery', grammar: 'all advanced features', story: 'A demonstration of near-native competence, integrating stylistic devices, complex structures, and nuanced expression in authentic professional and academic contexts.' }
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
    ['car', 'bus', 'train', 'plane', 'walk', 'drive', 'travel', 'arrive', 'leave', 'station'],
    ['teacher', 'doctor', 'nurse', 'police', 'student', 'job', 'office', 'hospital', 'school', 'work'],
    ['read', 'write', 'listen', 'watch', 'play', 'hobby', 'music', 'sport', 'movie', 'book'],
    ['head', 'hand', 'foot', 'eye', 'ear', 'nose', 'mouth', 'arm', 'leg', 'body'],
    ['shirt', 'pants', 'dress', 'shoes', 'coat', 'hat', 'wear', 'clothes', 'color', 'size'],
    ['house', 'room', 'kitchen', 'bedroom', 'bathroom', 'living', 'door', 'window', 'floor', 'wall'],
    ['math', 'history', 'science', 'English', 'class', 'teacher', 'student', 'learn', 'test', 'homework'],
    ['dog', 'cat', 'bird', 'fish', 'lion', 'elephant', 'zoo', 'pet', 'animal', 'wild'],
    ['buy', 'sell', 'price', 'money', 'cheap', 'expensive', 'shop', 'store', 'market', 'pay'],
    ['summer', 'winter', 'beach', 'mountain', 'trip', 'hotel', 'vacation', 'visit', 'tourist', 'camera'],
    ['go', 'come', 'take', 'give', 'make', 'have', 'see', 'know', 'think', 'want']
  ],
  A2: [
    ['weekend', 'party', 'friend', 'fun', 'enjoy', 'relax', 'activity', 'time', 'remember', 'experience'],
    ['childhood', 'memory', 'grew', 'played', 'learned', 'school', 'young', 'past', 'ago', 'used'],
    ['plan', 'future', 'will', 'going', 'next', 'soon', 'hope', 'want', 'dream', 'goal'],
    ['compare', 'different', 'similar', 'than', 'more', 'less', 'better', 'worse', 'bigger', 'smaller'],
    ['best', 'worst', 'most', 'least', 'ever', 'world', 'famous', 'popular', 'favorite', 'top'],
    ['shopping', 'list', 'need', 'buy', 'enough', 'too', 'much', 'many', 'some', 'any'],
    ['health', 'advice', 'should', 'doctor', 'medicine', 'exercise', 'diet', 'sick', 'tired', 'better'],
    ['rule', 'must', 'have', 'need', 'law', 'important', 'necessary', 'required', 'follow', 'obey'],
    ['skill', 'ability', 'can', 'could', 'able', 'learn', 'practice', 'improve', 'talent', 'good'],
    ['polite', 'may', 'might', 'could', 'please', 'excuse', 'sorry', 'permission', 'allow', 'ask'],
    ['science', 'fact', 'true', 'always', 'happen', 'result', 'cause', 'effect', 'natural', 'law'],
    ['possible', 'maybe', 'probably', 'if', 'rain', 'stay', 'cancel', 'change', 'depend', 'decide'],
    ['travel', 'visit', 'country', 'city', 'culture', 'language', 'meet', 'try', 'experience', 'enjoy'],
    ['already', 'yet', 'just', 'still', 'recently', 'lately', 'before', 'never', 'ever', 'once'],
    ['question', 'answer', 'ask', 'tell', 'explain', 'understand', 'know', 'learn', 'information', 'detail'],
    ['quickly', 'slowly', 'carefully', 'easily', 'badly', 'well', 'hard', 'fast', 'quietly', 'loudly'],
    ['story', 'because', 'so', 'but', 'and', 'then', 'first', 'next', 'finally', 'after'],
    ['history', 'past', 'ago', 'ancient', 'old', 'building', 'castle', 'museum', 'war', 'king'],
    ['before', 'change', 'different', 'now', 'modern', 'technology', 'past', 'habit', 'usually', 'anymore'],
    ['review', 'practice', 'test', 'exam', 'study', 'prepare', 'ready', 'complete', 'finish', 'success']
  ],
  B1: [
    ['career', 'professional', 'experience', 'company', 'project', 'responsibility', 'achieve', 'develop', 'skill', 'success'],
    ['training', 'practice', 'improve', 'progress', 'effort', 'dedication', 'continue', 'develop', 'athlete', 'coach'],
    ['accident', 'suddenly', 'while', 'happen', 'unexpected', 'surprise', 'moment', 'situation', 'witness', 'describe'],
    ['regret', 'mistake', 'wish', 'should', 'could', 'opportunity', 'miss', 'sorry', 'learn', 'improve'],
    ['arrange', 'appointment', 'schedule', 'meet', 'plan', 'organize', 'confirm', 'remind', 'expect', 'prepare'],
    ['deadline', 'goal', 'achieve', 'complete', 'finish', 'accomplish', 'target', 'objective', 'milestone', 'success'],
    ['imagine', 'dream', 'wish', 'possible', 'unreal', 'fantasy', 'hope', 'desire', 'prefer', 'ideal'],
    ['regret', 'past', 'different', 'change', 'mistake', 'sorry', 'should', 'could', 'would', 'opportunity'],
    ['deduce', 'conclude', 'logic', 'reason', 'evidence', 'certain', 'possible', 'impossible', 'probably', 'definitely'],
    ['process', 'method', 'produce', 'manufacture', 'create', 'make', 'system', 'procedure', 'step', 'result'],
    ['history', 'invent', 'discover', 'create', 'develop', 'past', 'century', 'ancient', 'modern', 'change'],
    ['conversation', 'report', 'tell', 'say', 'explain', 'mention', 'inform', 'communicate', 'discuss', 'talk'],
    ['survey', 'question', 'ask', 'answer', 'response', 'opinion', 'view', 'think', 'believe', 'feel'],
    ['describe', 'identify', 'define', 'explain', 'characteristic', 'feature', 'quality', 'property', 'type', 'kind'],
    ['additional', 'extra', 'information', 'detail', 'fact', 'example', 'instance', 'case', 'particular', 'specific'],
    ['prefer', 'enjoy', 'like', 'love', 'hate', 'avoid', 'decide', 'choose', 'want', 'need'],
    ['specific', 'general', 'particular', 'certain', 'definite', 'indefinite', 'some', 'any', 'all', 'none'],
    ['amount', 'quantity', 'number', 'few', 'little', 'several', 'many', 'much', 'enough', 'plenty'],
    ['phrasal', 'verb', 'common', 'everyday', 'expression', 'idiom', 'meaning', 'use', 'understand', 'practice'],
    ['comprehensive', 'complete', 'full', 'entire', 'whole', 'all', 'every', 'each', 'review', 'integrate']
  ],
  B2: [
    ['timeline', 'sequence', 'chronology', 'prior', 'subsequent', 'duration', 'period', 'span', 'interval', 'phase'],
    ['obligation', 'requirement', 'necessity', 'essential', 'mandatory', 'compulsory', 'regulation', 'compliance', 'enforcement', 'adherence'],
    ['speculation', 'allegation', 'claim', 'assertion', 'statement', 'declaration', 'announcement', 'report', 'disclosure', 'revelation'],
    ['commission', 'service', 'arrangement', 'provision', 'maintenance', 'repair', 'installation', 'implementation', 'execution', 'completion'],
    ['hypothesis', 'scenario', 'possibility', 'alternative', 'combination', 'mixture', 'blend', 'integration', 'synthesis', 'merger'],
    ['regret', 'remorse', 'disappointment', 'dissatisfaction', 'frustration', 'desire', 'aspiration', 'longing', 'yearning', 'hope'],
    ['emphasis', 'stress', 'highlight', 'focus', 'attention', 'prominence', 'significance', 'importance', 'priority', 'concern'],
    ['formality', 'register', 'style', 'tone', 'manner', 'approach', 'convention', 'protocol', 'etiquette', 'propriety'],
    ['recommendation', 'suggestion', 'proposal', 'advice', 'counsel', 'guidance', 'direction', 'instruction', 'prescription', 'mandate'],
    ['contrast', 'opposition', 'difference', 'distinction', 'divergence', 'discrepancy', 'inconsistency', 'contradiction', 'paradox', 'irony'],
    ['reduction', 'compression', 'condensation', 'abbreviation', 'simplification', 'streamlining', 'efficiency', 'economy', 'brevity', 'conciseness'],
    ['complexity', 'sophistication', 'elaboration', 'intricacy', 'detail', 'nuance', 'subtlety', 'refinement', 'precision', 'accuracy'],
    ['speculation', 'conjecture', 'supposition', 'assumption', 'presumption', 'inference', 'deduction', 'conclusion', 'interpretation', 'analysis'],
    ['negotiation', 'discussion', 'deliberation', 'consultation', 'dialogue', 'exchange', 'interaction', 'communication', 'discourse', 'debate'],
    ['argumentation', 'reasoning', 'logic', 'rationale', 'justification', 'explanation', 'clarification', 'elucidation', 'exposition', 'demonstration'],
    ['assertion', 'claim', 'statement', 'declaration', 'affirmation', 'confirmation', 'verification', 'validation', 'authentication', 'substantiation'],
    ['avoidance', 'omission', 'exclusion', 'elimination', 'reduction', 'minimization', 'simplification', 'streamlining', 'efficiency', 'economy'],
    ['naturalness', 'spontaneity', 'fluency', 'ease', 'facility', 'proficiency', 'competence', 'mastery', 'expertise', 'skill'],
    ['arrangement', 'organization', 'structure', 'configuration', 'layout', 'design', 'format', 'pattern', 'system', 'framework'],
    ['integration', 'synthesis', 'combination', 'unification', 'consolidation', 'amalgamation', 'merger', 'fusion', 'blend', 'mixture']
  ],
  C1: [
    ['inversion', 'reversal', 'transposition', 'rearrangement', 'reordering', 'restructuring', 'modification', 'alteration', 'transformation', 'conversion'],
    ['nominalisation', 'transformation', 'conversion', 'derivation', 'formation', 'construction', 'creation', 'generation', 'production', 'manifestation'],
    ['hedging', 'qualification', 'mitigation', 'moderation', 'tempering', 'softening', 'attenuation', 'dilution', 'reduction', 'minimization'],
    ['stance', 'position', 'perspective', 'viewpoint', 'outlook', 'orientation', 'attitude', 'approach', 'disposition', 'inclination'],
    ['metadiscourse', 'signposting', 'navigation', 'guidance', 'direction', 'orientation', 'organization', 'structure', 'framework', 'architecture'],
    ['hypothetical', 'conditional', 'contingent', 'provisional', 'tentative', 'speculative', 'conjectural', 'suppositional', 'theoretical', 'abstract'],
    ['imperative', 'mandatory', 'obligatory', 'compulsory', 'required', 'necessary', 'essential', 'crucial', 'vital', 'critical'],
    ['stylistic', 'rhetorical', 'expressive', 'communicative', 'linguistic', 'grammatical', 'syntactic', 'semantic', 'pragmatic', 'functional'],
    ['embedding', 'nesting', 'incorporation', 'integration', 'inclusion', 'insertion', 'interpolation', 'intercalation', 'interjection', 'parenthesis'],
    ['apposition', 'juxtaposition', 'adjacency', 'proximity', 'contiguity', 'elaboration', 'expansion', 'amplification', 'development', 'extension'],
    ['parallelism', 'symmetry', 'balance', 'equilibrium', 'correspondence', 'equivalence', 'parity', 'equality', 'uniformity', 'consistency'],
    ['antithesis', 'opposition', 'contrast', 'contradiction', 'dichotomy', 'polarity', 'duality', 'tension', 'conflict', 'confrontation'],
    ['chiasmus', 'reversal', 'inversion', 'mirror', 'reflection', 'symmetry', 'balance', 'correspondence', 'reciprocity', 'mutuality'],
    ['litotes', 'understatement', 'meiosis', 'minimization', 'downplaying', 'depreciation', 'diminution', 'reduction', 'attenuation', 'mitigation'],
    ['zeugma', 'syllepsis', 'economy', 'efficiency', 'brevity', 'conciseness', 'succinctness', 'terseness', 'compactness', 'compression'],
    ['register', 'formality', 'appropriacy', 'suitability', 'fitness', 'propriety', 'decorum', 'convention', 'protocol', 'etiquette'],
    ['pragmatic', 'functional', 'practical', 'utilitarian', 'instrumental', 'operational', 'effective', 'efficient', 'purposeful', 'goal-oriented'],
    ['evaluative', 'judgmental', 'critical', 'analytical', 'interpretive', 'qualitative', 'subjective', 'opinionated', 'biased', 'partial'],
    ['cohesion', 'coherence', 'unity', 'integration', 'connection', 'linkage', 'continuity', 'flow', 'progression', 'development'],
    ['mastery', 'proficiency', 'competence', 'expertise', 'skill', 'ability', 'capability', 'capacity', 'faculty', 'aptitude']
  ]
};

function getExercisesForGrammar(grammar: string): GrammarExercise[] {
  const normalized = grammar.toLowerCase();
  
  for (const key in GRAMMAR_EXERCISES) {
    if (normalized.includes(key)) {
      return GRAMMAR_EXERCISES[key];
    }
  }
  
  return GRAMMAR_EXERCISES['verb to be'];
}

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

  const grammarExercises = getExercisesForGrammar(template.grammar);
  const exercises: Exercise[] = grammarExercises.map((ex, i) => ({
    id: `${lessonId}-e${i + 1}`,
    type: 'multiple_choice',
    questionEN: ex.question,
    options: [ex.correct, ...ex.incorrect].sort(() => Math.random() - 0.5),
    correct: [ex.correct, ...ex.incorrect].sort(() => Math.random() - 0.5).indexOf(ex.correct),
    explanations: {
      en: ex.explanation,
      uk: `[Пояснення: ${ex.explanation}]`,
      ru: `[Объяснение: ${ex.explanation}]`,
      es: `[Explicación: ${ex.explanation}]`
    }
  }));

  return {
    id: lessonId,
    titleEN: template.topic,
    type: 'grammar',
    level,
    xp: xpBase[level],
    storyEN: template.story,
    exercises: exercises.slice(0, 5),
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
