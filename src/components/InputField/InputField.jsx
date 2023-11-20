import './InputField.scss'
import { forwardRef, useState } from 'react'

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
    const [inputType, setInputType] = useState(type)

    function handleFocus() {
      if (focus) setInputType('date')
    }
    function handleShowPassword() {
      setInputType(type => (type === 'text' ? 'password' : 'text'))
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
          type={inputType}
          onFocus={e => handleFocus(e)}
          ref={ref}
          {...rest}
        />
        {type === 'password' && (
          <span
            onClick={handleShowPassword}
            className={`show-password ${inputType === 'text' ? 'unvisible' : ''}`}></span>
        )}
        {error && <span className="error-text">{error.message || 'Ошибка'}</span>}
      </div>
    )
  },
)

InputField.displayName = 'InputField'
export default InputField
