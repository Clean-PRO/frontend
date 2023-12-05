import Checkbox from '../Checkbox/Checkbox'
import InputFilters from '../InputFilters/InputFilters'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Filters.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { setFiltred, setSearch, setCountFilters } from '../../store/order/orderSlice'
import { adminSelectors } from '../../store/admin/adminSelectors'

const Filters = ({ stateVisible }) => {
  const { handleSubmit, register, reset, watch } = useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    watch(data => countFields(data))
  }, [watch])

  const countFields = watchedFields => {
    let count = 0
    for (const key in watchedFields) {
      if (
        watchedFields[key] !== undefined &&
        watchedFields[key] !== '' &&
        watchedFields[key].length !== 0 &&
        watchedFields[key] !== false
      ) {
        if (Array.isArray(watchedFields[key])) {
          count += watchedFields[key].length
        } else {
          count++
        }
      }
    }
    dispatch(setCountFilters(count))
  }

  const linkView = useSelector(adminSelectors.getAdminTab)
  const orders = useSelector(orderSelectors.getAllOrders)

  const getUserOrders = () => {
    if (linkView === 'new') {
      return orders.filter(order => order.order_status === 'Создан')
    } else if (linkView === 'current') {
      return orders.filter(order => order.order_status === 'accepted')
    } else if (linkView === 'finished') {
      return orders.filter(order => order.order_status === 'finished')
    } else if (linkView === 'cancelled') {
      return orders.filter(order => order.order_status === 'cancelled')
    }
  }

  const userOrders = getUserOrders()

  useEffect(() => {
    reset({
      dateOrderStart: '',
      dateOrderEnd: '',
      dateCliningStart: '',
      dateCliningEnd: '',
      cleaningType: '',
      cancell: '',
      coastStart: '',
      coastEnd: '',
      extra: '',
    })
  }, [reset, linkView])

  const onSubmit = data => {
    const orders = cleaningTypeFilter(data, userOrders)
    const totalSum = rangeFilter(
      orders,
      [data.dateCliningStart, data.coastStart, data.dateOrderStart],
      [data.dateCliningEnd, data.coastEnd, data.dateOrderEnd],
      ['cleaning_date', 'total_sum', 'creation_date'],
    )
    const cancellOrders = cancelFilter(data, totalSum)
    const res = extraFilter(data.extra, cancellOrders)
    dispatch(setSearch(true))
    dispatch(setFiltred(res))
  }

  function rangeFilter(data, from, to, params) {
    let res = []
    for (let i = 0; i < params.length; i++) {
      if (from[i] && to[i]) {
        data.forEach(d => {
          if (from[i] <= d[params[i]] && d[params[i]] <= to[i]) {
            res.push(d)
          }
        })
        data = res
        res = []
        continue
      } else if (from[i] && !to[i]) {
        data.forEach(d => {
          if (from[i] <= d[params[i]]) {
            res.push(d)
          }
        })
        data = res
        res = []
        continue
      } else if (!from[i] && to[i]) {
        data.forEach(d => {
          if (d[params[i]] <= to[i]) {
            res.push(d)
          }
        })
        data = res
        res = []
        continue
      }
    }
    return data
  }

  function cleaningTypeFilter(data, userOrders) {
    const res = []
    if (data.cleaningType.length !== 0) {
      userOrders.forEach(userOrder => {
        if (data.cleaningType.includes(userOrder.cleaning_type.title)) {
          res.push(userOrder)
        }
      })
      return res
    } else {
      return userOrders
    }
  }

  function cancelFilter(data, userOrders) {
    const res = []
    if (data.cancell.length !== 0) {
      userOrders.forEach(userOrder => {
        if (data.cancell.includes(userOrder.comment_cancel)) {
          res.push(userOrder)
        }
      })
    } else {
      return userOrders
    }
    return res
  }

  function extraFilter(data, orders) {
    const res = []
    if (data) {
      orders.forEach(order => {
        if (order.services.length !== 0) {
          res.push(order)
        }
      })
    } else {
      return orders
    }
    return res
  }

  return (
    <div>
      {stateVisible === true && (
        <form className="filters" onSubmit={handleSubmit(onSubmit)}>
          <div className="filters__options">
            <div className="filters__dates">
              <div className="filters__registration">
                <p className="filters__title text-m-bold">Дата оформления</p>
                <div className="filters__inputs">
                  <InputFilters placeholder="c" {...register('dateOrderStart')} focus type="text" />
                  <InputFilters placeholder="по" {...register('dateOrderEnd')} focus type="text" />
                </div>
              </div>
              <div className="filters__cleaning">
                <p className="filters__title text-m-bold">Дата уборки</p>
                <div className="filters__inputs">
                  <InputFilters placeholder="c" {...register('dateCliningStart')} focus type="text" />
                  <InputFilters placeholder="по" {...register('dateCliningEnd')} focus type="text" />
                </div>
              </div>
            </div>
            <div className="filters__services">
              <p className="filters__title text-m-bold">Вид услуги</p>
              <div className="filters__checkbox">
                <Checkbox label="Поддерживающая" value="Поддерживающая" {...register('cleaningType')} />
                <Checkbox label="Генеральная" value="Генеральная" {...register('cleaningType')} />
                <Checkbox label="После ремонта" value="После ремонта" {...register('cleaningType')} />
                <Checkbox label="После праздника" value="После праздника" {...register('cleaningType')} />
                <Checkbox label="Окна" value="Окна" {...register('cleaningType')} />
              </div>
            </div>
            <div className="filters__cancelled">
              <p className="filters__title text-m-bold">Причина отмены</p>
              <div className="filters__checkbox">
                <Checkbox label="Изменились планы" value="Изменились планы" {...register('cancell')} />
                <Checkbox label="Сделали уборку сами" value="Сделали уборку сами" {...register('cancell')} />
                <Checkbox label="Нашли другого клинера" value="Нашли другого клинера" {...register('cancell')} />
                <Checkbox
                  label="Не могу изменить информацию о заказе"
                  value="Не могу изменить информацию о заказе"
                  {...register('cancell')}
                />
              </div>
            </div>
            <div className="filters__more">
              <div className="filters__price">
                <p className="filters__title text-m-bold">Стоимость</p>
                <div className="filters__inputs">
                  <InputFilters placeholder="от" {...register('coastStart')} type="number" />
                  <InputFilters placeholder="до" {...register('coastEnd')} type="number" />
                </div>
              </div>
              <div className="filters__extra">
                <p className="filters__title text-m-bold">Дополнительные услуги</p>
                <Checkbox {...register('extra')} label="Есть" value="false" />
              </div>
            </div>
          </div>
          <button className="filters__button text-m-bold">Применить</button>
        </form>
      )}
    </div>
  )
}

export default Filters
