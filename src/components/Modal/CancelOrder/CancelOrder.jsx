import './CancelOrder.scss'
import '../Modal.scss'

import Button from '../../Button/Button'
import ordersAPI from '../../../api/ordersAPI'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { getToken } from '../../../utils/tokenActions'
import { getUserOrders } from '../../../store/order/orderActions'

function CancelOrder({ show, closeModal, order }) {
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    const token = getToken()
    await ordersAPI.updateOrder(order, token, { order_status: 'cancelled' })
    dispatch(getUserOrders())
    closeModal()
  }

  if (!show) return null
  return (
    <>
      {createPortal(
        <div className="modal">
          <form onSubmit={handleSubmit} action="" className="modal__wrapper">
            <p className="text-l">Вы уверены, что хотите отменить уборку?</p>
            <div className="modal__button-wrapper">
              <Button buttonText="Отменить" buttonClassName="button button__modal-indent" type="submit" />
              <button className="modal__cancell text-m-bold" onClick={closeModal}>
                Вернуться
              </button>
            </div>
          </form>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default CancelOrder
