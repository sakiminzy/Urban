import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-[color:var(--text)]">Page not found</h1>
      <p className="text-[color:var(--muted)]">This placeholder route does not exist.</p>
      <Link className="font-medium text-[color:var(--accent)] hover:opacity-80" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFound
