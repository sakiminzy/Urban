import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { getBookings } from '../services/api'

function Bookings() {
  const { bookings: contextBookings } = useAppContext()
  const [bookings, setBookings] = useState(contextBookings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadBookings() {
      try {
        setIsLoading(true)
        setError('')
        const apiBookings = await getBookings()

        if (isMounted) {
          setBookings(apiBookings)
        }
      } catch {
        if (isMounted) {
          setBookings(contextBookings)
          setError('Backend unavailable. Showing bookings stored in this frontend session.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBookings()

    return () => {
      isMounted = false
    }
  }, [contextBookings])

  return (
    <section className="page-stack" aria-labelledby="bookings-heading">
      <div>
        <p className="section-kicker">Context summary</p>
        <h1 id="bookings-heading" className="mt-2 page-title">Bookings</h1>
        <p className="page-copy mt-3">
          Frontend-only summary of booking requests stored in React Context.
        </p>
      </div>

      {isLoading && (
        <p className="app-panel text-[color:var(--muted)]" role="status">
          Loading bookings...
        </p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
          {error}
        </p>
      )}

      {!isLoading && bookings.length === 0 ? (
        <div className="app-panel-soft text-center">
          <p className="mx-auto max-w-md text-[color:var(--muted)]">
            No bookings have been submitted yet. Create one to see the React Context summary update instantly.
          </p>
          <Link
            to="/booking"
            className="btn-primary mt-4"
          >
            Create a booking
          </Link>
        </div>
      ) : !isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="app-panel"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[color:var(--text)]">
                    {booking.itemTitle}
                  </h2>
                <p className="mt-1 text-sm capitalize text-[color:var(--accent)]">
                    {booking.itemType || 'booking'} on <time dateTime={booking.itemDate}>{booking.itemDate || 'pending date'}</time>
                  </p>
                </div>
                <p className="badge">
                  {booking.participants} participant{booking.participants === 1 ? '' : 's'}
                </p>
              </div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-[color:var(--muted)]">Name</dt>
                  <dd className="mt-1 text-[color:var(--text)]">{booking.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[color:var(--muted)]">Email</dt>
                  <dd className="mt-1 text-[color:var(--text)]">{booking.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[color:var(--muted)]">Requested time</dt>
                  <dd className="mt-1 text-[color:var(--text)]">
                    <time dateTime={booking.bookingDateTime}>{booking.bookingDateTime}</time>
                  </dd>
                </div>
              </dl>
              {booking.notes && (
                <p className="mt-4 text-[color:var(--muted)]">{booking.notes}</p>
              )}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Bookings
