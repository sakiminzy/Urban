import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail'
import ReviewSection from '../components/ReviewSection'
import { useAppContext } from '../context/useAppContext'
import { events as fallbackEvents } from '../data/items'
import { getEventById } from '../services/api'

function EventDetail() {
  const { t } = useAppContext()
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
          setError(fallbackEvent ? t('offlineWarning') : t('eventDetailsNotFound'))
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
  }, [id, t])

  if (isLoading) {
    return (
      <section className="page-stack">
        <p className="app-panel text-slate-600 dark:text-slate-300" role="status">{t('loadingEvents')}</p>
      </section>
    )
  }

  if (!event) {
    return (
      <section className="page-stack">
        <h1 className="page-title">{t('eventDetailsNotFound')}</h1>
        <Link className="btn-secondary w-fit" to="/events">{t('backToEvents')}</Link>
      </section>
    )
  }

  return (
    <section className="page-stack">
      {error && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
          {error}
        </p>
      )}
      <ItemDetail item={event} backPath="/events" backLabel={t('backToEvents')} />
      <ReviewSection itemType="event" itemId={id} itemTitle={event.title} />
    </section>
  )
}

export default EventDetail
