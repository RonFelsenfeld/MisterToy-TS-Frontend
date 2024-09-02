import { Link } from 'react-router-dom'
import { useInternationalization } from '../../customHooks/useInternationalization'

const HomePage = () => {
  const { getTranslation } = useInternationalization()

  return (
    <section className="home-page">
      <div className="hero-section flex column align-center">
        <div className="main-container flex column center">
          <div className="heading-container flex column align-center">
            <h1 className="main-heading">{getTranslation('home-page-main-heading')}</h1>
            <h2 className="secondary-heading">{getTranslation('home-page-secondary-heading')}</h2>
          </div>

          <Link to="/toy">
            <button className="btn-cta">{getTranslation('get-started-btn')}</button>
          </Link>
        </div>

        <img src="../assets/img/home-page.png" alt="Children playing" className="hero-img" />
      </div>
    </section>
  )
}

export default HomePage
