// lib/i18n/dictionaries/es.ts
export const es = {
  nav: {
    home: "Inicio",
    myJourney: "Mi viaje",
    upgrade: "Actualizar",
    login: "Iniciar sesión",
    startFree: "Empezar gratis",
    changeLanguage: "Cambiar idioma"
  },
  landing: {
    trusted: "Más de 40,000 usuarios en todo el mundo confían en nosotros",
    heroTitle: "Inglés, pero realmente divertido.",
    heroSubtitle: "Ve desde A1 hasta C1 con lecciones breves, escenarios del mundo real y un motor de aprendizaje que se adapta a ti.",
    takeTest: "Hacer test de nivel — gratis",
    browseCurriculum: "Ver programa",
    noCard: "Sin tarjeta. Sin complicaciones. Solo inglés.",
    featuresTitle: "Cada lección es una experiencia",
    featuresSubtitle: "Olvídate de los libros de texto. Aprende como funciona tu cerebro."
  },
  placement: {
    title: "Test de nivel",
    subtitle: "Responde con honestidad — esto nos ayuda a personalizar tu experiencia.",
    question: "Pregunta",
    of: "de",
    yourLevel: "Tu nivel es",
    great: "¡Genial! Empezaremos en el nivel {level} y nos adaptaremos a medida que crezcas. Siempre puedes revisar otros niveles.",
    namePlaceholder: "Tu nombre (opcional)",
    startLearning: "Empezar a aprender en {level}"
  },
  dashboard: {
    title: "Tu viaje",
    subtitle: "Sigue adelante — cada lección cuenta.",
    streak: "días seguidos",
    xpTotal: "XP total",
    lessonsDone: "lecciones completadas",
    unit: "Unidad",
    lessons: "lecciones",
    xp: "XP",
    exercises: "ejercicios",
    done: "Listo",
    start: "Empezar",
    unlock: "Desbloquear",
    upgradeTitle: "Desbloquea acceso completo",
    upgradeSubtitle: "Obtén todos los niveles A1–C1, lecciones ilimitadas, retroalimentación AI, rachas y certificados.",
    upgradeButton: "Actualizar por $5/mes"
  },
  lesson: {
    back: "Atrás",
    context: "Contexto",
    youHave: "Tienes por delante",
    exercisesAhead: "ejercicios. ¡Tómate tu tiempo!",
    startExercises: "Comenzar ejercicios",
    multipleChoice: "Opción múltiple",
    fillBlank: "Rellenar espacios",
    sentenceBuilder: "Constructor de frases",
    wordMatch: "Emparejar palabras",
    correct: "¡Correcto!",
    incorrect: "No del todo",
    next: "Siguiente",
    finish: "Terminar",
    perfect: "¡Perfecto!",
    lessonComplete: "¡Lección completada!",
    correctAnswers: "correctas",
    flawless: "¡Trabajo impecable!",
    keepPracticing: "¡Sigue practicando!",
    xpEarned: "XP ganados",
    accuracy: "Precisión",
    streakBonus: "Racha +1",
    continueJourney: "Continuar viaje",
    showVocab: "Mostrar traducciones",
    hideVocab: "Ocultar traducciones",
    vocabularyHelp: "Ayuda con vocabulario"
  },
  instructions: {
    multipleChoice: "Elige la respuesta correcta:",
    fillBlank: "Completa la frase eligiendo la palabra correcta:",
    sentenceBuilder: "Ordena las palabras para formar una frase correcta:",
    wordMatch: "Empareja cada palabra con su significado:",
    tapWords: "Toca las palabras de abajo para construir tu frase..."
  },
  pricing: {
    badge: "Precio simple",
    title: "Un plan. Todo incluido.",
    subtitle: "Sin niveles, sin ventas adicionales. Solo acceso completo a cada lección.",
    monthly: "Mensual",
    yearly: "Anual",
    save: "Ahorra 40%",
    free: "Gratis",
    forever: "Gratis para siempre",
    continueFree: "Continuar gratis",
    pro: "LingArc Pro",
    mostPopular: "Más popular",
    perMonth: "/mes",
    billedMonthly: "Facturado mensualmente",
    billedYearly: "Facturado $36/año · Ahorra $24",
    startTrial: "Comenzar prueba gratuita de 7 días",
    noCardRequired: "Sin tarjeta requerida · Cancela cuando quieras"
  },
  login: {
    welcomeBack: "Bienvenido de nuevo",
    createAccount: "Crea tu cuenta",
    signInSubtitle: "Inicia sesión para continuar tu viaje",
    startLearning: "Comienza a aprender inglés hoy",
    yourName: "Tu nombre",
    email: "Email",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    createAccountButton: "Crear cuenta",
    newHere: "¿Nuevo aquí? ",
    alreadyHave: "¿Ya tienes cuenta? "
  },
  levels: {
    A1: { name: "Principiante", desc: "Primeras palabras, saludos, frases simples" },
    A2: { name: "Elemental", desc: "Conversaciones simples, temas cotidianos" },
    B1: { name: "Intermedio", desc: "Expresar opiniones, manejar situaciones cotidianas" },
    B2: { name: "Intermedio alto", desc: "Temas complejos, texto detallado y claro" },
    C1: { name: "Avanzado", desc: "Matices, modismos, dominio académico y profesional" }
  },
  settings: {
    language: "Idioma de interfaz",
    explanations: "Mostrar explicaciones gramaticales",
    immersion: "Modo inmersión",
    immersionDesc: "Forzar inglés en la interfaz para máxima práctica"
  },
  errors: {
    generic: "Algo salió mal. Inténtalo de nuevo.",
    network: "Error de red. Verifica tu conexión.",
    unauthorized: "Por favor, inicia sesión para continuar.",
    notFound: "Página no encontrada."
  }
} as const;
