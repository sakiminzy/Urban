import BookingForm from '../components/BookingForm'
import { useAppContext } from '../context/useAppContext'

function Booking() {
  const { t } = useAppContext()

  return (
    <section className="page-stack" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Reservations</p>
        <h1 id="booking-heading" className="mt-2 page-title">{t('bookingTitle')}</h1>
        <p className="page-copy mx-auto mt-3">
          {t('bookingCopy')}
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <BookingForm />
      </div>
    </section>
  )
}

export default Booking
