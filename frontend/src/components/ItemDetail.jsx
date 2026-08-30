import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

function ItemDetail({ item, backPath, backLabel }) {
  const { t } = useAppContext()

  return (
    <article className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="overflow-hidden rounded-card border border-[color:var(--border)] bg-[color:var(--surface)] p-3">
        <img className="h-72 w-full rounded-image object-cover sm:h-[32rem]" src={item.image} alt={item.title} />
      </div>

      <div className="space-y-6">
        <Link className="btn-secondary focus-ring" to={backPath}>
          {backLabel}
        </Link>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="category-badge">{item.category}</span>
            <span className="badge">{item.availability}</span>
          </div>
          <h1 className="mt-4 page-title">{item.title}</h1>
          <p className="mt-5 text-lg leading-6 text-[color:var(--muted)]">
            {item.description}
          </p>
        </div>

        <dl className="app-panel grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-[color:var(--muted)]">{t('priceLabel')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">{item.price}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[color:var(--muted)]">{t('availabilityLabel')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">{item.availability}</dd>
          </div>
          {item.date && (
            <div>
              <dt className="text-sm font-medium text-[color:var(--muted)]">{t('dateLabel')}</dt>
              <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">
                <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
              </dd>
            </div>
          )}
        </dl>

        <Link className="btn-primary focus-ring w-full sm:w-auto" to="/booking" aria-label={`${t('bookOrRegister')} ${item.title}`}>
          {t('bookOrRegister')}
        </Link>
      </div>
    </article>
  )
}

export default ItemDetail
