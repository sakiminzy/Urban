import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Events from './pages/Events'
import Workshops from './pages/Workshops'
import Booking from './pages/Booking'
import ProductDetail from './pages/ProductDetail'
import EventDetail from './pages/EventDetail'
import WorkshopDetail from './pages/WorkshopDetail'
import Subscribe from './pages/Subscribe'
import Admin from './pages/Admin'
import Bookings from './pages/Bookings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-transparent transition-colors">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:id" element={<WorkshopDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="mt-10 border-t border-emerald-100 bg-white/85 py-10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-slate-600 dark:text-slate-400 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-8">
            <section aria-label="Brand description">
              <p className="text-lg font-black text-harvestGreen dark:text-emerald-300">Urban Harvest Hub</p>
              <p className="mt-3 max-w-md leading-6">
                A premium sustainability marketplace concept connecting urban growers,
                local events, practical workshops, and greener daily choices.
              </p>
            </section>
            <nav aria-label="Footer quick links">
              <h2 className="font-bold text-slate-900 dark:text-slate-100">Quick links</h2>
              <ul className="mt-3 space-y-2">
                <li><Link className="hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen" to="/products">Products</Link></li>
                <li><Link className="hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen" to="/events">Events</Link></li>
                <li><Link className="hover:text-harvestGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen" to="/workshops">Workshops</Link></li>
              </ul>
            </nav>
            <section aria-label="Contact and support">
              <h2 className="font-bold text-slate-900 dark:text-slate-100">Support</h2>
              <p className="mt-3 leading-6">Need help with a booking or listing? Contact the Urban Harvest Hub support desk.</p>
              <p className="mt-2 font-semibold text-earthBrown dark:text-amber-300">support@urbanharvesthub.test</p>
            </section>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
