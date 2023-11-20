import './Filter.scss'
import { useSelector } from 'react-redux'
import filter from '../../assets/images/filter.svg'
import { orderSelectors } from '../../store/order/orderSelectors'

function Filter({ onClick }) {
  const countFilters = useSelector(orderSelectors.getCountFilters)

  return (
    <div onClick={onClick} className="filter">
      <img className="filter__icon" src={filter} alt="Фильтр" />
      <p className="filter__text text-m">Фильтры</p>
      <p className="filter__count filter__count_style_background">{countFilters}</p>
    </div>
  )
}

export default Filter
