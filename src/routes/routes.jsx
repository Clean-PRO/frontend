import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '../constants/constants.js'
import RequireAuth from '../hocs/RequireAuth.jsx'

const App = lazy(() => import('../App.jsx'))
const MainPage = lazy(() => import('../pages/MainPage/MainPage.jsx'))
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage.jsx'))
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage.jsx'))
const SigninPage = lazy(() => import('../pages/SigninPage/SigninPage.jsx'))
const PaymentPage = lazy(() => import('../pages/PaymentPage/PaymentPage.jsx'))
const AdminPage = lazy(() => import('../pages/AdminPage/AdminPage.jsx'))
const Page404 = lazy(() => import('../pages/Page404/Page404.jsx'))

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.ADMIN,
        element: <AdminPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <RequireAuth />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: ROUTES.SIGNIN,
        element: <RequireAuth require={false} />,
        children: [
          {
            path: ROUTES.SIGNIN,
            element: <SigninPage />,
          },
        ],
      },
      {
        path: ROUTES.PAYMENT,
        element: <PaymentPage />,
      },
    ],
  },
])

export default router
