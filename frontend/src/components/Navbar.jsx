import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

function Navbar() {
  const { isDarkMode, toggleDarkMode, role, setRole, isAdmin } = useAppContext()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Events', path: '/events' },
    { label: 'Workshops', path: '/workshops' },
    { label: 'Booking', path: '/booking' },
    { label: 'Bookings', path: '/bookings' },
    { label: 'Subscribe', path: '/subscribe' },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : []),
  ]

  const linkClass = ({ isActive }) =>
    `rounded-full px-3.5 py-2 text-sm font-semibold transition duration-200 ${
      isActive
        ? 'bg-harvestGreen text-white shadow-md shadow-emerald-900/15'
        : 'text-slate-700 hover:bg-harvestGreen-50 hover:text-harvestGreen dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-300'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/85 shadow-sm shadow-emerald-950/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-harvestGreen to-emerald-700 text-lg font-black text-white shadow-lg shadow-emerald-900/20">
            UH
          </span>
          <span>
            <span className="block text-lg font-black leading-tight text-slate-950 dark:text-slate-50">Urban Harvest</span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-harvestGreen dark:text-emerald-300">Hub</span>
          </span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-harvestGreen hover:text-harvestGreen dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:text-emerald-300"
            onClick={toggleDarkMode}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="role-select">Role</label>
          <select
            id="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="member">Community Member</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
