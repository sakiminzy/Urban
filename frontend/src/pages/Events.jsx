import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'
import { events as fallbackEvents } from '../data/items'
import { getEvents } from '../services/api'
import { mergeItemsById } from '../utils/mergeItems'

function Events() {
  const [events, setEvents] = useState(fallbackEvents)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    let isMounted = true

    async function loadEvents() {
      try {
        setIsLoading(true)
        setError('')
        const apiEvents = await getEvents()

        if (isMounted) {
          setEvents(mergeItemsById(apiEvents, fallbackEvents))
        }
      } catch {
        if (isMounted) {
          setEvents(fallbackEvents)
          setError('Backend unavailable. Showing local data for now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => [...new Set(events.map((event) => event.category))], [events])

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  return (
    <section className="page-stack" aria-labelledby="events-heading">
      <div>
        <p className="section-kicker">Community calendar</p>
        <h1 id="events-heading" className="mt-2 page-title">Events</h1>
        <p className="page-copy mt-3">Local community events, markets, and volunteer days.</p>
      </div>

      <div className="app-panel flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search events" />
        <CategoryFilter categories={categories} value={selectedCategory} onChange={setSelectedCategory} label="Event category" />
      </div>

      {isLoading && (
        <p className="app-panel text-slate-600" role="status">Loading events...</p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="status">
          {error}
        </p>
      )}

      {!isLoading && filteredEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <ItemCard key={event.id} item={event} />
          ))}
        </div>
      ) : !isLoading ? (
        <p className="app-panel text-slate-600" role="status">No events match your search.</p>
      ) : null}
    </section>
  )
}

export default Events
