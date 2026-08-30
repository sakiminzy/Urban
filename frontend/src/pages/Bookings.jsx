import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBookings } from '../services/api'

function Bookings() {
  const [bookings, setBookings] = useState([])
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
          setBookings([])
          setError('Backend unavailable. Bookings cannot be loaded right now.')
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
  }, [])

  return (
    <section className="page-stack" aria-labelledby="bookings-heading">
      <div>
        <p className="section-kicker">Booking summary</p>
        <h1 id="bookings-heading" className="mt-2 page-title">Bookings</h1>
        <p className="page-copy mt-3">All booking requests submitted through the booking form.</p>
      </div>

      {isLoading && (
        <p className="app-panel text-slate-600 dark:text-slate-300" role="status">Loading bookings...</p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
          {error}
        </p>
      )}

      {!isLoading && bookings.length === 0 && !error ? (
        <div className="app-panel text-center">
          <p className="mx-auto max-w-md text-slate-600 dark:text-slate-300">
            No bookings have been submitted yet.
          </p>
          <Link to="/booking" className="btn-primary mt-4">Create a booking</Link>
        </div>
      ) : !isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {bookings.map((booking) => (
            <article key={booking.id} className="app-panel">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{booking.itemTitle}</h2>
                  <p className="mt-1 text-sm capitalize text-emerald-700 dark:text-emerald-300">{booking.itemType || 'booking'}</p>
                </div>
                <p className="badge">{booking.participants} participant{booking.participants === 1 ? '' : 's'}</p>
              </div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</dt>
                  <dd className="mt-1 text-slate-900 dark:text-slate-100">{booking.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</dt>
                  <dd className="mt-1 text-slate-900 dark:text-slate-100">{booking.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Requested time</dt>
                  <dd className="mt-1 text-slate-900 dark:text-slate-100">
                    <time dateTime={booking.bookingDate}>{booking.bookingDate}</time>
                  </dd>
                </div>
              </dl>
              {booking.notes && <p className="mt-4 text-slate-600 dark:text-slate-300">{booking.notes}</p>}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Bookings
