import Total from '../Total/Total'
import './Payment.scss'
import left from '../../assets/images/arr-left.svg'
import calend from '../../assets/images/calendar.svg'
import geo from '../../assets/images/geo.svg'
import Button from '../Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { ROUTES } from '../../constants/constants'
import { authSelectors } from '../../store/auth/authSelectors'

const Payment = () => {
  const navigate = useNavigate()
  const orderData = useSelector(calculatorSelectors.getOrderForm)
  const isAuth = useSelector(authSelectors.getIsAuth)

  function handleSubmit() {
    // TODO: подключить оплату

    isAuth ? navigate(ROUTES.PROFILE) : navigate(ROUTES.HOME)
  }

  return (
    <section className="payment">
      <Link to="/" className="payment__back">
        <img src={left} alt="arrow back" />
        Назад
      </Link>
      <Total
        toiletsTotal={orderData.bathrooms_number}
        roomsTotal={orderData.rooms_number}
        total={orderData.total_sum}
        // amount={orderData}
      />
      <div className="payment__info">
        <div className="payment__info-wrapper">
          <img src={calend} alt="" />
          <p className="payment__text">
            {orderData.cleaning_date} • {orderData.cleaning_time}
          </p>
        </div>
        <div className="payment__info-wrapper">
          <img src={geo} alt="" />
          <p className="payment__text">{` г. ${orderData.address.city}, ул ${orderData.address.street}, д.${orderData.address.house}, кв ${orderData.address.apartment}, подъезд ${orderData.address.entrance}, этаж ${orderData.address.floor}`}</p>
        </div>
        <p className="payment__text">{orderData.user.username}</p>
        <p className="payment__text">{orderData.user.email}</p>
        <p className="payment__text">{orderData.user.phone}</p>
        {orderData.comment && <p className="payment__text">Комментарий: {orderData.comment}</p>}
      </div>

      <Button buttonClassName="payment__button" buttonText="Оплатить" onClick={() => handleSubmit()} />
    </section>
  )
}

export default Payment
