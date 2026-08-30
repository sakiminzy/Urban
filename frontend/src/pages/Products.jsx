import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'
import { products as fallbackProducts } from '../data/items'
import { getProducts } from '../services/api'
import { mergeItemsById } from '../utils/mergeItems'

function Products() {
  const [products, setProducts] = useState(fallbackProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        setIsLoading(true)
        setError('')
        const apiProducts = await getProducts()

        if (isMounted) {
          setProducts(mergeItemsById(apiProducts, fallbackProducts))
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts)
          setError('Backend unavailable. Showing local data for now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  return (
    <section className="page-stack" aria-labelledby="products-heading">
      <div>
        <p className="section-kicker">Eco marketplace</p>
        <h1 id="products-heading" className="mt-2 page-title">Products</h1>
        <p className="page-copy mt-3">Eco-friendly produce, garden supplies, and reusable essentials.</p>
      </div>

      <div className="app-panel flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search products" />
        <CategoryFilter categories={categories} value={selectedCategory} onChange={setSelectedCategory} label="Product category" />
      </div>

      {isLoading && (
        <p className="app-panel text-slate-600" role="status">Loading products...</p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="status">
          {error}
        </p>
      )}

      {!isLoading && filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ItemCard key={product.id} item={product} />
          ))}
        </div>
      ) : !isLoading ? (
        <p className="app-panel text-slate-600" role="status">No products match your search.</p>
      ) : null}
    </section>
  )
}

export default Products
