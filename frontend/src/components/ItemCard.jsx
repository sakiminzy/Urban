import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  const detailPath = `/${item.type}s/${item.id}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-emerald-950/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
      <div className="relative overflow-hidden">
        <img className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" src={item.image} alt="" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-4 top-4 badge bg-white/90 text-harvestGreen shadow-sm dark:bg-slate-950/90">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {item.date && (
            <time className="text-slate-500 dark:text-slate-400" dateTime={item.date}>
              {new Date(item.date).toLocaleDateString()}
            </time>
          )}
        </div>

        <h2 className="mt-3 text-xl font-black text-slate-950 dark:text-slate-50">{item.title}</h2>
        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>

        <div className="mt-5 grid gap-2 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
          <p className="font-black text-slate-950 dark:text-slate-50">{item.price}</p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.availability}</p>
        </div>

        <Link
          to={detailPath}
          className="btn-primary mt-5 w-full"
          aria-label={`View details for ${item.title}`}
        >
          View details
        </Link>
      </div>
    </article>
  )
}

export default ItemCard
