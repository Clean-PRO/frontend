import './InputField.scss'
import { forwardRef } from 'react'

const InputField = forwardRef(
  (
    {
      placeholder = '',
      size,
      type = 'text',
      focus = false,
      error = null,
      label,
      name,
      isValid,
      classNameModal,
      ...rest
    },
    ref,
  ) => {
    function handleFocus(e) {
      if (focus) e.target.setAttribute('type', 'date')
    }

    return (
      <div className={`input__wrapper ${type === 'password' ? 'input__wrapper__password' : ''}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          name={name}
          className={`form-input ${size === 'small' ? 'form-input-small' : ''} ${
            type === 'password' ? 'input__password' : ''
          } ${classNameModal} ${isValid ? '' : 'form-input__error'}`}
          placeholder={placeholder}
          type={type}
          onFocus={e => handleFocus(e)}
          ref={ref}
          {...rest}
        />
        {error && <span className="error-text">{error.message || 'Ошибка'}</span>}
      </div>
    )
  },
)

InputField.displayName = 'InputField'
export default InputField
