import { createRoot } from 'react-dom/client'
import App from './RootCmp.tsx'
import './assets/style/main.scss'

createRoot(document.getElementById('root')!).render(<App />)
