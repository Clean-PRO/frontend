import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './Search.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { setFiltred } from '../../store/order/orderSlice'
import { setSearch } from '../../store/order/orderSlice'
import { adminSelectors } from '../../store/admin/adminSelectors'

function Search() {
  const dispatch = useDispatch()
  const { handleSubmit, onChange, register, reset } = useForm()
  const userOrders = useSelector(orderSelectors.getAllOrders)
  const linkView = useSelector(adminSelectors.getAdminTab)

  useEffect(() => {
    reset({
      searchText: '',
    })
  }, [reset, linkView])

  function filterOrders(data) {
    dispatch(setFiltred(userOrders.filter(order => order.id == data.searchText)))
  }

  const onSubmit = data => {
    filterOrders(data)
    dispatch(setSearch(true))
  }

  return (
    <form className="search" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Номер заказа" className="search__input" onChange={onChange} {...register('searchText')} />
      <button type="submit" className="search__button"></button>
    </form>
  )
}

export default Search
