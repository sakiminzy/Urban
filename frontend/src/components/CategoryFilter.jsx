import { useAppContext } from '../context/useAppContext'

function CategoryFilter({ categories, label = 'Category' }) {
  const { selectedCategory, setSelectedCategory } = useAppContext()

  return (
    <div>
      <label htmlFor="category-filter" className="form-label">
        {label}
      </label>
      <select
        id="category-filter"
        value={categories.includes(selectedCategory) ? selectedCategory : 'all'}
        onChange={(event) => setSelectedCategory(event.target.value)}
        className="form-field sm:w-64"
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
