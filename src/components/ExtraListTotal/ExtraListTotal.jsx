import './ExtraListTotal.scss'

import { useSelector } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'

function ExtraListTotal() {
  const orderData = useSelector(calculatorSelectors.getOrderForm)
  const list = orderData.services

  return (
    <div className="extra-list-total">
      {list.map((item, index) => (
        <>
          <div key={index} className="extra-list-total__extra-item">
            <p>{item.title}</p>
            <p>х{item.amount}</p>
          </div>
        </>
      ))}
    </div>
  )
}

export default ExtraListTotal
