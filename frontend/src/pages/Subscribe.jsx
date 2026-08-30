import { useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import { createSubscription } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  preference: '',
  frequency: '',
  notes: '',
}

function Subscribe() {
  const { isOnline, t } = useAppContext()
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: false, error: '', success: '' })

    if (!formData.name.trim() || !formData.email.trim() || !formData.preference.trim() || !formData.frequency.trim()) {
      setStatus({ loading: false, error: t('subscriptionErrorInvalid'), success: '' })
      return
    }

    if (!isOnline) {
      setStatus({ loading: false, error: t('subscriptionErrorOffline'), success: '' })
      return
    }

    try {
      setStatus((current) => ({ ...current, loading: true }))
      await createSubscription({
        name: formData.name.trim(),
        email: formData.email.trim(),
        preference: formData.preference.trim(),
        frequency: formData.frequency.trim(),
        notes: formData.notes.trim(),
      })

      setFormData(initialForm)
      setStatus({ loading: false, error: '', success: t('subscriptionSuccess') })
    } catch (error) {
      setStatus({ loading: false, error: error.message || t('subscriptionErrorOffline'), success: '' })
    }
  }

  return (
    <section className="page-stack">
      <div className="app-panel space-y-4">
        <div>
          <h1 className="page-title">{t('subscriptionTitle')}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t('subscriptionDescription')}</p>
        </div>

        {!isOnline && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {t('subscriptionBackendStatus')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-2">
            <span className="form-label">{t('subscriptionName')}</span>
            <input className="form-field" type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label className="grid gap-2">
            <span className="form-label">{t('subscriptionEmail')}</span>
            <input className="form-field" type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label className="grid gap-2">
            <span className="form-label">{t('subscriptionPreference')}</span>
            <input className="form-field" type="text" name="preference" value={formData.preference} onChange={handleChange} placeholder="e.g. Weekly produce box" />
          </label>

          <label className="grid gap-2">
            <span className="form-label">{t('subscriptionFrequency')}</span>
            <select className="form-field" name="frequency" value={formData.frequency} onChange={handleChange}>
              <option value="">{t('subscriptionFrequency')}</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="form-label">{t('subscriptionNotes')}</span>
            <textarea className="form-field min-h-[120px] resize-none" name="notes" value={formData.notes} onChange={handleChange} />
          </label>

          {status.error && <p className="error-text" role="alert">{status.error}</p>}
          {status.success && <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300" role="status">{status.success}</p>}

          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.loading || !isOnline}>
            {status.loading ? t('subscriptionSaving') : t('subscriptionSubmit')}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Subscribe
