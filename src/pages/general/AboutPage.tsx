import BranchesMap from '../../components/general/BranchesMap'

const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="content-container flex column justify-center">
        <h2 className="about-heading">About Us</h2>
        <h3 className="greet">Hi there!</h3>

        <div className="about-description flex column">
          <p>MisterToy is one of the most popular and top-rated toys store in Israel.</p>
          <p>Our motivation is to give you the best service for the lowest price.</p>
          <p>You can find us at out branches, take a look at the map.</p>
        </div>

        <h3 className="greet">We are waiting for you!</h3>
      </div>

      <BranchesMap />
    </section>
  )
}

export default AboutPage
