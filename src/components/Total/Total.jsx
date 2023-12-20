import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './Total.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import getTotalString from '../../utils/getTotalString'
import ExtraListTotal from '../ExtraListTotal/ExtraListTotal'

function Total({ total, roomsTotal, toiletsTotal, orderData }) {
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)
  const location = useLocation().pathname

  return (
    <div className="calculator-form__total">
      <p className="text-l-bold">
        {`Уборка квартиры с 
			${roomsTotal == undefined ? rooms : roomsTotal} ${roomsTotal || rooms === 1 ? 'жилой комнатой' : 'жилыми комнатами'} 			
			и 
			${toiletsTotal == undefined ? toilets : toiletsTotal} ${toiletsTotal || toilets === 1 ? 'санузлом' : 'санузлами'}			
			`}
      </p>
      <div className="calculator-form__extra-list">
        <div>{location === '/payment' && <ExtraListTotal orderData={orderData} />}</div>
      </div>
      <div className="total__wrapper">
        <h1 className="text-black">{`${total ? getTotalString(total) : 0} ₽`}</h1>
        <span className="text-l">≈ 2ч 10мин</span>
      </div>
    </div>
  )
}

export default Total
