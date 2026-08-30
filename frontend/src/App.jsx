import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10">
        <Navbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
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
        <footer className="mt-auto mb-10 px-4 text-base text-[color:var(--text)] sm:px-6 lg:px-8">
          2026 Urban Harvest Hub. All Rights Reserved
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
