import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  const detailPath = `/${item.type}s/${item.id}`

  return (
    <article className="flex h-full flex-col gap-5 rounded-card border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
      <div className="relative h-48 w-full overflow-hidden rounded-image bg-[#ededed]">
        <img className="h-full w-full object-cover" src={item.image} alt="" />
        <span className="category-badge absolute left-4 top-4">{item.category}</span>
        {item.date && (
          <span className="absolute right-4 top-4 rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs text-white">
            {new Date(item.date).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="font-display text-2xl font-medium text-[color:var(--text)]">{item.title}</h2>
        <p className="mt-2 flex-1 text-base text-[color:var(--muted)]">{item.description}</p>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">{item.availability}</span>
          </div>
          <span className="text-xl font-semibold text-[color:var(--text)]">{item.price}</span>
        </div>

        <Link
          to={detailPath}
          className="btn-primary focus-ring mt-5 w-full"
          aria-label={`View details for ${item.title}`}
        >
          View details
        </Link>
      </div>
    </article>
  )
}

export default ItemCard
