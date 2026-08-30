import { useState } from 'react'
import { useAppContext } from '../context/useAppContext'
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
  const { addBooking, t, isOnline } = useAppContext()
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
      nextErrors.name = t('bookingName') + ' is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = t('bookingEmail') + ' is required.'
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = t('bookingEmail') + ' must be valid.'
    }

    if (!formData.itemId) {
      nextErrors.itemId = t('bookingItem') + ' is required.'
    }

    if (!formData.bookingDateTime) {
      nextErrors.bookingDateTime = t('bookingDateTime') + ' is required.'
    } else if (selectedItem?.date && formData.bookingDateTime.slice(0, 10) !== selectedItem.date) {
      nextErrors.bookingDateTime = `${t('bookingItem')} is scheduled for ${selectedItem.date}.`
    }

    if (!formData.participants || Number(formData.participants) < 1) {
      nextErrors.participants = t('bookingParticipants') + ' must be at least 1.'
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
        itemDate: selectedItem?.date || '',
        bookingDateTime: formData.bookingDateTime,
      }

      try {
        setIsSubmitting(true)
        setApiError('')
        const savedBooking = await createBooking(bookingPayload)

        addBooking(savedBooking)
        setSuccessMessage(`${t('bookingSubmit')} ${selectedItem?.title || ''}`)
        setFormData(initialForm)
      } catch {
        addBooking(bookingPayload)
        setApiError(t('bookingNoBackend'))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form className="app-panel space-y-6" onSubmit={handleSubmit} noValidate>
      {!isOnline && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
          {t('offlineStatus')}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="form-label">
            {t('bookingName')}
          </label>
          <input
            id="booking-name"
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="form-field"
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
          />
          {errors.name && <p id="booking-name-error" className="error-text">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="booking-email" className="form-label">
            {t('bookingEmail')}
          </label>
          <input
            id="booking-email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="form-field"
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <p id="booking-email-error" className="error-text">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="booking-item" className="form-label">
          {t('bookingItem')}
        </label>
        <select
          id="booking-item"
          value={formData.itemId}
          onChange={(event) => handleItemChange(event.target.value)}
          className="form-field"
          aria-describedby={errors.itemId ? 'booking-item-error' : 'booking-item-help'}
          aria-invalid={Boolean(errors.itemId)}
        >
          <option value="">{t('bookingItem')}</option>
          {bookableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} - {item.date}
            </option>
          ))}
        </select>
        <p id="booking-item-help" className="mt-2 text-sm text-[color:var(--muted)]">
          {t('bookingBackendStatus')}
        </p>
        {errors.itemId && <p id="booking-item-error" className="error-text">{errors.itemId}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date-time" className="form-label">
            {t('bookingDateTime')}
          </label>
          <input
            id="booking-date-time"
            type="datetime-local"
            value={formData.bookingDateTime}
            onChange={(event) => updateField('bookingDateTime', event.target.value)}
            className="form-field"
            aria-describedby={errors.bookingDateTime ? 'booking-date-time-error' : 'booking-date-time-help'}
            aria-invalid={Boolean(errors.bookingDateTime)}
            min={selectedItem?.date ? `${selectedItem.date}T00:00` : undefined}
            max={selectedItem?.date ? `${selectedItem.date}T23:59` : undefined}
            disabled={!selectedItem}
          />
          <p id="booking-date-time-help" className="mt-2 text-sm text-[color:var(--muted)]">
            {selectedItem?.date
              ? `${selectedItem.title} is scheduled for ${selectedItem.date}.`
              : t('bookingItem') + ' ' + t('bookingDateTime')}
          </p>
          {errors.bookingDateTime && (
            <p id="booking-date-time-error" className="error-text">
              {errors.bookingDateTime}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-participants" className="form-label">
            {t('bookingParticipants')}
          </label>
          <input
            id="booking-participants"
            type="number"
            min="1"
            value={formData.participants}
            onChange={(event) => updateField('participants', event.target.value)}
            className="form-field"
            aria-describedby={errors.participants ? 'booking-participants-error' : undefined}
            aria-invalid={Boolean(errors.participants)}
          />
          {errors.participants && (
            <p id="booking-participants-error" className="error-text">
              {errors.participants}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="form-label">
          {t('bookingNotes')}
        </label>
        <textarea
          id="booking-notes"
          rows="4"
          value={formData.notes}
          onChange={(event) => updateField('notes', event.target.value)}
          className="form-field"
          placeholder="Optional access needs, questions, or preferences"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--muted)]">{t('bookingBackendStatus')}</p>
        <button type="submit" className="btn-primary focus-ring w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? t('bookingSaving') : t('bookingSubmit')}
        </button>
      </div>

      {apiError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200" role="alert">
          {apiError}
        </p>
      )}

      {successMessage && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200" role="status">
          {successMessage}
        </p>
      )}
    </form>
  )
}

export default BookingForm
