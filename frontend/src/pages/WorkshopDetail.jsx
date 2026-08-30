import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail'
import { workshops as fallbackWorkshops } from '../data/items'
import { getWorkshopById } from '../services/api'

function WorkshopDetail() {
  const { id } = useParams()
  const [workshop, setWorkshop] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkshop() {
      try {
        setIsLoading(true)
        setError('')
        const apiWorkshop = await getWorkshopById(id)

        if (isMounted) {
          setWorkshop(apiWorkshop)
        }
      } catch {
        const fallbackWorkshop = fallbackWorkshops.find((item) => item.id === id)

        if (isMounted) {
          setWorkshop(fallbackWorkshop || null)
          setError(fallbackWorkshop ? 'Backend unavailable. Showing local data for now.' : 'Workshop not found.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWorkshop()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <section className="page-stack">
        <p className="app-panel text-slate-600" role="status">Loading workshop...</p>
      </section>
    )
  }

  if (!workshop) {
    return (
      <section className="page-stack">
        <h1 className="page-title">Workshop not found</h1>
        <Link className="btn-secondary w-fit" to="/workshops">Back to workshops</Link>
      </section>
    )
  }

  return (
    <section className="page-stack">
      {error && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="status">
          {error}
        </p>
      )}
      <ItemDetail item={workshop} backPath="/workshops" backLabel="Back to workshops" />
    </section>
  )
}

export default WorkshopDetail
