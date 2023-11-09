import { createPortal } from 'react-dom'
import CheckCircle from '../../assets/images/CheckCircle'
import XCircle from '../../assets/images/XCircle'
import './Popup.scss'
import { useEffect, useState } from 'react'

function Popup({ error = false, content, condition }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (condition) {
      setIsVisible(true)
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [condition])

  return (
    <>
      {createPortal(
        <div className={`popup ${isVisible ? '' : 'hidden'}`}>
          <div className="popup__box">
            {error ? <XCircle /> : <CheckCircle />}
            <div className="popup__content">{content}</div>
          </div>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default Popup
