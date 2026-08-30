import { useAppContext } from '../context/useAppContext'

function SearchBar({ placeholder = 'Search items' }) {
  const { searchTerm, setSearchTerm } = useAppContext()

  return (
    <div>
      <label htmlFor="item-search" className="form-label">
        Search
      </label>
      <input
        id="item-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder={placeholder}
        className="form-field sm:w-96"
        aria-label={placeholder}
      />
    </div>
  )
}

export default SearchBar
