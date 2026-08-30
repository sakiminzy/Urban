import { useState } from 'react'
import { events, workshops } from '../data/items'
import { createBooking } from '../services/api'

const bookableItems = [...events, ...workshops]

const initialForm = {
  name: '',
  email: '',
  itemId: '',
  bookingDateTime: '',
  participants: '1',
  notes: '',
}

function BookingForm() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedItem = bookableItems.find((item) => item.id === formData.itemId)

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setSuccessMessage('')
    setApiError('')
  }

  const handleItemChange = (itemId) => {
    const nextItem = bookableItems.find((item) => item.id === itemId)

    setFormData((current) => ({
      ...current,
      itemId,
      bookingDateTime: nextItem?.date ? `${nextItem.date}T10:00` : '',
    }))
    setErrors((current) => ({ ...current, itemId: '', bookingDateTime: '' }))
    setSuccessMessage('')
    setApiError('')
  }

  const validate = () => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = 'Email must be valid.'
    }

    if (!formData.itemId) {
      nextErrors.itemId = 'Please select an event or workshop.'
    }

    if (!formData.bookingDateTime) {
      nextErrors.bookingDateTime = 'Date and time is required.'
    } else if (selectedItem?.date && formData.bookingDateTime.slice(0, 10) !== selectedItem.date) {
      nextErrors.bookingDateTime = `${selectedItem.title} is scheduled for ${selectedItem.date}.`
    }

    if (!formData.participants || Number(formData.participants) < 1) {
      nextErrors.participants = 'Participants must be at least 1.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const bookingPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        participants: Number(formData.participants),
        notes: formData.notes.trim(),
        itemId: formData.itemId,
        itemTitle: selectedItem?.title || '',
        itemType: selectedItem?.type || '',
        bookingDate: formData.bookingDateTime,
      }

      try {
        setIsSubmitting(true)
        setApiError('')
        await createBooking(bookingPayload)
        setSuccessMessage(`Booking submitted for ${selectedItem?.title || ''}`)
        setFormData(initialForm)
      } catch (error) {
        setApiError(error.message || 'Could not reach the backend. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form className="app-panel space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="form-label">Full name</label>
          <input
            id="booking-name"
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="form-field"
            autoComplete="name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="booking-email" className="form-label">Email</label>
          <input
            id="booking-email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="form-field"
            autoComplete="email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="booking-item" className="form-label">Event or workshop</label>
        <select
          id="booking-item"
          value={formData.itemId}
          onChange={(event) => handleItemChange(event.target.value)}
          className="form-field"
        >
          <option value="">Select an event or workshop</option>
          {bookableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} - {item.date}
            </option>
          ))}
        </select>
        {errors.itemId && <p className="error-text">{errors.itemId}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date-time" className="form-label">Date and time</label>
          <input
            id="booking-date-time"
            type="datetime-local"
            value={formData.bookingDateTime}
            onChange={(event) => updateField('bookingDateTime', event.target.value)}
            className="form-field"
            min={selectedItem?.date ? `${selectedItem.date}T00:00` : undefined}
            max={selectedItem?.date ? `${selectedItem.date}T23:59` : undefined}
            disabled={!selectedItem}
          />
          {errors.bookingDateTime && <p className="error-text">{errors.bookingDateTime}</p>}
        </div>

        <div>
          <label htmlFor="booking-participants" className="form-label">Participants</label>
          <input
            id="booking-participants"
            type="number"
            min="1"
            value={formData.participants}
            onChange={(event) => updateField('participants', event.target.value)}
            className="form-field"
          />
          {errors.participants && <p className="error-text">{errors.participants}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="form-label">Notes</label>
        <textarea
          id="booking-notes"
          rows="4"
          value={formData.notes}
          onChange={(event) => updateField('notes', event.target.value)}
          className="form-field"
          placeholder="Optional access needs, questions, or preferences"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Submit booking'}
        </button>
      </div>

      {apiError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
          {apiError}
        </p>
      )}

      {successMessage && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900" role="status">
          {successMessage}
        </p>
      )}
    </form>
  )
}

export default BookingForm
