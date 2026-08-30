import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b border-emerald-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-black text-harvestGreen">
          Urban Harvest Hub
        </Link>
        <nav className="flex gap-6 text-sm font-semibold text-slate-700">
          <Link to="/" className="hover:text-harvestGreen">Home</Link>
          <Link to="/products" className="hover:text-harvestGreen">Products</Link>
          <Link to="/events" className="hover:text-harvestGreen">Events</Link>
          <Link to="/workshops" className="hover:text-harvestGreen">Workshops</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
