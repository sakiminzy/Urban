import BookingForm from '../components/BookingForm'

function Booking() {
  return (
    <section className="page-stack" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Reservations</p>
        <h1 id="booking-heading" className="mt-2 page-title">Book an event or workshop</h1>
        <p className="page-copy mx-auto mt-3">
          Reserve your spot for an upcoming community event or hands-on workshop.
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <BookingForm />
      </div>
    </section>
  )
}

export default Booking
