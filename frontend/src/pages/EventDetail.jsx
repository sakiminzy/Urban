import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail'
import ReviewSection from '../components/ReviewSection'
import { events as fallbackEvents } from '../data/items'
import { getEventById } from '../services/api'

function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadEvent() {
      try {
        setIsLoading(true)
        setError('')
        const apiEvent = await getEventById(id)

        if (isMounted) {
          setEvent(apiEvent)
        }
      } catch {
        const fallbackEvent = fallbackEvents.find((item) => item.id === id)

        if (isMounted) {
          setEvent(fallbackEvent || null)
          setError(fallbackEvent ? 'Backend unavailable. Showing local data for now.' : 'Event not found.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEvent()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <section className="page-stack">
        <p className="app-panel text-slate-600" role="status">Loading event...</p>
      </section>
    )
  }

  if (!event) {
    return (
      <section className="page-stack">
        <h1 className="page-title">Event not found</h1>
        <Link className="btn-secondary w-fit" to="/events">Back to events</Link>
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
      <ItemDetail item={event} backPath="/events" backLabel="Back to events" />
      <ReviewSection itemType="event" itemId={id} itemTitle={event.title} />
    </section>
  )
}

export default EventDetail
