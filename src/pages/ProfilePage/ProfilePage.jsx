import { useEffect } from 'react'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import './ProfilePage.scss'
import OrderCard from '../../components/OrderCard/OrderCard'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { orderSelectors } from '../../store/order/orderSelectors'
import { getUserOrders } from '../../store/order/orderActions'
import Button from '../../components/Button/Button'
import no_order from '../../assets/images/no-orders.svg'
import { HashLink } from 'react-router-hash-link'
import { handleProfile, handleOrder } from '../../store/profile/profileSlice'
import { profileSelectors } from '../../store/profile/profileSelectors'

export default function Profile() {
  const dispatch = useDispatch()
  const userOrders = useSelector(orderSelectors.getAllOrders)
  const getPage = useSelector(profileSelectors.getPage)

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  return (
    <div className="profile">
      <div className="profile__content">
        <h1 className="profile__title">Профиль</h1>
        <nav className="profile__menu">
          <button
            className={`profile__menu-button ${getPage === 'profileForm' ? '' : 'profile__menu-button_active'}`}
            onClick={() => dispatch(handleOrder())}>
            Мои уборки
          </button>
          <button
            className={`profile__menu-button ${getPage === 'profileOrders' ? '' : 'profile__menu-button_active'} `}
            onClick={() => dispatch(handleProfile())}>
            Личные данные
          </button>
        </nav>
        {getPage === 'profileForm' && <ProfileForm />}
        {getPage === 'profileOrders' && (
          <div className="profile__cards">
            {userOrders.length === 0 && (
              <div className="profile__no-order-wrapper">
                <img src={no_order} className="profile__no-oder" />{' '}
                <p className="profile__text-no-order">У вас пока нет уборок, но это можно исправить</p>{' '}
                <div style={{ width: '28.6rem' }}>
                  <HashLink to="/#calculator" className="profile__link">
                    <Button buttonClassName="button" buttonText="Заказать уборку" />
                  </HashLink>
                </div>
              </div>
            )}
            {userOrders?.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
