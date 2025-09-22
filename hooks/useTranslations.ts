import { useAppContext } from '../contexts/AppContext';
import en from '../locales/en.ts';
import ar from '../locales/ar.ts';

const translations = { 
  en: en, 
  ar: ar 
};

export const useTranslations = () => {
  const { locale } = useAppContext();
  return translations[locale];
};