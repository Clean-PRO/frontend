import './CardOrder.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import AdditionalInfoAdmin from '../AdditionalInfoAdmin/AdditionalinfoAdmin'
import { useState } from 'react'

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

  const viewTab = useSelector(adminSelectors.getAdminTab)
  const [viewExtra, setViewExtra] = useState(true)

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
              <button className="card-order__button text-m-bold">Принять</button>
              <div className="card-order__close">+</div>
            </>
          )}

          {viewTab === 'current' && (
            <>
              <button className="card-order__button text-m-bold">Завершить</button>
              <div className="card-order__close">+</div>
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
    </div>
  )
}

export default CardOrder
