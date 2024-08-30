import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <section className="home-page">
      <div className="hero-section flex column align-center">
        <div className="main-container flex column center">
          <div className="heading-container flex column align-center">
            <h1 className="main-heading">Welcome to Mister Toy!</h1>
            <h2 className="secondary-heading">
              The place for you to discover the Magic of Playtime.
            </h2>
          </div>

          <Link to="/toy">
            <button className="btn-cta">Start shopping</button>
          </Link>
        </div>

        <img src="../assets/img/home-page.png" alt="Children playing" className="hero-img" />
      </div>
    </section>
  )
}

export default HomePage
