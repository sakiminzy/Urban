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

const itemFields = {
  products: ['title', 'category', 'image', 'description', 'price', 'availability'],
  events: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
  workshops: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
}

function Admin() {
  const { isOnline, t } = useAppContext()
  const [selectedType, setSelectedType] = useState('products')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState({ error: '', success: '', loading: false })
  const [isLoading, setIsLoading] = useState(true)

  const itemTemplates = useMemo(
    () => ({
      products: { label: t('products'), fields: itemFields.products },
      events: { label: t('events'), fields: itemFields.events },
      workshops: { label: t('workshops'), fields: itemFields.workshops },
    }),
    [t],
  )

  const fieldLabels = useMemo(
    () => ({
      title: t('titleLabel'),
      category: t('categoryLabel'),
      image: t('imageLabel'),
      description: t('descriptionLabel'),
      price: t('priceLabel'),
      availability: t('availabilityLabel'),
      date: t('dateLabel'),
      location: t('locationLabel'),
    }),
    [t],
  )

  const apiConfig = useMemo(
    () => ({
      products: { fetch: getProducts, create: createProduct, update: updateProduct, remove: deleteProduct },
      events: { fetch: getEvents, create: createEvent, update: updateEvent, remove: deleteEvent },
      workshops: { fetch: getWorkshops, create: createWorkshop, update: updateWorkshop, remove: deleteWorkshop },
    }),
    [],
  )

  const currentConfig = apiConfig[selectedType]
  const currentTemplate = itemTemplates[selectedType]
  const currentFields = currentTemplate.fields

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
    setFormData(currentFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}))
    loadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType])

  const selectItem = (item) => {
    setSelectedItem(item)
    setFormData(currentFields.reduce((acc, field) => ({ ...acc, [field]: item[field] || '' }), {}))
    setFeedback({ error: '', success: '', loading: false })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setSelectedItem(null)
    setFormData(currentFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}))
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
      const payload = currentFields.reduce((acc, field) => ({ ...acc, [field]: formData[field] || '' }), {})
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
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t('adminDescription')}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label className="form-label" htmlFor="item-type-select">{t('adminTypeLabel')}</label>
                <select
                  id="item-type-select"
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  className="form-field sm:w-64"
                >
                  <option value="products">{t('products')}</option>
                  <option value="events">{t('events')}</option>
                  <option value="workshops">{t('workshops')}</option>
                </select>
              </div>
              <button type="button" className="btn-secondary" onClick={resetForm}>{t('adminNewItem')}</button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">{currentTemplate.label}</h2>
              {isLoading ? (
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('loadingItems')}</p>
              ) : items.length === 0 ? (
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('noItemsAvailable')}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${selectedItem?.id === item.id ? 'border-harvestGreen bg-harvestGreen-50 text-harvestGreen' : 'border-slate-200 bg-white text-slate-900 hover:border-harvestGreen/50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}
                        onClick={() => selectItem(item)}
                      >
                        <span className="font-semibold">{item.title}</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400">{item.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{selectedItem ? t('adminEditItem') : t('adminNewItem')}</h2>
            <form className="mt-6 grid gap-4" onSubmit={handleSave}>
              {currentFields.map((field) => (
                <label key={field} className="grid gap-2">
                  <span className="form-label">{fieldLabels[field] || field}</span>
                  {field === 'description' ? (
                    <textarea name={field} value={formData[field] || ''} onChange={handleInputChange} className="form-field min-h-[120px] resize-none" />
                  ) : field === 'date' ? (
                    <input name={field} type="date" value={formData[field] || ''} onChange={handleInputChange} className="form-field" />
                  ) : (
                    <input name={field} value={formData[field] || ''} onChange={handleInputChange} className="form-field" />
                  )}
                </label>
              ))}

              {feedback.error && <p className="error-text">{feedback.error}</p>}
              {feedback.success && <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{feedback.success}</p>}

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
