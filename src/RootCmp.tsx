import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ToyIndex from './pages/toy/ToyIndex'
import ToyDetails from './pages/toy/ToyDetails'
import ToyEdit from './pages/toy/ToyEdit'

import HomePage from './pages/general/HomePage'
import Dashboard from './pages/general/Dashboard'

import AppHeader from './components/general/AppHeader'

const App = () => {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/toy" element={<ToyIndex />} />
            <Route path="/toy/:toyId" element={<ToyDetails />} />
            <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
