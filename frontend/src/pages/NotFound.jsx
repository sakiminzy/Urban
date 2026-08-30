import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-stack text-center">
      <h1 className="text-3xl font-black text-slate-950">Page not found</h1>
      <Link to="/" className="text-harvestGreen underline">Back to home</Link>
    </section>
  )
}

export default NotFound
