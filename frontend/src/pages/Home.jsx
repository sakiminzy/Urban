import { useAppContext } from '../context/useAppContext'

function Home() {
  const { t } = useAppContext()

  return (
    <section className="page-stack">
      <p className="section-kicker">{t('sectionKickerHome')}</p>
      <h1 className="page-title">{t('homeHeroTitle')}</h1>
      <p className="page-copy">{t('homeHeroCopy')}</p>
    </section>
  )
}

export default Home
