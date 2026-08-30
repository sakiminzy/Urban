import { useEffect, useMemo, useState } from 'react'
import { AppContext } from './appContextStore'
import { translations } from '../i18n/translations'

function getInitialDarkMode() {
  const savedPreference = localStorage.getItem('urbanHarvestDarkMode')

  if (savedPreference !== null) {
    return savedPreference === 'true'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialLanguage() {
  return localStorage.getItem('urbanHarvestLanguage') || 'en'
}

function getInitialRole() {
  return localStorage.getItem('urbanHarvestRole') || 'member'
}

export function AppProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [role, setRole] = useState(getInitialRole)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('urbanHarvestDarkMode', String(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem('urbanHarvestLanguage', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('urbanHarvestRole', role)
  }, [role])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const t = (key) => {
    return translations[language]?.[key] ?? translations.en[key] ?? key
  }

  const value = useMemo(
    () => ({
      selectedCategory,
      setSelectedCategory,
      searchTerm,
      setSearchTerm,
      isDarkMode,
      setIsDarkMode,
      toggleDarkMode: () => setIsDarkMode((current) => !current),
      language,
      setLanguage,
      role,
      setRole,
      isAdmin: role === 'admin',
      isOnline,
      t,
    }),
    [isDarkMode, isOnline, language, role, searchTerm, selectedCategory],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
