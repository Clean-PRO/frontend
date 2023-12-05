import { useDispatch, useSelector } from 'react-redux'
import './Search.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { adminSelectors } from '../../store/admin/adminSelectors'
import { setFiltred } from '../../store/order/orderSlice'
import { setSearch } from '../../store/order/orderSlice'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

function Search() {
  const dispatch = useDispatch()
  const { register, reset, getValues } = useForm()
  const linkView = useSelector(adminSelectors.getAdminTab)

  useEffect(() => {
    reset({
      searchText: '',
    })
  }, [reset, linkView])

  const userOrders = useSelector(orderSelectors.getAllOrders)

  const handleInputChange = () => {
    const searchText = getValues('searchText')
    dispatch(setFiltred(userOrders.filter(order => order.id == searchText)))
    dispatch(setSearch(true))
    if (searchText === '') {
      dispatch(setSearch(false))
    }
  }

  return (
    <form className="search">
      <input
        placeholder="Номер заказа"
        className="search__input"
        {...register('searchText', { onChange: handleInputChange })}
      />
    </form>
  )
}

export default Search
