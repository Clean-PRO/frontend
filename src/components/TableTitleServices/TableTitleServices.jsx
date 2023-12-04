import '../GridAdmin/GridAdmin.scss'

function TableTitleServices({ style, font = 'text-s' }) {
  return (
    <div className={`table-title-services grid-services ${style}`}>
      <p className={`grid-services__item ${font}`}>Название</p>
      <p className={`grid-services__item ${font}`}>Тип</p>
      <p className={`grid-services__item ${font}`}>Стоимость</p>
      <p className={`grid-services__item ${font}`}>Единица</p>
      <p className={`grid-services__item ${font}`}>Время,мин</p>
      <p className={`grid-services__item ${font}`}>Фото</p>
      <p className={`grid-services__item ${font}`}></p>
    </div>
  )
}

export default TableTitleServices
