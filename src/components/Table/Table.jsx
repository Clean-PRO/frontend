import TableTitle from '../TableTitle/TableTitle'
import CardOrder from '../CardOrder/CardOrder'
import { getUserOrders } from '../../store/order/orderActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderSelectors } from '../../store/order/orderSelectors'
import { adminSelectors } from '../../store/admin/adminSelectors'
import { setSearch } from '../../store/order/orderSlice'

function Table() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const linkView = useSelector(adminSelectors.getAdminTab)
  const search = useSelector(orderSelectors.getSearch)
  const orders = useSelector(orderSelectors.getAllOrders)
  const filter = useSelector(orderSelectors.getFiltred)

  useEffect(() => {
    dispatch(setSearch(false))
  }, [dispatch, linkView])

  const setUserOrders = () => {
    if (linkView === 'new' && search === false) {
      return orders.filter(order => order.order_status === 'Создан')
    } else if (linkView === 'new' && search === true) {
      return filter
    } else if (linkView === 'current' && search === false) {
      return orders.filter(order => order.order_status === 'accepted')
    } else if (linkView === 'current' && search === true) {
      return filter
    } else if (linkView === 'finished' && search === false) {
      return orders.filter(order => order.order_status === 'finished')
    } else if (linkView === 'finished' && search === true) {
      return filter
    } else if (linkView === 'cancelled' && search === false) {
      return orders.filter(order => order.order_status === 'cancelled')
    } else if (linkView === 'cancelled' && search === true) {
      return filter
    }
  }
  const userOrders = setUserOrders()

  return (
    <div>
      <TableTitle />
      {userOrders?.map(o => (
        <CardOrder
          key={o.id}
          id={o.id}
          address={o.address}
          user={o.user}
          total_sum={o.total_sum}
          cleaning_type={o.cleaning_type.title}
          cleaning_date={o.cleaning_date}
          cleaning_time={o.cleaning_time}
          creation_date={o.creation_date}
          creation_time={o.creation_time}
          services={o.services}
          comment_cancel={o.comment_cancel}
        />
      ))}
    </div>
  )
}

export default Table
