import { useTranslation } from 'react-i18next'

export const useInternationalization = () => {
  const { i18n, t } = useTranslation()

  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng)
  }

  function getTranslation(key: string) {
    return t(key)
  }

  function getCurrentLanguage() {
    return i18n.language
  }

  return {
    changeLanguage,
    getTranslation,
    getCurrentLanguage,
  }
}
