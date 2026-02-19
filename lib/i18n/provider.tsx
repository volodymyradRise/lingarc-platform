// lib/i18n/provider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { SupportedLanguage, I18nContextValue, CEFRLevel } from './types';
import { dictionaries } from './dictionaries';
import { getEffectiveLanguageForUI } from './fade-out';

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ 
  children, 
  initialLanguage = 'en' 
}: { 
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}) {
  const [language, setLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [showExplanations, setShowExplanations] = useState(true);
  const [immersionMode, setImmersionMode] = useState(false);
  const [userLevel, setUserLevel] = useState<CEFRLevel>('A1');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    try {
      const savedLang = localStorage.getItem('lingarc_language');
      if (savedLang && (savedLang === 'en' || savedLang === 'uk' || savedLang === 'ru' || savedLang === 'es')) {
        setLanguage(savedLang);
      }
      
      const savedExplanations = localStorage.getItem('lingarc_show_explanations');
      if (savedExplanations !== null) {
        setShowExplanations(JSON.parse(savedExplanations));
      }
      
      const savedImmersion = localStorage.getItem('lingarc_immersion_mode');
      if (savedImmersion !== null) {
        setImmersionMode(JSON.parse(savedImmersion));
      }
      
      const savedLevel = localStorage.getItem('lingarc_user_level');
      if (savedLevel && (savedLevel === 'A1' || savedLevel === 'A2' || savedLevel === 'B1' || savedLevel === 'B2' || savedLevel === 'C1')) {
        setUserLevel(savedLevel);
      }
    } catch (error) {
      console.error('[i18n] Failed to load preferences:', error);
    }
  }, []);

  const changeLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguage(newLang);
    
    if (isClient) {
      try {
        localStorage.setItem('lingarc_language', newLang);
        
        fetch('/api/user/preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: newLang })
        }).catch(err => console.error('[i18n] Failed to sync language:', err));
      } catch (error) {
        console.error('[i18n] Failed to save language:', error);
      }
    }
  }, [isClient]);

  const updateShowExplanations = useCallback((show: boolean) => {
    setShowExplanations(show);
    
    if (isClient) {
      try {
        localStorage.setItem('lingarc_show_explanations', JSON.stringify(show));
        
        fetch('/api/user/preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ showExplanations: show })
        }).catch(err => console.error('[i18n] Failed to sync explanations:', err));
      } catch (error) {
        console.error('[i18n] Failed to save explanations preference:', error);
      }
    }
  }, [isClient]);

  const updateImmersionMode = useCallback((enabled: boolean) => {
    setImmersionMode(enabled);
    
    if (isClient) {
      try {
        localStorage.setItem('lingarc_immersion_mode', JSON.stringify(enabled));
        
        fetch('/api/user/preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ immersionMode: enabled })
        }).catch(err => console.error('[i18n] Failed to sync immersion mode:', err));
      } catch (error) {
        console.error('[i18n] Failed to save immersion mode:', error);
      }
    }
  }, [isClient]);

  const updateUserLevel = useCallback((level: CEFRLevel) => {
    setUserLevel(level);
    
    if (isClient) {
      try {
        localStorage.setItem('lingarc_user_level', level);
        
        fetch('/api/user/preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userLevel: level })
        }).catch(err => console.error('[i18n] Failed to sync user level:', err));
      } catch (error) {
        console.error('[i18n] Failed to save user level:', error);
      }
    }
  }, [isClient]);

  const t = useCallback((key: string, replacements: Record<string, string | number> = {}) => {
    const effectiveLang = getEffectiveLanguageForUI(language, userLevel, immersionMode);
    const keys = key.split('.');
    let value: any = dictionaries[effectiveLang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (value === undefined) {
      value = dictionaries.en;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      
      if (value === undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Missing translation key: "${key}" for language: "${effectiveLang}"`);
        }
        return key;
      }
    }
    
    if (typeof value === 'string') {
      let result = value;
      Object.keys(replacements).forEach(replaceKey => {
        result = result.replace(new RegExp(`\\{${replaceKey}\\}`, 'g'), String(replacements[replaceKey]));
      });
      return result;
    }
    
    return value;
  }, [language, userLevel, immersionMode]);

  const contextValue = useMemo<I18nContextValue>(() => ({
    language,
    changeLanguage,
    t,
    availableLanguages: ['en', 'uk', 'ru', 'es'] as const,
    showExplanations,
    setShowExplanations: updateShowExplanations,
    immersionMode,
    setImmersionMode: updateImmersionMode,
    userLevel,
    setUserLevel: updateUserLevel
  }), [language, changeLanguage, t, showExplanations, updateShowExplanations, immersionMode, updateImmersionMode, userLevel, updateUserLevel]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
