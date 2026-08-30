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
      <section className="page-hero grid gap-10 overflow-hidden lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <p className="section-kicker">{t('sectionKickerHome')}</p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            {t('homeHeroTitle')}
          </h1>
          <p className="page-copy">{t('homeHeroCopy')}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" to="/products">{t('exploreProducts')}</Link>
            <Link className="btn-secondary" to="/booking">{t('bookWorkshop')}</Link>
          </div>
        </div>

        <aside className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-harvestGreen/15 blur-3xl" />
          <div className="app-panel relative space-y-5">
            <img
              className="h-56 w-full rounded-2xl object-cover"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
              alt="Fresh vegetables arranged at a local produce market"
            />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="stat-card">
                <p className="text-2xl font-black text-harvestGreen">10+</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Listings</p>
              </div>
              <div className="stat-card">
                <p className="text-2xl font-black text-harvestGreen">3</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Tracks</p>
              </div>
              <div className="stat-card">
                <p className="text-2xl font-black text-harvestGreen">1</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Backend</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 md:grid-cols-3" aria-label="Urban Harvest Hub highlights">
        {features.map((feature) => (
          <article key={feature.titleKey} className="app-panel-soft transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <span className="badge">Featured</span>
            <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-slate-50">{t(feature.titleKey)}</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section className="app-panel grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="section-kicker">Why Urban Harvest Hub?</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-slate-50">
            {t('whyTitle')}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <p key={benefit} className="rounded-2xl bg-harvestGreen-50 p-4 font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
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
