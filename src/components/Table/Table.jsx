import TableTitle from '../TableTitle/TableTitle'

import CardOrder from '../CardOrder/CardOrder'

import { getUserOrders } from '../../store/order/orderActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderSelectors } from '../../store/order/orderSelectors'
import { adminSelectors } from '../../store/admin/adminSelectors'

function Table() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const linkView = useSelector(adminSelectors.getAdminTab)

  let userOrders
    if (linkView === 'new') {
      userOrders = useSelector(orderSelectors.getNewOrders)
    } else if (linkView === 'current') {
      userOrders = useSelector(orderSelectors.getAccepted)
    } else if (linkView === 'finished') {
      userOrders = useSelector(orderSelectors.getFinished)
    } else if (linkView === 'cancelled') {
      userOrders = useSelector(orderSelectors.getCancelled)
    }

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
