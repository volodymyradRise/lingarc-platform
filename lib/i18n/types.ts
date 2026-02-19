// lib/i18n/types.ts
export type SupportedLanguage = 'en' | 'uk' | 'ru' | 'es';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export type Translations = Record<SupportedLanguage, TranslationDictionary>;

export interface I18nContextValue {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  availableLanguages: readonly SupportedLanguage[];
  showExplanations: boolean;
  setShowExplanations: (show: boolean) => void;
  immersionMode: boolean;
  setImmersionMode: (enabled: boolean) => void;
  userLevel: CEFRLevel;
  setUserLevel: (level: CEFRLevel) => void;
}

export interface FadeOutRule {
  level: CEFRLevel;
  explanationLanguage: 'native' | 'mixed' | 'english';
  showFullExplanations: boolean;
  vocabularyHintsAllowed: boolean;
  uiLanguage: 'native' | 'english';
}

export interface UserPreferences {
  language: SupportedLanguage;
  showExplanations: boolean;
  immersionMode: boolean;
  userLevel: CEFRLevel;
}
