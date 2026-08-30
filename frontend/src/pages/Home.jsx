import { Link } from 'react-router-dom'
import NotificationPrompt from '../components/NotificationPrompt'
import WeatherWidget from '../components/WeatherWidget'
import { useAppContext } from '../context/useAppContext'

const features = [
  {
    titleKey: 'products',
    description: 'Fresh harvest boxes, herbs, and growing supplies from nearby urban growers.',
  },
  {
    titleKey: 'events',
    description: 'Markets, harvest days, and seed swaps that bring sustainable communities together.',
  },
  {
    titleKey: 'workshops',
    description: 'Hands-on learning for composting, balcony gardening, and water-wise growing.',
  },
]

const benefits = [
  'Support low-waste neighbourhood food systems',
  'Discover reliable local growers and organisers',
  'Learn practical skills for greener urban living',
  'Book sessions through one simple frontend experience',
]

function Home() {
  const { t } = useAppContext()

  return (
    <div className="page-stack">
      <section className="relative flex flex-col gap-10 pb-4 lg:flex-row lg:items-center">
        <div className="flex w-full max-w-[582px] flex-col gap-8">
          <div className="flex flex-col gap-5">
            <p className="section-kicker">{t('sectionKickerHome')}</p>
            <h1 className="font-display text-[44px] font-medium leading-[1.05] tracking-tight text-[color:var(--text)] sm:text-[60px]">
              Grow, gather, and{' '}
              <span className="text-[color:var(--accent)]">shop sustainably in the city</span>
            </h1>
            <p className="page-copy">{t('homeHeroCopy')}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="btn-primary focus-ring" to="/products">{t('exploreProducts')}</Link>
            <Link className="btn-secondary focus-ring" to="/booking">{t('bookWorkshop')}</Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="badge">10+ Listings</span>
            <span className="badge">3 Tracks</span>
            <span className="badge">1 Backend</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-auto lg:flex-1">
          <img
            className="h-[280px] w-[280px] object-contain sm:h-[340px] sm:w-[340px]"
            src="/images/heroimage.png"
            alt="Illustration of potted plants and a watering can"
          />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3" aria-label="Urban Harvest Hub highlights">
        {features.map((feature) => (
          <article key={feature.titleKey} className="app-panel">
            <span className="badge">Featured</span>
            <h2 className="mt-4 font-display text-xl font-medium text-[color:var(--text)]">{t(feature.titleKey)}</h2>
            <p className="mt-3 leading-6 text-[color:var(--muted)]">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section className="app-panel grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="section-kicker">Why Urban Harvest Hub?</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-[color:var(--text)]">
            {t('whyTitle')}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <p key={benefit} className="rounded-2xl border border-[color:var(--border)] p-4 text-[color:var(--text)]">
              {benefit}
            </p>
          ))}
        </div>
      </section>

      <WeatherWidget />

      <NotificationPrompt />
    </div>
  )
}

export default Home
