import banner from '../../assets/images/banner.jpg'
import './Banner.scss'

function Banner() {
  return (
    <div className="banner">
      <img src={banner} />
      <div className="banner-text">
        <p className="text-l text-blue">Клининговый сервис</p>
        <h2 className="text-blue">
          Позаботимся о чистоте, чтобы освободить <br />
          ваше время для любимого дела
        </h2>
      </div>
    </div>
  )
}

export default Banner
