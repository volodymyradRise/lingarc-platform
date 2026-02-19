// lib/curriculum/generator.ts - PART 1: A1 LEVEL

import type { CEFRLevel } from '../i18n/types';

export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'sentence_order' | 'word_match';
  questionEN: string;
  options?: string[];
  words?: string[]; // ДЛЯ sentence_order - слова для складання речення
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
  // ===== БЛОК 1: Уроки 1-5 =====
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
- How many...? (quantity)

**Real examples:**
👶 "My baby is one year old."
👦 "I'm ten years old."
👨 "He's twenty-five."

**Important notes:**
- We say "years old" (NOT "year old" after numbers 2+)
- You can drop "years old" in casual speech: "I'm 20."

**Cultural tip:** In English-speaking countries, it's normal to ask age, but be polite with older adults!`,
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
✅ Schedules: "The train leaves at 9:00"

**The Rules:**

**For I/You/We/They:**
Just use the base verb!
- I work
- You study
- We live
- They play

**For He/She/It:**
Add **-s** or **-es**!
- He work**s**
- She studi**es**
- It rain**s**

**Special verbs:**
- go → go**es**
- watch → watch**es**
- study → studi**es**
- have → **has** (irregular!)

**Questions:**
Use **Do** or **Does**:
- "Do you work?" (I/you/we/they)
- "Does she work?" (he/she/it)

**Negatives:**
- "I don't work"
- "He doesn't work"

**Real life examples:**
✅ "I wake up at 7 AM."
✅ "She works in a bank."
✅ "They live in Lviv."

**Common mistakes:**
❌ "He work every day" → ✅ "He workS"
❌ "She don't like coffee" → ✅ "She doeSN'T like"`,
    vocab: ['work', 'study', 'live', 'wake up', 'sleep', 'eat', 'drink', 'go', 'come', 'every day']
  },
  {
    topic: 'Food and Drinks',
    grammarKey: 'A1_L5_LIKE_WANT',
    grammarExplanation: `**Lesson 5: I Like Pizza! Expressing Preferences 🍕☕**

Time to talk about food! Learn to say what you like and want.

**Key verbs for preferences:**

**LIKE** (подобається):
- I like coffee
- She likes tea
- Do you like pizza?

**LOVE** (дуже подобається):
- I love chocolate!
- He loves pasta

**WANT** (хочу):
- I want water
- She wants pizza
- Do you want coffee?

**DON'T LIKE / HATE** (не подобається):
- I don't like vegetables
- He hates fish

**Grammar pattern:**
Subject + like/love/want + NOUN/GERUND(-ing)

**Examples:**
✅ "I like Italian food."
✅ "She wants a sandwich."
✅ "Do you like coffee?"
✅ "I love cooking!" (gerund)

**At a restaurant:**
- "I'd like a coffee, please." (polite want)
- "What would you like?" (polite question)

**Food vocabulary groups:**
🥖 Bread, rice, pasta
🍖 Meat, fish, chicken
🥗 Vegetables, fruit
🥛 Water, milk, juice, tea, coffee

**Cultural note:** In English-speaking countries, saying "I want..." can sound rude. Better use "I'd like..." or "Can I have...?"

**Practice phrases:**
- "I'm hungry" (Я голодний)
- "I'm thirsty" (Я хочу пити)
- "It's delicious!" (Смачно!)`,
    vocab: ['like', 'love', 'want', 'food', 'water', 'bread', 'meat', 'fruit', 'hungry', 'thirsty']
  },

  // ===== TEST 1 (після уроків 1-5) =====
  {
    topic: 'Review Test 1: Basics',
    grammarKey: 'A1_TEST1',
    grammarExplanation: `**🎯 Progress Check: Lessons 1-5**

Time to test what you've learned! This review covers:
- ✅ Verb "to be" (am/is/are)
- ✅ Possessive adjectives (my/your/his/her)
- ✅ Numbers and age
- ✅ Present Simple (daily routines)
- ✅ Like/want/love

