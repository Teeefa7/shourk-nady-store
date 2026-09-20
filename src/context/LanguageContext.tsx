'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Direction } from '@/types';
import arTranslations from '@/i18n/ar.json';
import enTranslations from '@/i18n/en.json';

interface LanguageContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (keyPath: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ar'); // Default RTL Arabic for UAE market

  useEffect(() => {
    const savedLocale = localStorage.getItem('shourk_nady_locale') as Locale;
    if (savedLocale && (savedLocale === 'ar' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('shourk_nady_locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  const toggleLocale = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  const direction: Direction = locale === 'ar' ? 'rtl' : 'ltr';

  const translations = locale === 'ar' ? arTranslations : enTranslations;

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let result: any = translations;
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return fallback || keyPath;
      }
    }

    return typeof result === 'string' ? result : fallback || keyPath;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  return (
    <LanguageContext.Provider value={{ locale, direction, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
