import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import { client } from './services/apollo-client.service.ts'
import './services/i18n.service.ts'
import { store } from './store/store.ts'

import App from './RootCmp.tsx'
import './assets/style/main.scss'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
