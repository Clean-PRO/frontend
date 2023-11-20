import { useDispatch, useSelector } from 'react-redux'
import './Search.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { setFiltred } from '../../store/order/orderSlice'
import { setSearch } from '../../store/order/orderSlice'
import { useForm } from 'react-hook-form'

function Search() {
  const dispatch = useDispatch()
  const { handleSubmit, onChange, register } = useForm()
  const userOrders = useSelector(orderSelectors.getAllOrders)

  const onSubmit = data => {
    dispatch(setFiltred(userOrders.filter(order => order.id == data.searchText)))
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
