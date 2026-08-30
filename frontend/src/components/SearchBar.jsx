function SearchBar({ value, onChange, placeholder = 'Search items' }) {
  return (
    <div>
      <label htmlFor="item-search" className="form-label">
        Search
      </label>
      <input
        id="item-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="form-field sm:w-96"
        aria-label={placeholder}
      />
    </div>
  )
}

export default SearchBar
