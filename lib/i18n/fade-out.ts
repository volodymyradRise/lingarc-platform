// lib/i18n/fade-out.ts
import { CEFRLevel, FadeOutRule, SupportedLanguage } from './types';

export const FADE_OUT_RULES: Record<CEFRLevel, FadeOutRule> = {
  A1: {
    level: 'A1',
    explanationLanguage: 'native',
    showFullExplanations: true,
    vocabularyHintsAllowed: true,
    uiLanguage: 'native'
  },
  A2: {
    level: 'A2',
    explanationLanguage: 'native',
    showFullExplanations: true,
    vocabularyHintsAllowed: true,
    uiLanguage: 'native'
  },
  B1: {
    level: 'B1',
    explanationLanguage: 'mixed',
    showFullExplanations: true,
    vocabularyHintsAllowed: true,
    uiLanguage: 'native'
  },
  B2: {
    level: 'B2',
    explanationLanguage: 'english',
    showFullExplanations: false,
    vocabularyHintsAllowed: false,
    uiLanguage: 'english'
  },
  C1: {
    level: 'C1',
    explanationLanguage: 'english',
    showFullExplanations: false,
    vocabularyHintsAllowed: false,
    uiLanguage: 'english'
  }
};

export function getEffectiveLanguageForUI(
  userLanguage: SupportedLanguage,
  userLevel: CEFRLevel,
  immersionMode: boolean
): SupportedLanguage {
  if (immersionMode) return 'en';
  
  const rule = FADE_OUT_RULES[userLevel];
  if (rule.uiLanguage === 'english') return 'en';
  
  return userLanguage;
}

export function getEffectiveLanguageForExplanation(
  userLanguage: SupportedLanguage,
  userLevel: CEFRLevel
): SupportedLanguage | 'mixed' {
  const rule = FADE_OUT_RULES[userLevel];
  
  if (rule.explanationLanguage === 'english') return 'en';
  if (rule.explanationLanguage === 'mixed') return 'mixed';
  
  return userLanguage;
}

export function shouldShowVocabularyHints(userLevel: CEFRLevel): boolean {
  return FADE_OUT_RULES[userLevel].vocabularyHintsAllowed;
}

export function shouldShowFullExplanations(userLevel: CEFRLevel): boolean {
  return FADE_OUT_RULES[userLevel].showFullExplanations;
}

export function getMixedLanguageForExplanation(
  userLanguage: SupportedLanguage,
  index: number
): SupportedLanguage {
  return index % 2 === 0 ? userLanguage : 'en';
}
