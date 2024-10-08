import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { utilService } from './util.service'

import enTranslations from '../translations/enTranslations.json'
import heTranslations from '../translations/heTranslations.json'

const langFromStorage = utilService.loadFromStorage<string>('languagePreference') as string

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    he: {
      translation: heTranslations,
    },
  },
  lng: langFromStorage || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export function getTranslatedLabel(label: string) {
  const formattedLabel = i18n.t(label.replace(' ', '-'))
  if (i18n.language === 'he') return formattedLabel
  return formattedLabel.charAt(0).toUpperCase() + label.slice(1)
}

export default i18n
