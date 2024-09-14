import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { useInternationalization } from '../../customHooks/useInternationalization'
import { RootState } from '../../store/store'

const AppHeader = () => {
  const user = useSelector((state: RootState) => state.systemSlice.loggedInUser)
  const { getTranslation, setLanguage, getCurrentLanguage } = useInternationalization()

  async function onLogout() {}

  function getActiveLangClass(lang: string) {
    return getCurrentLanguage() === lang ? 'active' : ''
  }

  return (
    <header className={`app-header main-layout full ${getCurrentLanguage()}`}>
      <div className="flex align-center justify-between">
        <Link to="/">
          <h1 className="logo">{getTranslation('mister-toy')}</h1>
        </Link>

        <nav className="main-nav flex align-center">
          <NavLink to="/">
            <button className="btn-nav-link">{getTranslation('home')}</button>
          </NavLink>

          <NavLink to="/toy">
            <button className="btn-nav-link">{getTranslation('shop')}</button>
          </NavLink>

          <NavLink to="/dashboard">
            <button className="btn-nav-link">{getTranslation('dashboard')}</button>
          </NavLink>

          <NavLink to="/about">
            <button className="btn-nav-link">{getTranslation('about')}</button>
          </NavLink>

          {user && (
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          )}

          {!user && (
            <NavLink to="/login">
              <button className="btn-nav-link">{getTranslation('login')}</button>
            </NavLink>
          )}
        </nav>
      </div>

      <div className="language-controls flex">
        <button
          className={`btn-lang ${getActiveLangClass('en')}`}
          onClick={setLanguage.bind(null, 'en')}
        >
          {getTranslation('en')}
        </button>
        <button
          className={`btn-lang ${getActiveLangClass('he')}`}
          onClick={setLanguage.bind(null, 'he')}
        >
          {getTranslation('he')}
        </button>
      </div>
    </header>
  )
}

export default AppHeader
