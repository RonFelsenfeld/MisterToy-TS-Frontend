import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ToyIndex from './pages/ToyIndex'
import ToyDetails from './pages/ToyDetails'

import AppHeader from './components/general/AppHeader'

const App = () => {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<ToyIndex />} />
            <Route path="/toy/:toyId" element={<ToyDetails />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
