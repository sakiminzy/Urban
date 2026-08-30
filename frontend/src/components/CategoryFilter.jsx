function CategoryFilter({ categories, value, onChange, label = 'Category' }) {
  return (
    <div>
      <label htmlFor="category-filter" className="form-label">
        {label}
      </label>
      <select
        id="category-filter"
        value={categories.includes(value) ? value : 'all'}
        onChange={(event) => onChange(event.target.value)}
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
