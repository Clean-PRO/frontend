import './Checkbox.scss'
import { forwardRef } from 'react'

const Checkbox = forwardRef(({ value, label, onChange, ...rest }, ref) => {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input className="checkbox__input" type="checkbox" onChange={onChange} ref={ref} {...rest} value={value} />
        {label}
      </label>
    </div>
  )
})
Checkbox.displayName = 'Checkbox'
export default Checkbox
