import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ToyIndex from './pages/ToyIndex'
import ToyDetails from './pages/ToyDetails'
import ToyEdit from './pages/ToyEdit'

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
            <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
