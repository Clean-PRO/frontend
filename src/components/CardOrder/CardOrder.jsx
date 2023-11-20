import './CardOrder.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import { getToken } from '../../utils/tokenActions'

import AdditionalInfoAdmin from '../AdditionalInfoAdmin/AdditionalinfoAdmin'
import { useState } from 'react'
import CancelOrder from '../Modal/CancelOrder/CancelOrder'
import ordersAPI from '../../api/ordersAPI'

function CardOrder({
  id,
  address,
  user,
  cleaning_type,
  cleaning_date,
  cleaning_time,
  creation_date,
  creation_time,
  total_sum,
  services,
  comment_cancel,
}) {
  function formatData(data) {
    const parts = data.split('-')
    return parts.reverse().join('.')
  }

  async function acceptOrder(e) {
    e.preventDefault()
    const token = getToken()
    await ordersAPI.updateOrder(id, token, { order_status: 'accepted' })
    setShowCancel(false)
  }

  const viewTab = useSelector(adminSelectors.getAdminTab)
  const [viewExtra, setViewExtra] = useState(true)
  const [showCancel, setShowCancel] = useState(false)

  return (
    <div className="wrapper" onClick={() => setViewExtra(!viewExtra)}>
      <div className="card-order grid">
        <p className="grid__item text-s">
          {formatData(creation_date)}
          <br />
          {creation_time.split(':', 2).join(':')}
        </p>
        <p className="grid__item text-m-bold">{id}</p>
        <p className="grid__item text-m-bold">{cleaning_type}</p>
        <p className="grid__item text-m-bold">
          {formatData(cleaning_date)}
          <br />
          {cleaning_time.split(':', 2).join(':')}
        </p>
        <p className="grid__item text-m-bold">{new Intl.NumberFormat('ru-RU').format(total_sum)}</p>
        <p className="grid__item text-m-bold">Маргарита Киселева</p>
        <div className="grid__item text-m-bold card-order__complete">
          {viewTab === 'new' && (
            <>
              <button className="card-order__button text-m-bold" onClick={e => acceptOrder(e)}>
                Принять
              </button>
              <button className="card-order__close" onClick={() => setShowCancel(true)}>
                +
              </button>
            </>
          )}

          {viewTab === 'current' && (
            <>
              <button className="card-order__button text-m-bold">Завершить</button>
              <button className="card-order__close" onClick={() => setShowCancel(true)}>
                +
              </button>
            </>
          )}
          {viewTab === 'completed' && (
            <>
              <p className="text-m-bold">
                23.09.2023
                <br />
                10:00
              </p>
            </>
          )}
          {viewTab === 'cancelled' && (
            <div className="card-order__cancelled-comment">
              <p className="text-m-bold">
                23.09.2023
                <br />
                10:00
              </p>
              <p className="card-order__comment text-s">{comment_cancel}</p>
            </div>
          )}
        </div>
        {!viewExtra && <AdditionalInfoAdmin address={address} user={user} services={services} />}
      </div>
      <CancelOrder show={showCancel} closeModal={() => setShowCancel(false)} order={id} />
    </div>
  )
}

export default CardOrder
