import { useEffect, useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import { createReview, getReviewsByItem } from '../services/api'

function ReviewSection({ itemType, itemId, itemTitle }) {
  const { isOnline, t } = useAppContext()
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({ reviewerName: '', rating: '5', comment: '' })
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadReviews = async () => {
      try {
        setIsLoading(true)
        const apiReviews = await getReviewsByItem(itemType, itemId)

        if (isMounted) {
          setReviews(apiReviews)
        }
      } catch {
        if (isMounted) {
          setReviews([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadReviews()

    return () => {
      isMounted = false
    }
  }, [itemType, itemId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: false, error: '', success: '' })

    if (!formData.reviewerName.trim() || !formData.comment.trim() || !formData.rating) {
      setStatus({ loading: false, error: t('reviewErrorInvalid'), success: '' })
      return
    }

    if (!isOnline) {
      setStatus({ loading: false, error: t('reviewRequiredOffline'), success: '' })
      return
    }

    try {
      setStatus({ loading: true, error: '', success: '' })
      await createReview({
        reviewerName: formData.reviewerName.trim(),
        rating: Number(formData.rating),
        comment: formData.comment.trim(),
        itemType,
        itemId,
        itemTitle,
      })
      setFormData({ reviewerName: '', rating: '5', comment: '' })
      setStatus({ loading: false, error: '', success: t('reviewSuccess') })
      const updatedReviews = await getReviewsByItem(itemType, itemId)
      setReviews(updatedReviews)
    } catch (error) {
      setStatus({ loading: false, error: error.message || t('reviewErrorInvalid'), success: '' })
    }
  }

  return (
    <section className="app-panel">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('reviewSectionTitle')}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('reviewSectionTitle')} for {itemTitle}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">{t('reviewSubmit')}</h3>
          <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="form-label">{t('reviewName')}</span>
              <input className="form-field" type="text" name="reviewerName" value={formData.reviewerName} onChange={handleChange} />
            </label>

            <label className="grid gap-2">
              <span className="form-label">{t('reviewRating')}</span>
              <select className="form-field" name="rating" value={formData.rating} onChange={handleChange}>
                {[5, 4, 3, 2, 1].map((score) => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="form-label">{t('reviewComment')}</span>
              <textarea className="form-field min-h-[120px] resize-none" name="comment" value={formData.comment} onChange={handleChange} />
            </label>

            {status.error && <p className="error-text">{status.error}</p>}
            {status.success && <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{status.success}</p>}

            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.loading || !isOnline}>
              {status.loading ? t('reviewSaving') : t('reviewSubmit')}
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">What people are saying</h3>
          {isLoading ? (
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t('loadingReviews')}</p>
          ) : reviews.length === 0 ? (
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t('noReviewsYet')}</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">{review.reviewerName}</p>
                    <span className="badge">{review.rating}/5</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReviewSection
