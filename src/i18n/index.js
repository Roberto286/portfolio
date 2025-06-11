import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  it: { translation: it },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'it', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
