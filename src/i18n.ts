import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './assets/locales/en/translation.json';
import fr from './assets/locales/fr/translation.json';
import tel from './assets/locales/tel/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    tel: { translation: tel },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
