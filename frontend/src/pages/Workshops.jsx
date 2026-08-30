import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'
import { workshops as fallbackWorkshops } from '../data/items'
import { getWorkshops } from '../services/api'
import { mergeItemsById } from '../utils/mergeItems'

function Workshops() {
  const [workshops, setWorkshops] = useState(fallbackWorkshops)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    let isMounted = true

    async function loadWorkshops() {
      try {
        setIsLoading(true)
        setError('')
        const apiWorkshops = await getWorkshops()

        if (isMounted) {
          setWorkshops(mergeItemsById(apiWorkshops, fallbackWorkshops))
        }
      } catch {
        if (isMounted) {
          setWorkshops(fallbackWorkshops)
          setError('Backend unavailable. Showing local data for now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWorkshops()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(
    () => [...new Set(workshops.map((workshop) => workshop.category))],
    [workshops],
  )

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      workshop.title.toLowerCase().includes(query) ||
      workshop.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  return (
    <section className="page-stack" aria-labelledby="workshops-heading">
      <div>
        <p className="section-kicker">Skill building</p>
        <h1 id="workshops-heading" className="mt-2 page-title">Workshops</h1>
        <p className="page-copy mt-3">Practical sustainability workshops led by local growers.</p>
      </div>

      <div className="app-panel flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search workshops" />
        <CategoryFilter categories={categories} value={selectedCategory} onChange={setSelectedCategory} label="Workshop category" />
      </div>

      {isLoading && (
        <p className="app-panel text-slate-600" role="status">Loading workshops...</p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="status">
          {error}
        </p>
      )}

      {!isLoading && filteredWorkshops.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredWorkshops.map((workshop) => (
            <ItemCard key={workshop.id} item={workshop} />
          ))}
        </div>
      ) : !isLoading ? (
        <p className="app-panel text-slate-600" role="status">No workshops match your search.</p>
      ) : null}
    </section>
  )
}

export default Workshops