**Don't worry!** This is practice. Mistakes help you learn!`,
    vocab: [],
    isTest: true
  },

  // ===== БЛОК 2: Уроки 6-10 =====
  {
    topic: 'Colors and Objects',
    grammarKey: 'A1_L6_ADJECTIVES',
    grammarExplanation: `**Lesson 6: Describing Things - Adjectives and Colors 🎨**

Want to describe the world around you? You need **adjectives**!

**What are adjectives?**
Words that describe nouns (people, places, things).

**Common adjectives:**
📏 **Size:** big, small, large, tiny
🎨 **Color:** red, blue, green, yellow, black, white
📅 **Age:** new, old, young
😊 **Quality:** good, bad, beautiful, ugly, nice

**Word order in English:**
Adjective + NOUN (NOT noun + adjective!)
✅ "a red car" (NOT "a car red")
✅ "a big house"
✅ "an old book"

**Multiple adjectives:**
Opinion → Size → Age → Color → Noun
✅ "a beautiful big old red car"

**Articles with adjectives:**
- Use **a** before consonant sounds: a big dog
- Use **an** before vowel sounds: an old man

**Color vocabulary:**
🔴 red
🔵 blue
🟢 green
🟡 yellow
⚫ black
⚪ white
🟠 orange
🟣 purple
🟤 brown
🩷 pink

**Real sentences:**
- "I have a blue car."
- "She's wearing a red dress."
- "It's a beautiful day!"

**Pro tip:** In English, adjectives DON'T change for plural:
✅ "red cars" (NOT "reds cars")`,
    vocab: ['red', 'blue', 'green', 'yellow', 'big', 'small', 'new', 'old', 'beautiful', 'color']
  },
  {
    topic: 'Time and Schedule',
    grammarKey: 'A1_L7_TIME',
    grammarExplanation: `**Lesson 7: What Time Is It? ⏰**

Time to learn about time! Essential for appointments, meetings, and daily life.

**Telling time:**

**On the hour:**
- 1:00 - It's one o'clock
- 2:00 - It's two o'clock
- 12:00 - It's twelve o'clock / noon / midnight

**Half past:**
- 1:30 - It's half past one
- 2:30 - It's half past two

**Quarter past/to:**
- 1:15 - It's quarter past one
- 1:45 - It's quarter to two

**Minutes:**
- 1:05 - It's five past one
- 1:55 - It's five to two

**Asking about time:**
- "What time is it?"
- "What's the time?"

**Prepositions with time:**

**AT** for specific times:
- at 9 o'clock
- at midnight
- at lunchtime

**IN** for parts of the day:
- in the morning
- in the afternoon
- in the evening
❗ BUT: at night (exception!)

**ON** for days:
- on Monday
- on weekends
- on Friday morning

**Time expressions:**
- today (сьогодні)
- tomorrow (завтра)
- yesterday (вчора)
- now (зараз)
- later (пізніше)
- soon (скоро)

**Real examples:**
- "The meeting is at 3 PM."
- "I wake up at 7 in the morning."
- "See you on Monday!"

**12-hour vs 24-hour:**
English commonly uses 12-hour format with AM/PM:
- 9:00 AM (morning)
- 9:00 PM (evening)`,
    vocab: ['time', 'clock', 'morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'at', 'on']
  },
  {
    topic: 'Places in the City',
    grammarKey: 'A1_L8_THERE_IS_ARE',
    grammarExplanation: `**Lesson 8: There Is / There Are - Describing Places 🏙️**

How do you say something exists or doesn't exist? Use "there is/are"!

**The structure:**

**Singular (one thing):**
✅ There **is** a park.
✅ There **is** a bank.
❌ There **are** a shop. (wrong!)

**Plural (many things):**
✅ There **are** two schools.
✅ There **are** many restaurants.
❌ There **is** three cafes. (wrong!)

**Questions:**
- "Is there a bank here?"
- "Are there any restaurants nearby?"

**Negatives:**
- "There isn't a pool." (singular)
- "There aren't any shops." (plural)

**With some/any:**
✅ There are **some** cafes. (positive)
✅ There aren't **any** banks. (negative)
❓ Are there **any** shops? (question)

**Prepositions of place:**
- in (в середині): in the city
- on (на поверхні): on the street
- near (біля): near the park
- next to (поряд з): next to the bank
- opposite (навпроти): opposite the school
- between (між): between the shop and cafe

**Real sentences:**
- "There's a supermarket on Main Street."
- "There are three parks in my city."
- "Is there a pharmacy near here?"
- "There aren't any restaurants open now."

**Common places vocabulary:**
🏦 bank
🏪 shop/store
🍽️ restaurant
☕ cafe
🏥 hospital
🏫 school
📚 library
🏛️ museum
🏨 hotel
🚉 station

**Useful question:**
"Excuse me, is there a... near here?"`,
    vocab: ['there', 'is', 'are', 'bank', 'shop', 'restaurant', 'park', 'school', 'near', 'street']
  },
  {
    topic: 'Transportation',
    grammarKey: 'A1_L9_TRANSPORT',
    grammarExplanation: `**Lesson 9: How Do You Get There? Transport 🚗🚌🚇**

Let's learn to talk about how you travel!

**Prepositions with transport:**

**BY** (general):
- by car
- by bus
- by train
- by plane
- by bike
- by taxi

**ON** (you can stand on it):
- on the bus
- on the train
- on a bike
- on a plane
- on a horse

**IN** (you are inside):
- in a car
- in a taxi

**ON FOOT:**
Special! = walking

**Important verbs:**
- **go** (йти): I go to work by bus
- **take** (брати): I take the train
- **drive** (водити): She drives to work
- **walk** (йти пішки): We walk to school
- **ride** (їхати): He rides a bike
- **fly** (літати): They fly to London

**Questions:**
- "How do you get to work?"
- "How do you go to school?"
- "Do you drive?"

**Answers:**
- "I go by bus."
- "I take the metro."
- "I walk." / "I go on foot."
- "I drive."

**Time expressions with transport:**
- "The bus leaves at 8:00."
- "The train arrives at 9:30."
- "How long does it take?" (Скільки часу?)
- "It takes 20 minutes." (Займає 20 хвилин)

**Real conversations:**
A: "How do you get to work?"
B: "I take the metro. It takes 30 minutes."

A: "Do you drive?"
B: "No, I go by bus."

**Transport vocabulary:**
🚗 car
🚌 bus
🚇 metro/subway/underground
🚂 train
✈️ plane
🚕 taxi
🚲 bike
🚶 on foot (walking)
🚢 boat/ship`,
    vocab: ['car', 'bus', 'train', 'metro', 'bike', 'walk', 'drive', 'go', 'take', 'by']
  },
  {
    topic: 'Hobbies and Free Time',
    grammarKey: 'A1_L10_HOBBIES',
    grammarExplanation: `**Lesson 10: What Do You Do in Your Free Time? 🎮📚⚽**

Time to talk about fun! Your hobbies and interests.

**Common hobby verbs:**
- **play** (грати): play football, play games, play piano
- **do** (займатися): do sport, do yoga, do homework
- **go** (-ing activities): go swimming, go shopping, go running
- **watch** (дивитися): watch TV, watch movies
- **listen** (слухати): listen to music
- **read** (читати): read books
- **cook** (готувати)
- **dance** (танцювати)

**Usage patterns:**

**PLAY + sports with ball:**
- play football ⚽
- play basketball 🏀
- play tennis 🎾
- play volleyball 🏐

**PLAY + musical instruments:**
- play the piano 🎹
- play the guitar 🎸
- play the violin 🎻
Note: Use "the" with instruments!

**DO + sports without ball:**
- do karate 🥋
- do yoga 🧘
- do gymnastics

**GO + -ing:**
- go swimming 🏊
- go running 🏃
- go shopping 🛍️
- go dancing 💃
- go skiing ⛷️

**Frequency adverbs:**
Tell HOW OFTEN:
- always (завжди) 100%
- usually (зазвичай) 80%
- often (часто) 60%
- sometimes (іноді) 40%
- rarely (рідко) 20%
- never (ніколи) 0%

**Position:** After "be", before other verbs:
- "I am always happy."
- "I usually play football on weekends."

**Questions about hobbies:**
- "What do you like doing?"
- "What are your hobbies?"
- "What do you do in your free time?"
- "Do you play any sports?"

**Answers:**
- "I like reading."
- "I play football every weekend."
- "I love listening to music."
- "I don't do any sport."

**Talking about ability:**
- "I can play piano."
- "I can't swim."
- "Can you cook?"

**Real conversation:**
A: "What do you do in your free time?"
B: "I usually play video games and sometimes go swimming. What about you?"
A: "I love reading books and watching movies."`,
    vocab: ['play', 'do', 'go', 'hobby', 'sport', 'music', 'read', 'watch', 'listen', 'free time']
  },

  // ===== TEST 2 (після уроків 6-10) =====
  {
    topic: 'Review Test 2: Daily Life',
    grammarKey: 'A1_TEST2',
    grammarExplanation: `**🎯 Progress Check: Lessons 6-10**

This review covers:
- ✅ Adjectives and colors
- ✅ Telling time
- ✅ There is/are (places)
- ✅ Transportation
- ✅ Hobbies and free time

**Keep going! You're doing great! 💪**`,
    vocab: [],
    isTest: true
  },

  // ===== БЛОК 3: Уроки 11-15 =====
  {
    topic: 'Body Parts and Health',
    grammarKey: 'A1_L11_BODY',
    grammarExplanation: `**Lesson 11: Body Parts - Head, Shoulders, Knees and Toes! 👤💪**

Essential for talking about health, exercise, and describing people!

**Main body parts:**

**Head region:**
👁️ eyes
👂 ears
👃 nose
👄 mouth
🦷 teeth
👅 tongue
🧠 head
💇 hair
👔 neck

**Upper body:**
💪 arm
🤲 hand
☝️ finger
👍 thumb
💗 heart
🫁 chest
🫃 stomach/belly

**Lower body:**
🦵 leg
🦶 foot (plural: feet)
🦴 knee
👣 toe

**Whole body:**
🦴 back
💪 shoulder

**Talking about health:**

**"I have..." (for pain):**
- "I have a headache." (голова болить)
- "I have a stomachache." (живіт болить)
- "I have a toothache." (зуб болить)

**"My ... hurts" (альтернатива):**
- "My head hurts."
- "My stomach hurts."
- "My legs hurt." (plural!)

**Common health problems:**
🤒 fever (температура)
🤧 cold (застуда)
😷 flu (грип)
🤮 nausea (нудота)
😴 tired (втомлений)
🤕 pain (біль)

**At the doctor:**
- "I don't feel well." (Я погано себе почуваю)
- "I feel sick." (Мені погано)
- "My throat hurts." (Горло болить)

**Imperatives for health:**
- "Open your mouth."
- "Close your eyes."
- "Raise your hand."
- "Touch your toes."

**Exercise vocabulary:**
- move your arms
- bend your knees
- touch your head
- shake your leg`,
    vocab: ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'leg', 'foot', 'arm', 'hurt']
  },
  {
    topic: 'Clothes and Weather',
    grammarKey: 'A1_L12_CLOTHES',
    grammarExplanation: `**Lesson 12: What Are You Wearing? Clothes and Weather 👕🌤️**

Learn to describe clothes and talk about weather!

**Common clothing:**

**Top clothes:**
👕 T-shirt
👔 shirt
🧥 jacket
🧶 sweater
🎽 dress

**Bottom clothes:**
👖 jeans
👗 skirt
🩳 shorts
👖 trousers/pants

**Footwear:**
👞 shoes
👟 sneakers
🥾 boots
🩴 sandals

**Accessories:**
🎩 hat
🧢 cap
🧣 scarf
🧤 gloves
👓 glasses
⌚ watch

**Verbs:**
- **wear** (носити): "I wear jeans."
- **put on** (одягати): "Put on your jacket!"
- **take off** (знімати): "Take off your shoes."

**Present Continuous for wearing:**
- "I am wearing a blue shirt."
- "She is wearing a red dress."
- "What are you wearing?"

**Weather vocabulary:**

☀️ **sunny** (сонячно)
☁️ **cloudy** (хмарно)
🌧️ **rainy** (дощить)
❄️ **snowy** (сніг)
💨 **windy** (вітряно)
🌡️ **hot** (спекотно)
🥶 **cold** (холодно)
😎 **warm** (тепло)
😊 **nice** (гарна погода)

**Talking about weather:**
- "What's the weather like?" (Яка погода?)
- "It's sunny." (Сонячно)
- "It's raining." (Дощить)
- "It's cold today." (Сьогодні холодно)

**Connecting clothes and weather:**
- "It's cold. I'm wearing a jacket."
- "It's hot. She's wearing shorts."
- "It's raining. Put on your coat!"
- "It's sunny. I'm wearing sunglasses."

**Questions:**
- "What's the weather like?"
- "What are you wearing today?"
- "Do you like this dress?"

**Describing clothes:**
Adjective + Color + Item
- "a beautiful blue dress"
- "an old black jacket"
- "new red shoes"`,
    vocab: ['shirt', 'pants', 'dress', 'shoes', 'jacket', 'wear', 'weather', 'sunny', 'rainy', 'cold']
  },
  {
    topic: 'House and Rooms',
    grammarKey: 'A1_L13_HOUSE',
    grammarExplanation: `**Lesson 13: My House - Rooms and Furniture 🏠**

Describe your home and what's inside!

**Rooms in a house:**
🛏️ **bedroom** (спальня)
🛁 **bathroom** (ванна)
🍳 **kitchen** (кухня)
🛋️ **living room** (вітальня)
📚 **study** (кабінет)
🍽️ **dining room** (їдальня)
🚗 **garage** (гараж)
🏡 **garden** (сад)

**Furniture vocabulary:**

**In the bedroom:**
🛏️ bed
💤 pillow
👕 wardrobe/closet
🪟 window
🚪 door

**In the living room:**
🛋️ sofa/couch
📺 TV
💺 chair
🪑 table
📚 bookshelf

**In the kitchen:**
🍳 stove/cooker
❄️ fridge/refrigerator
🔥 oven
🚰 sink
🪑 chair

**In the bathroom:**
🛁 bath/bathtub
🚿 shower
🚽 toilet
🪞 mirror
🚰 sink

**Prepositions of place:**
- **in** (в середині): in the room, in the box
- **on** (на поверхні): on the table, on the wall
- **under** (під): under the bed
- **next to** (поряд з): next to the window
- **between** (між): between the sofa and the chair
- **in front of** (перед): in front of the TV
- **behind** (за): behind the door

**There is/are with house:**
- "There is a bed in the bedroom."
- "There are three chairs in the kitchen."
- "Is there a TV in your room?"
- "Are there any windows?"

**Describing your home:**
- "I live in a house/apartment."
- "My house has three bedrooms."
- "There's a big garden."
- "The kitchen is small but nice."

**Questions:**
- "Do you live in a house or an apartment?"
- "How many rooms are there?"
- "What's in your bedroom?"
- "Do you have a garden?"`,
    vocab: ['house', 'room', 'bedroom', 'kitchen', 'bathroom', 'table', 'chair', 'bed', 'window', 'door']
  },
  {
    topic: 'School and Education',
    grammarKey: 'A1_L14_SCHOOL',
    grammarExplanation: `**Lesson 14: Back to School! Education Vocabulary 📚✏️**

Essential vocabulary for students!

**School places:**
🏫 **school**
🎓 **university/college**
📚 **library**
🥼 **classroom**
🎭 **gym/sports hall**
🍽️ **canteen/cafeteria**
🏃 **playground**

**People at school:**
👨‍🏫 **teacher**
👨‍🎓 **student/pupil**
🎓 **professor**
👨‍💼 **director/principal**
📚 **librarian**

**School subjects:**
📖 **English**
🔢 **Maths/Math**
🧪 **Science**
🗺️ **Geography**
📜 **History**
🎨 **Art**
🎵 **Music**
⚽ **PE (Physical Education)**
💻 **IT (Information Technology)**

**School objects:**
📚 book
📓 notebook
✏️ pencil
🖊️ pen
✂️ scissors
📏 ruler
🎒 backpack/bag
💻 computer
📱 tablet
🖥️ board

**Verbs for studying:**
- **study** (вивчати): "I study English."
- **learn** (вчитися): "I'm learning French."
- **teach** (викладати): "She teaches maths."
- **read** (читати)
- **write** (писати)
- **do** (робити): "do homework"
- **take** (брати): "take notes"
- **pass** (здавати успішно): "pass the exam"
- **fail** (провалити): "fail the test"

**Like/dislike + subjects:**
- "I like history."
- "She loves art."
- "He hates maths."
- "Do you like science?"

**Present Simple for routines:**
- "I go to school at 8 AM."
- "Classes start at 9."
- "We have English on Monday."
- "School finishes at 3 PM."

**Questions about school:**
- "What's your favorite subject?"
- "What do you study?"
- "Do you like your school?"
- "What time does school start?"

**Useful phrases:**
- "I have a test tomorrow."
- "I need to do my homework."
- "Can I borrow your pen?"
- "I don't understand."`,
    vocab: ['school', 'teacher', 'student', 'book', 'pen', 'study', 'learn', 'subject', 'class', 'homework']
  },
  {
    topic: 'Animals and Pets',
    grammarKey: 'A1_L15_ANIMALS',
    grammarExplanation: `**Lesson 15: Animals - Wild and Pets 🐕🦁🐈**

Talk about your favorite animals!

**Common pets:**
🐕 **dog**
🐈 **cat**
🐟 **fish**
🐦 **bird**
🐹 **hamster**
🐰 **rabbit**
🐢 **turtle**

**Farm animals:**
🐄 **cow**
🐷 **pig**
🐑 **sheep**
🐐 **goat**
🐔 **chicken**
🐴 **horse**
🦆 **duck**

**Wild animals:**
🦁 **lion**
🐯 **tiger**
🐻 **bear**
🐘 **elephant**
🦒 **giraffe**
🐒 **monkey**
🐺 **wolf**
🦊 **fox**

**Animal abilities with CAN:**

**What animals CAN do:**
- Birds **can fly** ✈️
- Fish **can swim** 🏊
- Dogs **can run** 🏃
- Monkeys **can climb** 🧗

**What animals CAN'T do:**
- Elephants **can't jump**
- Fish **can't walk**
- Penguins **can't fly**

**Structure:**
Subject + can/can't + verb

**Questions:**
- "Can birds swim?" → "Some can, some can't."
- "Can you ride a horse?" → "Yes, I can." / "No, I can't."

**Have/Have got with pets:**
- "I have a dog." (US English)
- "I've got a cat." (UK English)
- "Do you have any pets?"
- "She has two cats."

**Describing animals:**

**Size:**
big, small, tiny, huge, enormous

**Color:**
black, white, brown, grey, orange

**Characteristics:**
fast, slow, dangerous, friendly, wild, domestic

**Examples:**
- "Lions are big and dangerous."
- "My cat is small and black."
- "Elephants are huge!"

**Questions about pets:**
- "Do you have any pets?"
- "What's your favorite animal?"
- "Are you afraid of dogs?"
- "Can you swim like a fish?"

**Plural animals:**
Most add -s: cats, dogs, birds
Special plurals:
- fish → fish (same!)
- sheep → sheep (same!)
- mouse → mice
- goose → geese

**Sounds animals make:**
- Dogs bark 🐕 (гавкають)
- Cats meow 🐈 (нявчать)
- Birds sing 🐦 (співають)
- Cows moo 🐄 (мукають)`,
    vocab: ['dog', 'cat', 'bird', 'fish', 'animal', 'pet', 'can', 'swim', 'fly', 'run']
  },

  // ===== TEST 3 (після уроків 11-15) =====
  {
    topic: 'Review Test 3: Describing the World',
    grammarKey: 'A1_TEST3',
    grammarExplanation: `**🎯 Progress Check: Lessons 11-15**

This review covers:
- ✅ Body parts and health
- ✅ Clothes and weather
- ✅ House and rooms
- ✅ School subjects
- ✅ Animals and abilities (can/can't)

**You're more than halfway through A1! 🌟**`,
    vocab: [],
    isTest: true
  },

  // ===== БЛОК 4: Уроки 16-20 =====
  {
    topic: 'Shopping and Money',
    grammarKey: 'A1_L16_SHOPPING',
    grammarExplanation: `**Lesson 16: Let's Go Shopping! 🛍️💰**

Essential language for buying things!

**Types of shops:**
🛒 **supermarket** (супермаркет)
🏪 **shop/store** (магазин)
👗 **clothes shop** (магазин одягу)
📚 **bookshop** (книгарня)
💊 **pharmacy** (аптека)
🍞 **bakery** (пекарня)
🥩 **butcher** (м'ясний)

**Money vocabulary:**
💵 money
💰 price
💳 credit card
💵 cash
🧾 receipt
💸 change (решта)
💰 expensive (дорого)
💵 cheap (дешево)

**Shopping verbs:**
- **buy** (купувати): "I buy bread."
- **sell** (продавати): "They sell shoes."
- **cost** (коштувати): "How much does it cost?"
- **pay** (платити): "I pay cash."
- **spend** (витрачати): "I spend €20."

**How much/How many:**

**How much** (скільки) + uncountable:
- "How much is this?" (Скільки це коштує?)
- "How much money do you have?"
- "How much does it cost?"

**How many** (скільки) + countable:
- "How many apples do you want?"
- "How many euros?"

**At the shop - Useful phrases:**

**Customer:**
- "How much is this?"
- "Can I try it on?" (clothes)
- "Do you have this in blue?"
- "I'd like to buy..."
- "I'll take it."
- "Can I pay by card?"

**Shop assistant:**
- "Can I help you?"
- "What size?"
- "That's €10, please."
- "Would you like a bag?"

**Numbers for prices:**
- €5.50 = five euros fifty (cents)
- $10.99 = ten dollars ninety-nine (cents)
- £20 = twenty pounds

**This/That/These/Those:**
- "How much is **this** shirt?" (близько, однина)
- "I want **that** bag." (далеко, однина)
- "**These** shoes are nice." (близько, множина)
- "**Those** jeans are expensive." (далеко, множина)

**Real shopping dialogue:**
A: "Can I help you?"
B: "Yes, how much is this T-shirt?"
A: "It's 15 euros."
B: "I'll take it. Can I pay by card?"
A: "Of course!"`,
    vocab: ['shop', 'buy', 'money', 'price', 'expensive', 'cheap', 'how much', 'cost', 'pay', 'euro']
  },
  {
    topic: 'Present Continuous',
    grammarKey: 'A1_L17_PRESENT_CONT',
    grammarExplanation: `**Lesson 17: What Are You Doing NOW? Present Continuous ⏰**

Talk about actions happening RIGHT NOW!

**When to use Present Continuous:**
✅ Actions happening NOW:
- "I am eating." (Я їм зараз)
- "She is studying." (Вона зараз вчиться)

✅ Temporary situations:
- "He is living in Paris." (Тимчасово живе)

✅ Future arrangements:
- "I'm meeting John tomorrow." (Домовленість)

**Structure:**
Subject + am/is/are + verb-ING

**Positive:**
- I **am working**
- You/We/They **are working**
- He/She/It **is working**

**Negative:**
- I **am not (I'm not) working**
- You **are not (aren't) working**
- He **is not (isn't) working**

**Questions:**
- **Am** I working?
- **Are** you working?
- **Is** he working?

**How to make -ING:**

**Regular: add -ing**
- work → working
- play → playing
- read → reading

**Drop silent -e: + ing**
- make → making
- write → writing
- dance → dancing

**Double consonant: + ing**
(CVC - consonant-vowel-consonant)
- run → running
- sit → sitting
- swim → swimming

**Special:**
- lie → lying
- die → dying

**Time expressions:**
- now (зараз)
- at the moment (в даний момент)
- right now (прямо зараз)
- currently (наразі)
- today (сьогодні - якщо тимчасово)

**Present Simple vs Continuous:**

**Present Simple** (habits/facts):
- "I work every day." ✅
- "She lives in Kyiv." ✅

**Present Continuous** (now):
- "I am working now." ✅
- "She is living in London." ✅ (temporarily)

**Questions:**
- "What are you doing?" (Що ти робиш?)
- "Are you listening?" (Ти слухаєш?)
- "Who is cooking?" (Хто готує?)

**Common mistakes:**
❌ "I am work" → ✅ "I am working"
❌ "She working" → ✅ "She is working"
❌ "Are you work?" → ✅ "Are you working?"

**Stative verbs (NOT used in continuous):**
❌ "I am knowing" → ✅ "I know"
❌ "She is having a car" → ✅ "She has a car"

Stative verbs: know, like, love, hate, want, need, have (possession), see, hear, understand`,
    vocab: ['doing', 'working', 'eating', 'reading', 'watching', 'now', 'at the moment', 'currently', 'right now', 'today']
  },
  {
    topic: 'Can and Can\'t - Abilities',
    grammarKey: 'A1_L18_CAN',
    grammarExplanation: `**Lesson 18: I Can Do It! Talking About Abilities 💪**

Express what you can and cannot do!

**CAN - Uses:**
1️⃣ **Ability** (вміння):
- "I can swim."
- "She can speak English."

2️⃣ **Permission** (дозвіл):
- "Can I go to the bathroom?"
- "You can sit here."

3️⃣ **Possibility** (можливість):
- "You can buy it online."

**Structure:**
Subject + can/can't + VERB (base form)

**Positive:**
- I/You/He/She/It/We/They **can** swim
(Same form for everyone!)

**Negative:**
- I/You/He **cannot** swim
- Short form: **can't** swim

**Questions:**
- **Can** you swim?
- **Can** she drive?
- **Can** they speak English?

**Answers:**
- "Yes, I can." ✅
- "No, I can't." ❌
- "Yes, she can."
- "No, they can't."

**Important rules:**
✅ can + BASE VERB (not -s, not -ing!)
✅ "He can swim" (NOT "He cans swim")
✅ "Can you help?" (NOT "Do you can help?")
✅ "I can't dance" (NOT "I don't can dance")

**Common abilities:**

**Physical:**
- swim 🏊
- run 🏃
- jump
- climb 🧗
- dance 💃

**Mental/Skills:**
- speak (languages)
- drive 🚗
- cook 🍳
- sing 🎤
- play (instruments) 🎸
- read 📖
- write ✍️

**Asking about abilities:**
- "Can you cook?"
- "Can he drive?"
- "Can they speak English?"
- "What languages can you speak?"
- "What can you do?"

**Talking about yourself:**
- "I can speak three languages."
- "I can't swim, but I can run fast."
- "I can play the guitar."
- "I can't drive yet."

**Real conversation:**
A: "Can you help me?"
B: "Yes, I can. What do you need?"

A: "Can you speak Spanish?"
B: "No, I can't. But I can speak French."

**Could (past of can):**
- "When I was young, I could run fast."
- "She couldn't swim last year."

**Will be able to (future):**
- "I will be able to drive next year."
- "He won't be able to come."`,
    vocab: ['can', 'cannot', 'able', 'ability', 'swim', 'drive', 'cook', 'speak', 'play', 'help']
  },
  {
    topic: 'Going to Future',
    grammarKey: 'A1_L19_GOING_TO',
    grammarExplanation: `**Lesson 19: Future Plans with "Going to" 📅**

Talk about your plans and predictions!

**When to use "going to":**

1️⃣ **Plans and intentions:**
- "I'm going to visit Paris." (План)
- "She's going to study medicine." (Намір)

2️⃣ **Predictions with evidence:**
- "Look at those clouds! It's going to rain." (Бачимо хмари)
- "Be careful! You're going to fall!" (Бачимо небезпеку)

**Structure:**
Subject + am/is/are + going to + VERB (base form)

**Positive:**
- I **am going to** travel
- You/We/They **are going to** travel
- He/She/It **is going to** travel

**Negative:**
- I **am not going to** work
- She **is not (isn't) going to** come
- They **are not (aren't) going to** stay

**Questions:**
- **Am** I going to work?
- **Is** she going to come?
- **Are** they going to stay?
- **What** are you going to do?
- **Where** is he going to go?

**Wh- Questions:**
- "What are you going to do tomorrow?"
- "Where are you going to go?"
- "When is she going to arrive?"
- "Who is going to help?"

**Short answers:**
- "Yes, I am." / "No, I'm not."
- "Yes, she is." / "No, she isn't."
- "Yes, they are." / "No, they aren't."

**Common time expressions:**
- tomorrow (завтра)
- next week/month/year (наступного тижня)
- tonight (сьогодні ввечері)
- soon (скоро)
- in the future (у майбутньому)
- later (пізніше)

**Going to vs Will:**

**GOING TO** (plan decided before):
- "I'm going to buy a car." ✅ (Already decided)

**WILL** (spontaneous decision):
- "I'll buy that car!" ✅ (Decided now)

**Both for predictions:**
- "It's going to rain." ✅
- "It will rain." ✅

**Examples:**

**Plans:**
- "We're going to have a party next week."
- "I'm going to learn Spanish this year."
- "He's going to quit his job."

**Predictions:**
- "Watch out! You're going to spill the coffee!"
- "The sky is grey. It's going to rain."
- "He's going to be late again."

**Real conversation:**
A: "What are you going to do this weekend?"
B: "I'm going to visit my grandparents. What about you?"
A: "I'm going to stay home and watch movies."

**Common mistakes:**
❌ "I going to go" → ✅ "I'm going to go"
❌ "She is going to goes" → ✅ "She is going to go"
❌ "Are you going to working?" → ✅ "Are you going to work?"`,
    vocab: ['going to', 'plan', 'future', 'tomorrow', 'next', 'soon', 'visit', 'travel', 'will', 'tonight']
  },
  {
    topic: 'Prepositions and Directions',
    grammarKey: 'A1_L20_DIRECTIONS',
    grammarExplanation: `**Lesson 20: How Do I Get There? Giving Directions 🗺️**

Essential for navigating and helping others!

**Prepositions of place (revision):**

**IN** (в середині):
- in the box
- in the room
- in the building
- in the city

**ON** (на поверхні):
- on the table
- on the wall
- on the floor
- on Main Street

**AT** (у конкретному місці):
- at the bus stop
- at the corner
- at home
- at work

**NEAR/NEXT TO** (біля/поряд):
- near the bank
- next to the shop

**OPPOSITE** (навпроти):
- opposite the school

**BETWEEN** (між):
- between the bank and the post office

**IN FRONT OF** (перед):
- in front of the cinema

**BEHIND** (за):
- behind the building

**Giving directions - Key verbs:**

**GO:**
- go straight (йти прямо)
- go left/right (йти ліворуч/праворуч)
- go past (проходити повз)

**TURN:**
- turn left (повернути ліворуч)
- turn right (повернути праворуч)

**TAKE:**
- take the first/second street (взяти першу/другу вулицю)

**CROSS:**
- cross the road (перейти дорогу)

**WALK:**
- walk along (йти вздовж)

**Useful phrases:**

**Asking for directions:**
- "Excuse me, where is the bank?"
- "How do I get to the station?"
- "Is there a pharmacy near here?"
- "Can you help me? I'm lost."

**Giving directions:**
- "Go straight ahead."
- "Turn left at the corner."
- "It's on your right."
- "It's next to the bank."
- "Walk past the park."
- "Take the second street on the left."
- "It's about 5 minutes from here."
- "You can't miss it!" (Не пропустиш!)

**Distance expressions:**
- near (близько)
- far (далеко)
- 5 minutes away (за 5 хвилин)
- around the corner (за рогом)
- at the end of the street (в кінці вулиці)

**Complete directions example:**
"Excuse me, how do I get to the library?"
"Go straight for 2 minutes, then turn left at the traffic lights. Walk past the supermarket. The library is on your right, next to the park."

**Useful landmarks:**
🚦 traffic lights (світлофор)
🚏 bus stop (зупинка)
🏦 bank (банк)
⛪ church (церква)
🏛️ bridge (міст)
🚉 station (станція)
🅿️ parking (парковка)

**Imperatives for directions:**
All directions use **imperative** (command form):
- Turn left (NOT "You turn left")
- Go straight (NOT "You go straight")
- Take the bus (NOT "You take the bus")

**Polite responses:**
- "Thank you very much!"
- "That's very helpful!"
- "I appreciate it!"`,
    vocab: ['left', 'right', 'straight', 'turn', 'near', 'next to', 'opposite', 'between', 'direction', 'corner']
  },

  // ===== TEST 4 (після уроків 16-20) =====
  {
    topic: 'Review Test 4: Advanced Basics',
    grammarKey: 'A1_TEST4',
    grammarExplanation: `**🎯 Progress Check: Lessons 16-20**

This review covers:
- ✅ Shopping and money
- ✅ Present Continuous
- ✅ Can/Can't (abilities)
- ✅ Going to (future plans)
- ✅ Directions and prepositions

**Almost done with A1! One more test to go! 🎉**`,
    vocab: [],
    isTest: true
  },

  // ===== FINAL TEST =====
  {
    topic: 'A1 Final Test: Complete Review',
    grammarKey: 'A1_FINAL',
    grammarExplanation: `**🏆 A1 FINAL TEST - Complete Level Review**

Congratulations on reaching the final test! 🎉

This comprehensive test covers EVERYTHING from A1:

📌 **Grammar:**
- Verb "to be"
- Possessive adjectives
- Present Simple
- Present Continuous
- Can/Can't
- Going to future
- There is/are
- Prepositions

📌 **Vocabulary:**
- Family, numbers, time
- Daily routines, hobbies
- Food, clothes, weather
- House, school, animals
- Shopping, directions

📌 **Format:**
20 random questions from ALL topics

**Good luck! You've got this! 💪**

After completing this test, you'll be ready for A2!`,
    vocab: [],
    isFinalTest: true
  }
]
