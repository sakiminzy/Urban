import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-300">This placeholder route does not exist.</p>
      <Link className="font-medium text-emerald-700 hover:text-emerald-900" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFound
