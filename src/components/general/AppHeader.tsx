import { Link, NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../store/store'
import { handleLogout } from '../../store/slices/system.slice'

import { useAuthorization } from '../../customHooks/useAuthorization'
import { useInternationalization } from '../../customHooks/useInternationalization'

const AppHeader = () => {
  const dispatch = useAppDispatch()
  const { isUserLoggedIn } = useAuthorization()
  const { getTranslation, setLanguage, getCurrentLanguage } = useInternationalization()

  async function onLogout() {
    if (!isUserLoggedIn()) return

    try {
      await dispatch(handleLogout())
    } catch (err) {
      console.error('App Header -> Had issues with logging out:', err)
    }
  }

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

          {isUserLoggedIn() && (
            <button className="btn-logout" onClick={onLogout}>
              {getTranslation('logout')}
            </button>
          )}

          {!isUserLoggedIn() && (
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
