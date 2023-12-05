import './OfficeAdmin.scss'
import '../Headings/Headings.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import Filter from '../Filter/Filter'
import Table from '../Table/Table'
import UploadButton from '../UploadButton/UploadButton'
import Headings from '../Headings/Headings'
import { headings } from '../../utils/headingsData'
import { orderSelectors } from '../../store/order/orderSelectors'
import * as XLSX from 'xlsx'

function OfficeAdmin() {
  const dispatch = useDispatch()

  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)
  function handleToggleClick() {
    setVisibleFieldFilters(filters => !filters)
  }
  const filter = useSelector(orderSelectors.getFiltred)
  function exportData() {
    const sheet = XLSX.utils.aoa_to_sheet([
      [
        'Имя',
        'Телефон',
        'Почта',
        'Город',
        'Улица',
        'Дом',
        'Квартира',
        'Подъезд',
        'Этаж',
        'Вид услуги',
        'Время уборки',
        'Стоимость',
      ],
    ])
    let rowIndex = 2

    const workbook = XLSX.utils.book_new()
    filter.forEach(item => {
      const rowData = [
        item.user.username,
        item.user.phone,
        item.user.email,
        item.address.city,
        item.address.street,
        item.address.house,
        item.address.apartment,
        item.address.entrance,
        item.address.floor,
        item.cleaning_type.title,
        item.cleaning_date,
        item.total_sum,
      ]
      XLSX.utils.sheet_add_aoa(sheet, [rowData], { origin: `A${rowIndex}` })
      rowIndex++
    })
    XLSX.utils.book_append_sheet(workbook, sheet, 'Orders')
    XLSX.writeFile(workbook, 'Orders.xlsx')
  }

  return (
    <section className="office">
      <div className="headings">
        {headings.map(h => (
          <Headings
            key={h.id}
            onClick={() => dispatch(h.handleClick)}
            tab={h.handleTab}
            title={h.title}
            count={h.count}
          />
        ))}
      </div>
      <div className="office__field-search">
        <div className="office__data-search">
          <div className="office__search">
            <div className="office__search-flex">
              <Search />
              <Filter onClick={handleToggleClick} />
            </div>
            <UploadButton text="Выгрузить данные" onClick={exportData} />
          </div>
          <Filters stateVisible={visibleFieldFilters} />
        </div>
      </div>
      <Table />
    </section>
  )
}

export default OfficeAdmin
