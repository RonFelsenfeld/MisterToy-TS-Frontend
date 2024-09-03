import { useTranslation } from 'react-i18next'
import { utilService } from '../services/util.service'

export const useInternationalization = () => {
  const { i18n, t } = useTranslation()

  function setLanguage(lng: string) {
    i18n.changeLanguage(lng)
    _saveLanguagePreferences(lng)
  }

  function getTranslation(key: string) {
    return t(key)
  }

  function getCurrentLanguage() {
    return i18n.language
  }

  function _saveLanguagePreferences(lng: string) {
    utilService.saveToStorage('languagePreference', lng)
  }

  return {
    setLanguage,
    getTranslation,
    getCurrentLanguage,
  }
}
