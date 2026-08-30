import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import InstallPrompt from './InstallPrompt'
import { useAppContext } from '../context/useAppContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleDarkMode, t, role, setRole, language, setLanguage, isAdmin } = useAppContext()

  const navItems = [
    { label: t('home'), path: '/' },
    { label: t('products'), path: '/products' },
    { label: t('events'), path: '/events' },
    { label: t('workshops'), path: '/workshops' },
    { label: t('booking'), path: '/booking' },
    { label: t('bookings'), path: '/bookings' },
    { label: t('subscribe'), path: '/subscribe' },
    ...(isAdmin ? [{ label: t('admin'), path: '/admin' }] : []),
  ]

  const linkClass = ({ isActive }) =>
    `rounded-full px-3.5 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
      isActive
        ? 'bg-harvestGreen text-white shadow-md shadow-emerald-900/15'
        : 'text-slate-700 hover:bg-harvestGreen-50 hover:text-harvestGreen dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-300'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/85 shadow-sm shadow-emerald-950/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <NavLink to="/" className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-harvestGreen to-emerald-700 text-lg font-black text-white shadow-lg shadow-emerald-900/20">
            UH
          </span>
          <span>
            <span className="block text-lg font-black leading-tight text-slate-950 dark:text-slate-50">Urban Harvest</span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-harvestGreen dark:text-emerald-300">Hub</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2 md:hidden">
          <InstallPrompt />
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-harvestGreen hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
            onClick={toggleDarkMode}
            aria-pressed={isDarkMode}
            aria-label={t('darkMode')}
          >
            {isDarkMode ? t('lightMode') : t('darkMode')}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-harvestGreen hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label="Open primary navigation"
          >
            Menu
          </button>
        </div>

        <div id="primary-navigation" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-harvestGreen hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
            onClick={toggleDarkMode}
            aria-pressed={isDarkMode}
            aria-label={t('darkMode')}
          >
            {isDarkMode ? t('lightMode') : t('darkMode')}
          </button>
          <InstallPrompt />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <label className="sr-only" htmlFor="language-select">
            {t('languageLabel')}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
          >
            <option value="en">EN</option>
            <option value="si">SI</option>
          </select>
          <label className="sr-only" htmlFor="role-select">
            {t('roleLabel')}
          </label>
          <select
            id="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
          >
            <option value="member">{t('communityMember')}</option>
            <option value="admin">{t('administrator')}</option>
          </select>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-emerald-100 bg-white/95 px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
