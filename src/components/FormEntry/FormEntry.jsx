import { useSelector, useDispatch } from 'react-redux'
import { handleClickEntry, handleClickRecovery, handleClickRegistration } from '../../store/formEntry/formEntrySlice'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import { formEntrySelectors } from '../../store/formEntry/formEntrySelectors'
import { authSelectors } from '../../store/auth/authSelectors'
import './FormEntry.scss'
import { registration, signInUser } from '../../store/auth/authActions'
import { useEffect } from 'react'
import { PATTERNS } from '../../utils/validation'
import Popup from '../Popup/Popup'
import { resetSignInError, resetSignUpError } from '../../store/auth/authSlice'

const defaults = {
  email: '',
  password: '',
}

function FormEntry() {
  const dispatch = useDispatch()

  const viewForm = useSelector(formEntrySelectors.getFormView)
  const signUpError = useSelector(authSelectors.getSignUpError)
  const signInError = useSelector(authSelectors.getSignInError)

  const {
    register,
    handleSubmit,
    clearErrors,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaults,
  })

  const handleEntry = () => dispatch(handleClickEntry())
  const handleRecovery = () => dispatch(handleClickRecovery())
  const handleRegistration = () => dispatch(handleClickRegistration())

  useEffect(() => {
    dispatch(resetSignUpError())
    dispatch(resetSignInError())
  }, [dispatch])

  useEffect(() => {
    reset(defaults)
  }, [reset, viewForm])

  useEffect(() => {
    dispatch(handleClickRegistration())
  }, [dispatch])

  const onSubmit = data => {
    if (viewForm === 'registration') dispatch(registration(data))
    if (viewForm === 'entry') dispatch(signInUser(data))
    //TODO action recovery
    // if (viewForm === 'recovery')
    reset(defaults)
  }

  return (
    <section className="form-entry">
      <form action="" className="form-entry__container" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form-entry__content">
          {viewForm === 'registration' && (
            <div className="form-entry__wrapper-title">
              <div className="form-entry__title-container">
                <p className="form-entry__title form-entry__title_active">Регистрация</p>
              </div>
              <div className="form-entry__title-container">
                <p
                  onClick={() => {
                    handleEntry()
                    clearErrors()
                  }}
                  className="form-entry__title">
                  Вход
                </p>
              </div>
            </div>
          )}
          {viewForm === 'entry' && (
            <div className="form-entry__wrapper-title">
              <div className="form-entry__title-container">
                <p
                  onClick={() => {
                    handleRegistration()
                    clearErrors()
                  }}
                  className="form-entry__title ">
                  Регистрация
                </p>
              </div>

              <div className="form-entry__title-container">
                <p className="form-entry__title form-entry__title_active">Вход</p>
              </div>
            </div>
          )}
          {viewForm === 'recovery' && <p className="form-entry__title-recovery">Восстановление пароля</p>}

          <div className="form-entry__input-container">
            <InputField
              isValid={!getFieldState('email').invalid}
              type="email"
              label="Почта"
              {...register('email', {
                required: { value: true, message: 'Заполните все поля.' },
                pattern: PATTERNS.EMAIL,
                maxLength: {
                  value: 30,
                  message: 'Недопустимая длина',
                },
                minLength: {
                  value: 5,
                  message: PATTERNS.EMAIL.message,
                },
              })}
              error={errors?.email}
            />
            {(viewForm === 'registration' || viewForm === 'entry') && (
              <div className="form-enter__wrapper-input">
                <InputField
                  isValid={!getFieldState('password').invalid}
                  type="password"
                  label="Пароль"
                  {...register('password', {
                    required: { value: true, message: 'Заполните все поля.' },
                    pattern: PATTERNS.PASSWORD,
                  })}
                  error={errors?.password}
                />
              </div>
            )}
          </div>
          <div className="form-entry__button-container">
            {viewForm === 'registration' && (
              <Button buttonText={'Зарегистрироваться'} buttonClassName="button" type="submit" />
            )}
            {viewForm === 'entry' && <Button buttonText={'Войти'} buttonClassName="button" type="submit" />}
            {viewForm === 'recovery' && (
              <Button buttonText={'Восстановить пароль'} buttonClassName="button button__recovery" type="submit" />
            )}
          </div>
          {viewForm === 'registration' && (
            <p className="form-entry__acceptance">
              Нажимая «Зарегистрироваться», я даю согласие на обработку персональных данных.
            </p>
          )}
          {viewForm === 'entry' && (
            <p
              onClick={() => {
                handleRecovery()
                clearErrors()
              }}
              className="form-entry__password-recovery">
              Забыли пароль?
            </p>
          )}
          {viewForm === 'recovery' && (
            <>
              <p className="form-entry__recovery-text">
                Мы отправим письмо со ссылкой для восстановления пароля на указанную почту.
              </p>
              <p
                onClick={() => {
                  handleEntry()
                  clearErrors()
                }}
                className="form-entry__password-recovery">
                Вернуться к авторизации
              </p>
            </>
          )}
        </div>
      </form>
      {signUpError && <Popup error content={signUpError?.email?.[0]} condition={signUpError} />}
      {signInError && <Popup error content={signInError?.non_field_errors?.[0]} condition={signInError} />}
    </section>
  )
}

export default FormEntry
