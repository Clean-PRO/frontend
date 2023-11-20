import { useDispatch } from 'react-redux'
import './Counter.scss'
import IconMinus from '../../assets/images/IconMinus'
import IconPlus from '../../assets/images/IconPlus'

function Counter({ count, min, max, price = 0, setCount, index }) {
  const dispatch = useDispatch()
  function handleDecrement() {
    if (count > min) {
      dispatch(setCount({ step: -1, price: -price, index: index }))
    }
  }

  function handleIncrement() {
    if (count < max) {
      dispatch(setCount({ step: 1, price: price, index: index }))
    }
  }
  return (
    <div className="counter__container">
      <button className="btn-decrement" onClick={handleDecrement}>
        <IconMinus />
      </button>
      <span>{count}</span>
      <button className="btn-increment" onClick={handleIncrement}>
        <IconPlus />
      </button>
    </div>
  )
}

export default Counter
