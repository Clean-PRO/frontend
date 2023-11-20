import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/GlobalStyle.scss'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { Provider } from 'react-redux'
import store from './store/index'
import PageLoader from './components/PageLoader/PageLoader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
