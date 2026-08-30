import { useState } from 'react'
import { createSubscription } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  preference: '',
  frequency: '',
  notes: '',
}

function Subscribe() {
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
      setStatus({ loading: false, error: 'Please fill in all required fields.', success: '' })
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
      setStatus({ loading: false, error: '', success: 'Subscription saved. Thanks for joining!' })
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Could not reach the backend.', success: '' })
    }
  }

  return (
    <section className="page-stack">
      <div className="app-panel space-y-4">
        <div>
          <h1 className="page-title">Subscribe</h1>
          <p className="mt-3 text-slate-600">Get produce box updates and event reminders delivered to your inbox.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-2">
            <span className="form-label">Name</span>
            <input className="form-field" type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label className="grid gap-2">
            <span className="form-label">Email</span>
            <input className="form-field" type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label className="grid gap-2">
            <span className="form-label">Preference</span>
            <input className="form-field" type="text" name="preference" value={formData.preference} onChange={handleChange} placeholder="e.g. Weekly produce box" />
          </label>

          <label className="grid gap-2">
            <span className="form-label">Frequency</span>
            <select className="form-field" name="frequency" value={formData.frequency} onChange={handleChange}>
              <option value="">Select frequency</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="form-label">Notes</span>
            <textarea className="form-field min-h-[120px] resize-none" name="notes" value={formData.notes} onChange={handleChange} />
          </label>

          {status.error && <p className="error-text" role="alert">{status.error}</p>}
          {status.success && <p className="text-sm font-semibold text-emerald-700" role="status">{status.success}</p>}

          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.loading}>
            {status.loading ? 'Saving...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Subscribe
