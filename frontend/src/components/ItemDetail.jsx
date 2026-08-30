import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

function ItemDetail({ item, backPath, backLabel }) {
  const { t } = useAppContext()

  return (
    <article className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="overflow-hidden rounded-3xl border border-white/80 bg-white p-3 shadow-2xl shadow-emerald-950/10 dark:border-slate-800 dark:bg-slate-900">
        <img className="h-72 w-full rounded-2xl object-cover sm:h-[32rem]" src={item.image} alt={item.title} />
      </div>

      <div className="space-y-6">
        <Link className="btn-secondary" to={backPath}>
          {backLabel}
        </Link>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="badge">{item.category}</span>
            <span className="badge bg-earthBrown-50 text-earthBrown dark:bg-amber-950 dark:text-amber-300">{item.availability}</span>
          </div>
          <h1 className="mt-4 page-title">{item.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
        </div>

        <dl className="app-panel grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('priceLabel')}</dt>
            <dd className="mt-1 font-black text-slate-950 dark:text-slate-50">{item.price}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('availabilityLabel')}</dt>
            <dd className="mt-1 font-black text-slate-950 dark:text-slate-50">{item.availability}</dd>
          </div>
          {item.date && (
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('dateLabel')}</dt>
              <dd className="mt-1 font-black text-slate-950 dark:text-slate-50">
                <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  )
}

export default ItemDetail
