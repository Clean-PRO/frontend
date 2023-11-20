import './InputFilters.scss'
import { forwardRef } from 'react'

const InputFilters = forwardRef(({ placeholder, onChange, focus = false, type, ...rest }, ref) => {
  function handleFocus(e) {
    if (focus) e.target.setAttribute('type', 'date')
  }

  return (
    <div className="input-filters">
      <input
        placeholder={placeholder}
        onFocus={e => handleFocus(e)}
        type={type}
        onChange={onChange}
        className="input-filters__input text-s"
        ref={ref}
        {...rest}
      />
    </div>
  )
})

InputFilters.displayName = 'InputFilters'
export default InputFilters
