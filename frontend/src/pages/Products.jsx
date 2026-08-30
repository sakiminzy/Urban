import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'
import { useAppContext } from '../context/useAppContext'
import { products as fallbackProducts } from '../data/items'
import { getProducts } from '../services/api'
import { mergeItemsById } from '../utils/mergeItems'

function Products() {
  const { searchTerm, selectedCategory, t } = useAppContext()
  const [products, setProducts] = useState(fallbackProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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
          setError(t('offlineWarning'))
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
  }, [t])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      !categories.includes(selectedCategory) ||
      product.category === selectedCategory
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
        <h1 id="products-heading" className="mt-2 page-title">{t('productPageTitle')}</h1>
        <p className="page-copy mt-3">{t('productPageCopy')}</p>
      </div>

      <div className="app-panel flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar placeholder={t('searchProducts')} />
        <CategoryFilter categories={categories} label={t('categoryLabelProducts')} />
      </div>

      {isLoading && (
        <p className="app-panel text-slate-600 dark:text-slate-300" role="status">{t('loadingProducts')}</p>
      )}

      {error && !isLoading && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
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
        <p className="app-panel text-slate-600 dark:text-slate-300" role="status">{t('noMatches')}</p>
      ) : null}
    </section>
  )
}

export default Products
