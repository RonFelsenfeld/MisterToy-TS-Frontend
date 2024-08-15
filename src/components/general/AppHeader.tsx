import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className="app-header main-layout full">
      <div className="flex align-center justify-between">
        <h1 className="logo">MisterToy</h1>

        <nav className="main-nav flex align-center">
          <NavLink to="/">
            <button className="btn-nav-link">Home</button>
          </NavLink>

          <NavLink to="/toy">
            <button className="btn-nav-link">About</button>
          </NavLink>

          <NavLink to="/toy">
            <button className="btn-nav-link">Shop</button>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
