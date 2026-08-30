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
    `focus-ring text-base transition ${isActive ? 'text-[color:var(--accent)]' : 'text-[color:var(--text)] hover:text-[color:var(--accent)]'}`

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 lg:px-8">
      <NavLink to="/" className="focus-ring flex h-11 w-11 items-center justify-center" aria-label="Urban Harvest Hub home">
        <img className="h-9 w-9" src={isDarkMode ? '/images/logo_d.svg' : '/images/logo_l.svg'} alt="" />
      </NavLink>

      <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 lg:flex">
          <label className="sr-only" htmlFor="language-select">
            {t('languageLabel')}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="focus-ring rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)]"
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
            className="focus-ring rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)]"
          >
            <option value="member">{t('communityMember')}</option>
            <option value="admin">{t('administrator')}</option>
          </select>
        </div>

        <InstallPrompt />

        <button
          type="button"
          className="focus-ring hidden h-6 w-6 items-center justify-center text-[color:var(--text)] lg:flex"
          onClick={toggleDarkMode}
          aria-pressed={isDarkMode}
          aria-label={t('darkMode')}
        >
          <span className="material-symbols-outlined text-[22px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button
          type="button"
          className="focus-ring flex items-center justify-center rounded-full border border-[color:var(--border)] p-2 text-[color:var(--text)] lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label="Open primary navigation"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      </div>

      {isOpen && (
        <div
          id="primary-navigation"
          className="absolute inset-x-4 top-20 z-30 flex flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-4 text-base sm:inset-x-6 lg:hidden"
        >
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setIsOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="focus-ring rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)]"
            >
              <option value="en">EN</option>
              <option value="si">SI</option>
            </select>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="focus-ring rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)]"
            >
              <option value="member">{t('communityMember')}</option>
              <option value="admin">{t('administrator')}</option>
            </select>
            <button
              type="button"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--text)]"
              onClick={toggleDarkMode}
              aria-pressed={isDarkMode}
              aria-label={t('darkMode')}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
