import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import {
  createEvent,
  createProduct,
  createWorkshop,
  deleteEvent,
  deleteProduct,
  deleteWorkshop,
  getEvents,
  getProducts,
  getWorkshops,
  updateEvent,
  updateProduct,
  updateWorkshop,
} from '../services/api'

const itemTemplates = {
  products: {
    fields: ['title', 'category', 'image', 'description', 'price', 'availability'],
  },
  events: {
    fields: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
  },
  workshops: {
    fields: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
  },
}

function Admin() {
  const { t, isOnline } = useAppContext()
  const [selectedType, setSelectedType] = useState('products')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState({ error: '', success: '', loading: false })
  const [isLoading, setIsLoading] = useState(true)

  const apiConfig = useMemo(
    () => ({
      products: {
        label: t('products'),
        fetch: getProducts,
        create: createProduct,
        update: updateProduct,
        remove: deleteProduct,
      },
      events: {
        label: t('events'),
        fetch: getEvents,
        create: createEvent,
        update: updateEvent,
        remove: deleteEvent,
      },
      workshops: {
        label: t('workshops'),
        fetch: getWorkshops,
        create: createWorkshop,
        update: updateWorkshop,
        remove: deleteWorkshop,
      },
    }),
    [t],
  )

  const currentConfig = apiConfig[selectedType]
  const currentFields = itemTemplates[selectedType].fields
  const fieldLabels = {
    title: t('titleLabel'),
    category: t('categoryLabel'),
    image: t('imageLabel'),
    description: t('descriptionLabel'),
    price: t('priceLabel'),
    availability: t('availabilityLabel'),
    date: t('dateLabel'),
    location: t('locationLabel'),
  }

  const loadItems = async () => {
    setIsLoading(true)
    setFeedback({ error: '', success: '', loading: false })
    try {
      const data = await currentConfig.fetch()
      setItems(data)
    } catch (error) {
      setFeedback({ error: error.message || 'Unable to load items.', success: '', loading: false })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setSelectedItem(null)
    setFormData(
      currentFields.reduce((acc, field) => {
        acc[field] = ''
        return acc
      }, {}),
    )
    loadItems()
  }, [selectedType, currentFields.join(',')])

  const selectItem = (item) => {
    setSelectedItem(item)
    setFormData(
      currentFields.reduce((acc, field) => {
        acc[field] = item[field] || ''
        return acc
      }, {}),
    )
    setFeedback({ error: '', success: '', loading: false })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setSelectedItem(null)
    setFormData(currentFields.reduce((acc, field) => {
      acc[field] = ''
      return acc
    }, {}))
    setFeedback({ error: '', success: '', loading: false })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setFeedback({ error: '', success: '', loading: true })

    if (!isOnline) {
      setFeedback({ error: t('adminBackendOffline'), success: '', loading: false })
      return
    }

    if (!formData.title || !formData.category || !formData.description) {
      setFeedback({ error: t('adminErrorInvalid'), success: '', loading: false })
      return
    }

    try {
      const payload = currentFields.reduce((acc, field) => {
        acc[field] = formData[field] || ''
        return acc
      }, {})

      const result = selectedItem
        ? await currentConfig.update(selectedItem.id, payload)
        : await currentConfig.create(payload)

      setFeedback({ error: '', success: t('adminSave'), loading: false })
      loadItems()
      setSelectedItem(result)
    } catch (error) {
      setFeedback({ error: error.message || 'Unable to save item.', success: '', loading: false })
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) {
      return
    }

    if (!isOnline) {
      setFeedback({ error: t('adminBackendOffline'), success: '', loading: false })
      return
    }

    try {
      setFeedback({ error: '', success: '', loading: true })
      await currentConfig.remove(selectedItem.id)
      setFeedback({ error: '', success: t('adminDeleteConfirm'), loading: false })
      resetForm()
      loadItems()
    } catch (error) {
      setFeedback({ error: error.message || 'Unable to delete item.', success: '', loading: false })
    }
  }

  return (
    <section className="page-stack">
      <div className="app-panel space-y-6">
        <div>
          <h1 className="page-title">{t('adminTitle')}</h1>
          <p className="mt-3 text-[color:var(--muted)]">{t('adminDescription')}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <div className="app-panel space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label className="text-sm font-semibold text-[color:var(--text)]" htmlFor="item-type-select">
                  {t('adminTypeLabel')}
                </label>
                <select
                  id="item-type-select"
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  className="form-field mt-2 max-w-xs"
                >
                  <option value="products">{t('products')}</option>
                  <option value="events">{t('events')}</option>
                  <option value="workshops">{t('workshops')}</option>
                </select>
              </div>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                {t('adminNewItem')}
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] p-4">
              <h2 className="font-semibold text-[color:var(--text)]">{currentConfig.label}</h2>
              {isLoading ? (
                <p className="mt-4 text-[color:var(--muted)]">{t('loadingItems')}</p>
              ) : items.length === 0 ? (
                <p className="mt-4 text-[color:var(--muted)]">{t('noItemsAvailable')}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${selectedItem?.id === item.id ? 'border-[color:var(--accent)] text-[color:var(--accent)]' : 'border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]'}`}
                        onClick={() => selectItem(item)}
                      >
                        <span className="font-semibold">{item.title}</span>
                        <span className="block text-sm text-[color:var(--muted)]">{item.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="app-panel">
            <h2 className="text-xl font-semibold text-[color:var(--text)]">{selectedItem ? t('adminEditItem') : t('adminNewItem')}</h2>
            <form className="mt-6 grid gap-4" onSubmit={handleSave}>
              {currentFields.map((field) => (
                <label key={field} className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--text)]">{fieldLabels[field] || field}</span>
                  {field === 'description' ? (
                    <textarea
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      className="form-field min-h-[120px] resize-none"
                    />
                  ) : field === 'availability' || field === 'location' || field === 'category' ? (
                    <input
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      className="form-field"
                    />
                  ) : field === 'date' ? (
                    <input
                      name={field}
                      type="date"
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      className="form-field"
                    />
                  ) : (
                    <input
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      className="form-field"
                    />
                  )}
                </label>
              ))}

              {feedback.error && <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">{feedback.error}</p>}
              {feedback.success && <p className="text-sm font-semibold text-[color:var(--accent)]">{feedback.success}</p>}

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" disabled={feedback.loading || !isOnline}>
                  {feedback.loading ? t('savingChanges') : t('adminSave')}
                </button>
                {selectedItem && (
                  <button type="button" className="btn-secondary" onClick={handleDelete} disabled={feedback.loading || !isOnline}>
                    {t('adminDelete')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin
