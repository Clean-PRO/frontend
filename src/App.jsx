import { Outlet } from 'react-router-dom'

import Header from './components/Header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/auth/authActions'
import { getExtraService, getServiceTypes } from './store/calculator/calculatorActions'
import { getRatings } from './store/ratings/ratingsActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServiceTypes())
    dispatch(getExtraService())
    dispatch(getUser())
    dispatch(getRatings())
  }, [dispatch])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
