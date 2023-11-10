import { useEffect, useState } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '../constants/constants'
import { authSelectors } from '../store/auth/authSelectors'
import { getUser } from '../store/auth/authActions'
import PageLoader from '../components/PageLoader/PageLoader'

function RequireAuth({ require = true }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector(authSelectors.getIsAuth)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .finally(() => setIsLoading(false))
  }, [dispatch])

  if (isLoading) return <PageLoader />

  if (!isAuth && require) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />
  }
  if (isAuth && !require) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  }
  return <Outlet />
}

export default RequireAuth
