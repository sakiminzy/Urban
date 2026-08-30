import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail'
import ReviewSection from '../components/ReviewSection'
import { useAppContext } from '../context/useAppContext'
import { products as fallbackProducts } from '../data/items'
import { getProductById } from '../services/api'

function ProductDetail() {
  const { t } = useAppContext()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      try {
        setIsLoading(true)
        setError('')
        const apiProduct = await getProductById(id)

        if (isMounted) {
          setProduct(apiProduct)
        }
      } catch {
        const fallbackProduct = fallbackProducts.find((item) => item.id === id)

        if (isMounted) {
          setProduct(fallbackProduct || null)
          setError(fallbackProduct ? t('offlineWarning') : t('productDetailsNotFound'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id, t])

  if (isLoading) {
    return (
      <section className="page-stack">
        <p className="app-panel text-slate-600 dark:text-slate-300" role="status">{t('loadingProducts')}</p>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="page-stack">
        <h1 className="page-title">{t('productDetailsNotFound')}</h1>
        <Link className="btn-secondary w-fit" to="/products">{t('backToProducts')}</Link>
      </section>
    )
  }

  return (
    <section className="page-stack">
      {error && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">
          {error}
        </p>
      )}
      <ItemDetail item={product} backPath="/products" backLabel={t('backToProducts')} />
      <ReviewSection itemType="product" itemId={id} itemTitle={product.title} />
    </section>
  )
}

export default ProductDetail
