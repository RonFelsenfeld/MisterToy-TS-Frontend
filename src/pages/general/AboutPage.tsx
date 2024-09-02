import { useInternationalization } from '../../customHooks/useInternationalization'
import BranchesMap from '../../components/general/BranchesMap'

const AboutPage = () => {
  const { getTranslation } = useInternationalization()

  return (
    <section className="about-page">
      <div className="content-container flex column justify-center">
        <h2 className="about-heading">{getTranslation('about')}</h2>
        <h3 className="greet">{getTranslation('hi-greet')}</h3>

        <div className="about-description flex column">
          <p>{getTranslation('about-p-1')}</p>
          <p>{getTranslation('about-p-2')}</p>
          <p>{getTranslation('about-p-3')}</p>
        </div>

        <h3 className="greet">{getTranslation('waiting-greet')}</h3>
      </div>

      <BranchesMap />
    </section>
  )
}

export default AboutPage
