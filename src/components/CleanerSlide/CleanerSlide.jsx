import './CleanerSlide.scss'
import calcCleaningQuantity from '../../utils/calcCleaningQuantity'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'

function CleanerSlide({ slide }) {
  const { name, mark, image, quantity } = slide
  return (
    <>
      <div className="slide__title">
        <p className="slide__title-name">{name}</p>
        <div className="slide__rating">
          <p className="slide__mark">{mark}</p>
          <img className="slide__star" src={star} alt="" />
        </div>
      </div>
      <img className="slide__img" src={image} alt={name} />
      <p className="slide__quantity">{calcCleaningQuantity(quantity)}</p>
      <Link className="slide__order" to="/">
        Заказать уборку
      </Link>
    </>
  )
}

export default CleanerSlide
