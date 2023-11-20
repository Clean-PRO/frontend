import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import signin from '../../assets/images/signin.svg'
import profile from '../../assets/images/profile.svg'
import ExitModal from '../Modal/ExitModal/ExitModal'
import './Header.scss'
import { useState } from 'react'
import { ROUTES } from '../../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { authSelectors } from '../../store/auth/authSelectors'
import {
  handleClickOrders,
  handleClickServices,
  handleClickStaff,
  handleClickStatistics,
} from '../../store/admin/adminSlice'
import { handleProfile, handleOrder } from '../../store/profile/profileSlice'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isAuth = useSelector(authSelectors.getIsAuth)
  const [showExit, setShowExit] = useState(false)
  const isAdmin = useSelector(authSelectors.getAdmin)
  // const isAdmin = true
  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__menu">
          <Logo />
          <ul className="header__links">
            <li>
              <Link className={`header__link${location.pathname === ROUTES.HOME ? '-active' : ''}`} to="/">
                Уборка
              </Link>
            </li>
            <li>
              <Link className={`header__link${location.pathname === ROUTES.ABOUT ? '-active' : ''}`} to="/about">
                О компании
              </Link>
            </li>
          </ul>
          <div className="header__info">
            <a href="tel:+74957839900" className="header__phone">
              +7 (495) 783-99-00
            </a>
            {isAdmin && isAuth && (
              <nav className="header__nav">
                <img src={profile} className="header__profile-icon" alt="Иконка профиля" />
                <p className="header__profile">Админ</p>
                <ul className="header__profile-menu">
                  <li className="header__list text-m" onClick={() => dispatch(handleClickOrders())}>
                    <Link to="/office" className="header__menu-list">
                      Заказы
                    </Link>
                  </li>
                  <li className="header__list text-m" onClick={() => dispatch(handleClickServices())}>
                    <Link to="/office" className="header__menu-list">
                      Уборки
                    </Link>
                  </li>
                  <li className="header__list text-m" onClick={() => dispatch(handleClickStaff())}>
                    <Link to="/office" className="header__menu-list">
                      Персонал
                    </Link>
                  </li>
                  <li className="header__list text-m" onClick={() => dispatch(handleClickStatistics())}>
                    <Link to="/office" className="header__menu-list">
                      Статистика
                    </Link>
                  </li>
                  <li className="header__list text-m" onClick={() => setShowExit(s => !s)}>
                    <p className="header__menu-list">Выход</p>
                    <ExitModal show={showExit} closeModal={() => setShowExit(false)} />
                  </li>
                </ul>
              </nav>
            )}
            {isAuth === false && (
              <Link className="header__signin" to="/signin">
                <img src={signin} className="header__signin-icon" alt="Иконка авторизации" />
                Войти
              </Link>
            )}
            {isAuth && isAdmin === false && (
              <nav className="header__nav">
                <img src={profile} className="header__profile-icon" alt="Иконка профиля" />
                <p className="header__profile">Профиль</p>
                <ul className="header__profile-menu">
                  <li className="header__list text-m">
                    <Link to="/profile" onClick={() => dispatch(handleOrder())} className="header__menu-list">
                      Мои уборки
                    </Link>
                  </li>
                  <li className="header__list text-m">
                    <Link to="/profile" onClick={() => dispatch(handleProfile())} className="header__menu-list">
                      Личные данные
                    </Link>
                  </li>
                  <li className="header__list text-m" onClick={() => setShowExit(s => !s)}>
                    <p className="header__menu-list">Выход</p>
                    <ExitModal show={showExit} closeModal={() => setShowExit(false)} />
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
