import { useForm, useController } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../InputField/InputField'
import InputFieldDate from '../InputFieldDate/InputFieldDate'
import Select from 'react-select'
import { formOrderValidationSelectors } from '../../store/formOrderValidation/formOrderValidationSelectors'
import { safeOrderForm } from '../../store/calculator/calculatorSlice'
import { ROUTES, TIME_OPTIONS } from '../../constants/constants'
import { customerStylesSelect } from '../../assets/styles/customerStylesSelect'
import './OrderForm.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { authSelectors } from '../../store/auth/authSelectors'
import { useEffect, useState } from 'react'
import { resetRepeatedOrder } from '../../store/order/orderSlice'
import FetchAPI from '../../utils/fetchAPI'
import AuthModal from '../Modal/AuthModal/AuthModal'
import { useNavigate } from 'react-router-dom'
import { PATTERNS } from '../../utils/validation'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { createOrder } from '../../store/order/orderActions'
import { InputMask } from '@react-input/mask'
import myMask from '../../utils/myPhoneMask'

const defaults = {
  username: '',
  email: '',
  phone: '',
  city: 'Москва',
  street: '',
  house: '',
  apartment: '',
  entrance: '',
  floor: '',
}

function OrderForm() {
  const dispatch = useDispatch()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [code, setCode] = useState('')

  const stateDate = useSelector(formOrderValidationSelectors.getStateDate)
  const userData = useSelector(authSelectors.getUser)
  const repeatedOrder = useSelector(orderSelectors.getRepeatedOrder)
  const types = useSelector(calculatorSelectors.getTypes)
  const isAuth = useSelector(authSelectors.getIsAuth)
  const cleaningType = useSelector(calculatorSelectors.getCleanType)
  const total = useSelector(calculatorSelectors.getTotal)
  const extra = useSelector(calculatorSelectors.getExtras)
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaults,
  })

  useEffect(() => {
    if (userData) {
      reset({
        username: userData?.username,
        email: userData?.email,
        phone: myMask(userData?.phone),
        street: userData?.address?.street,
        house: repeatedOrder?.address?.house || userData?.address?.house,
        apartment: repeatedOrder?.address?.apartment || userData?.address?.apartment,
        entrance: repeatedOrder?.address?.entrance || userData?.address?.entrance,
        floor: repeatedOrder?.address?.floor || userData?.address?.floor,
      })
    }
    if (!userData && !repeatedOrder) {
      reset(defaults)
    }
  }, [userData, repeatedOrder, reset])

  const required = 'Обязательное поле'

  const requestCode = async email => {
    try {
      const resCode = await FetchAPI.post('/users/confirm_email/', { body: { email } })
      return resCode
    } catch (err) {
      console.log(err.message)
    }
  }

  const openConfirmEmail = async email => {
    try {
      const fetchCode = await requestCode(email)
      setCode(fetchCode.confirm_code)
      setShowAuthModal(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (repeatedOrder) dispatch(resetRepeatedOrder())
    }
  }, [repeatedOrder, dispatch, types])

  const onSubmit = data => {
    const {
      username,
      email,
      phone,
      city,
      street,
      house,
      apartment,
      entrance,
      floor,
      cleaning_date,
      cleaning_time,
      comment,
    } = data

    const services = extra.filter(item => item.amount > 0).map(item => ({ id: item.id, amount: item.amount }))
    const body = {
      user: { username, email, phone },
      address: { city, street, house, apartment, entrance, floor },
      total_time: 3,
      cleaning_date,
      cleaning_time,
      comment,
      total_sum: total,
      cleaning_type: cleaningType,
      services,
      rooms_number: rooms,
      bathrooms_number: toilets,
    }
    dispatch(safeOrderForm(body))

    if (isAuth) {
      dispatch(createOrder(body))
        .unwrap()
        .then(() => navigate(ROUTES.PAYMENT))
        .catch(() => console.log('Order was not created'))
    } else {
      setShowAuthModal(true)
      openConfirmEmail(email)
    }

    reset()
  }

  const { field } = useController({ name: 'cleaning_time', control })
  const { value: slotValue, onChange: timeOnChange, ...restTimeField } = field

  return (
    <>
      <AuthModal show={showAuthModal} closeModal={setShowAuthModal} code={code} requestCode={requestCode} />
      <form className="form__order" onSubmit={handleSubmit(onSubmit)}>
        {/* -------------------------------------USERNAME--------------------------------- */}
        <InputField
          isValid={!errors?.username}
          readOnly={!!userData?.username}
          label="Имя"
          {...register('username', {
            required,
            minLength: 2,
            maxLength: {
              value: 60,
              message: 'Максимум 60 символов',
            },
            pattern: PATTERNS.USERNAME,
          })}
          error={errors?.username}
        />
        {/* -------------------------------------EMAIL--------------------------------- */}
        <InputField
          isValid={!errors?.email}
          readOnly={!!userData?.email}
          type="email"
          id="input-email"
          label="E-mail"
          placeholder="example@example.ru"
          {...register('email', {
            required,
            minLength: 5,
            maxLength: {
              value: 50,
              message: 'Максимум 50 символов',
            },
            pattern: PATTERNS.EMAIL,
          })}
          error={errors?.email}
        />
        {/* -------------------------------------PHONE--------------------------------- */}
        <InputMask
          onClick={e => {
            e.target.value ? null : (e.target.value = '+7 (')
          }}
          isValid={!errors?.phone}
          readOnly={!!userData?.phone}
          type="text"
          label="Телефон"
          placeholder="+7 (999) 999-99-99"
          {...register('phone', {
            required,
            minLength: 10,
            pattern: PATTERNS.PHONE,
          })}
          error={errors?.phone}
          separate
          component={InputField}
          mask="+7 (___) ___-__-__"
          replacement="_"
        />
        {/* -------------------------------------ГОРОД--------------------------------- */}
        <InputField
          isValid={!errors?.city}
          readOnly
          placeholder="Москва"
          label="Город"
          {...register('city', {})}
          error={errors?.city}
        />
        {/* -------------------------------------УЛИЦА--------------------------------- */}
        <InputField
          isValid={!errors?.street}
          label="Улица"
          {...register('street', {
            required,
            maxLength: {
              value: 150,
              message: 'Максимум 150 символов',
            },
          })}
          error={errors?.street}
        />
        <div className="inputs_wrapper">
          {/* -------------------------------------ДОМ--------------------------------- */}
          <InputField
            isValid={!errors?.house}
            size="small"
            label="Дом"
            {...register('house', {
              required,
              pattern: {
                value: /([\d]+[/]?[\d]?[А-Яа-яA-Za-z]?){1}/,
                message: 'Должна быть хоть бы одна  цифра',
              },
              maxLength: {
                value: 60,
                message: 'Максимум 60 символов',
              },
            })}
            error={errors?.house}
          />
          {/* -------------------------------------КВАРТИРА--------------------------------- */}
          <InputField
            isValid={!errors?.apartment}
            size="small"
            label="Квартира"
            {...register('apartment', {
              required,
              max: {
                value: 9999,
                message: 'Максимальное значение 9999',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
            error={errors?.apartment}
          />
          {/* -------------------------------------ПОДЪЕЗД--------------------------------- */}
          <InputField
            isValid={!errors?.entrance}
            size="small"
            label="Подъезд"
            {...register('entrance', {
              required,
              max: {
                value: 99,
                message: 'Максимальное значение 99',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
            error={errors?.entrance}
          />
          {/* -------------------------------------ЭТАЖ--------------------------------- */}
          <InputField
            isValid={!errors?.floor}
            size="small"
            label="Этаж"
            {...register('floor', {
              required,
              max: {
                value: 99,
                message: 'Максимальное значение 99',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
            error={errors?.floor}
          />
          {/* -------------------------------------ДАТА--------------------------------- */}
          <div className="inputs_wrapper-field">
            <InputFieldDate
              isValid={!errors?.cleaning_date && stateDate == true}
              size="small"
              focus
              label="Дата"
              placeholder="__/__/____"
              {...register('cleaning_date', {
                required,
              })}
            />
            {(errors?.cleaning_date || stateDate == false) && (
              <span className="error-text">{errors?.cleaning_date?.message || 'Выберите корректную дату'}</span>
            )}
          </div>

          {/* -------------------------------------ВРЕМЯ--------------------------------- */}
          <div className="inputs_wrapper-field">
            <label>Время</label>
            <Select
              styles={customerStylesSelect(errors?.cleaning_time)}
              className="select-time select-time_style_border"
              classNamePrefix="select-time"
              ref={register('cleaning_time', {
                required,
              })}
              placeholder={''}
              options={TIME_OPTIONS}
              components={{
                IndicatorSeparator: () => null,
              }}
              value={slotValue ? TIME_OPTIONS.find(x => x.value === slotValue) : slotValue}
              onChange={option => timeOnChange(option ? option.value : option)}
              {...restTimeField}
            />
            {errors?.cleaning_time && <span className="error-text">{errors?.cleaning_time?.message || 'Ошибка'}</span>}
          </div>
        </div>
        <div>
          <label>Комментарий</label>
          <textarea
            className="order-comment"
            placeholder="Комментарии к заказу (например, имеется аллергия на чистящие средства или необходимо забрать вещи из химчистки)"
            {...register('comment', {
              maxLength: {
                value: 250,
                message: 'Максимум 250 символов',
              },
            })}
          />
          {errors?.comment && <span className="error-text">{errors?.comment?.message || 'Ошибка'}</span>}
        </div>
        <button type="submit" className="form-btn">
          Заказать
        </button>
        <p>Нажимая «Заказать», я даю согласие на Обработку персональных данных и Договор оферты</p>
      </form>
    </>
  )
}

export default OrderForm
