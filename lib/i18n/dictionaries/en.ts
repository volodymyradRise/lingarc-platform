// lib/i18n/dictionaries/en.ts
export const en = {
  nav: {
    home: "Home",
    myJourney: "My Journey",
    upgrade: "Upgrade",
    login: "Log in",
    startFree: "Start Free",
    changeLanguage: "Change language"
  },
  landing: {
    trusted: "Trusted by 40,000+ learners worldwide",
    heroTitle: "English, but actually fun.",
    heroSubtitle: "Go from A1 to C1 with bite-sized lessons, real-world scenarios, and a learning engine that adapts to you.",
    takeTest: "Take Placement Test — Free",
    browseCurriculum: "Browse Curriculum",
    noCard: "No credit card. No nonsense. Just English.",
    featuresTitle: "Every lesson is an experience",
    featuresSubtitle: "Forget textbooks. Learn the way your brain actually works."
  },
  placement: {
    title: "Placement Test",
    subtitle: "Answer honestly — this helps us personalise your experience.",
    question: "Question",
    of: "of",
    yourLevel: "Your level is",
    great: "Great! We'll start you at {level} and adapt as you grow. You can always revisit other levels.",
    namePlaceholder: "Your name (optional)",
    startLearning: "Start Learning at {level}"
  },
  dashboard: {
    title: "Your Journey",
    subtitle: "Keep going — every lesson counts.",
    streak: "day streak",
    xpTotal: "XP total",
    lessonsDone: "lessons done",
    unit: "Unit",
    lessons: "lessons",
    xp: "XP",
    exercises: "exercises",
    done: "Done",
    start: "Start",
    unlock: "Unlock",
    upgradeTitle: "Unlock Full Access",
    upgradeSubtitle: "Get all levels A1–C1, unlimited lessons, AI feedback, streaks & certificates.",
    upgradeButton: "Upgrade for $5/month"
  },
  lesson: {
    back: "Back",
    context: "Context",
    youHave: "You have",
    exercisesAhead: "exercises ahead. Take your time!",
    startExercises: "Start Exercises",
    multipleChoice: "Multiple Choice",
    fillBlank: "Fill in the Blank",
    sentenceBuilder: "Sentence Builder",
    wordMatch: "Word Match",
    correct: "Correct!",
    incorrect: "Not quite",
    next: "Next",
    finish: "Finish",
    perfect: "Perfect!",
    lessonComplete: "Lesson Complete!",
    correctAnswers: "correct",
    flawless: "Flawless work!",
    keepPracticing: "Keep practicing!",
    xpEarned: "XP earned",
    accuracy: "Accuracy",
    streakBonus: "Streak +1",
    continueJourney: "Continue Journey",
    showVocab: "Show translations",
    hideVocab: "Hide translations",
    vocabularyHelp: "Vocabulary help"
  },
  instructions: {
    multipleChoice: "Choose the correct answer:",
    fillBlank: "Complete the sentence by choosing the correct word:",
    sentenceBuilder: "Arrange the words to form a correct sentence:",
    wordMatch: "Match each word with its meaning:",
    tapWords: "Tap words below to build your sentence..."
  },
  pricing: {
    badge: "Simple pricing",
    title: "One plan. Everything included.",
    subtitle: "No tiers, no upsells. Just full access to every lesson.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 40%",
    free: "Free",
    forever: "Forever free",
    continueFree: "Continue Free",
    pro: "LingArc Pro",
    mostPopular: "Most Popular",
    perMonth: "/mo",
    billedMonthly: "Billed monthly",
    billedYearly: "Billed $36/year · Save $24",
    startTrial: "Start 7-Day Free Trial",
    noCardRequired: "No credit card required · Cancel anytime"
  },
  login: {
    welcomeBack: "Welcome back",
    createAccount: "Create your account",
    signInSubtitle: "Sign in to continue your journey",
    startLearning: "Start learning English today",
    yourName: "Your name",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    createAccountButton: "Create Account",
    newHere: "New here? ",
    alreadyHave: "Already have an account? "
  },
  levels: {
    A1: { name: "Beginner", desc: "First words, greetings, simple sentences" },
    A2: { name: "Elementary", desc: "Simple conversations, everyday topics" },
    B1: { name: "Intermediate", desc: "Express opinions, handle everyday situations" },
    B2: { name: "Upper-Intermediate", desc: "Complex topics, clear detailed text" },
    C1: { name: "Advanced", desc: "Nuance, idioms, academic & professional mastery" }
  },
  settings: {
    language: "Interface Language",
    explanations: "Show grammar explanations",
    immersion: "Immersion Mode",
    immersionDesc: "Force UI to English for maximum practice"
  },
  errors: {
    generic: "Something went wrong. Please try again.",
    network: "Network error. Please check your connection.",
    unauthorized: "Please log in to continue.",
    notFound: "Page not found."
  }
} as const;
