import { Link, NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className="app-header main-layout full">
      <div className="flex align-center justify-between">
        <Link to="/">
          <h1 className="logo">MisterToy</h1>
        </Link>

        <nav className="main-nav flex align-center">
          <NavLink to="/">
            <button className="btn-nav-link">Home</button>
          </NavLink>

          <NavLink to="/toy">
            <button className="btn-nav-link">Shop</button>
          </NavLink>

          <NavLink to="/dashboard">
            <button className="btn-nav-link">Dashboard</button>
          </NavLink>

          <NavLink to="/about">
            <button className="btn-nav-link">About</button>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
