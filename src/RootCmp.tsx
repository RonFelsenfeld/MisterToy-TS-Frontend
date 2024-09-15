import { useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useAppDispatch } from './store/store'
import { fetchLoggedInUser } from './store/slices/system.slice'
import { useInternationalization } from './customHooks/useInternationalization'

import Dashboard from './pages/general/Dashboard'
import HomePage from './pages/general/HomePage'
import AboutPage from './pages/general/AboutPage'
import LoginPage from './pages/general/LoginPage'

import ToyIndex from './pages/toy/ToyIndex'
import ToyEdit from './pages/toy/ToyEdit'
import ToyDetails from './pages/toy/ToyDetails'

import AppHeader from './components/general/AppHeader'

const App = () => {
  const { getCurrentLanguage } = useInternationalization()
  const dispatch = useAppDispatch()

  // ! Fetching the current logged in user from the server
  useEffect(() => {
    dispatch(fetchLoggedInUser())
  }, [])

  return (
    <Router>
      <section className={`app main-layout ${getCurrentLanguage()}`}>
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/toy" element={<ToyIndex />} />
            <Route path="/toy/:toyId" element={<ToyDetails />} />
            <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
