import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ToyIndex from './pages/ToyIndex'
import AppHeader from './components/general/AppHeader'

const App = () => {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<ToyIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
