import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetRooms, setCleanType, setTotal } from '../../store/calculator/calculatorSlice'
import Logo from '../Logo/Logo'
import './Footer.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'

const Footer = () => {
  const dispatch = useDispatch()

  const types = useSelector(calculatorSelectors.getTypes)

  function handleClick(num) {
    dispatch(resetRooms())
    dispatch(setCleanType(num))
    dispatch(setTotal(types.filter(card => card.id === num)[0]?.price))
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-wrapper">
          <Logo />
        </div>
        <div className="footer__column">
          <h4 className="footer__title text-l">Уборка</h4>
          <div className="footer__column">
            {types.map((type, index) => (
              <Link onClick={() => handleClick(index + 1)} to="/#calculator" key={type.title} className="footer__link">
                {type.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer__column">
          <h4 className="footer__title  text-l">Компания</h4>
          <Link to="/about/#about" className="footer__link">
            О компании
          </Link>
          <Link to="/about/#cleaners" className="footer__link">
            Клинеры
          </Link>
          <Link to="/about/#comments" className="footer__link">
            Отзывы
          </Link>
          <Link to="/#faq" className="footer__link">
            Частые вопросы
          </Link>
        </div>
        <div className="footer__column">
          <h4 className="footer__title text-l">Контакты</h4>
          <a href="tel:+74957839900" className="footer__link">
            +7 (495) 783-99-00
          </a>
        </div>
        <div></div>
      </div>
    </footer>
  )
}

export default Footer
