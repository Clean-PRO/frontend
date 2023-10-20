import './ExitModal.scss'
import '../Modal.scss'

import Button from '../../Button/Button'
import { logOut } from '../../../store/auth/authActions'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'

function ExitModal({ show, closeModal }) {
  if (!show) return null
  const dispatch = useDispatch()
  return (
    <>
      {createPortal(
        <div className="modal">
          <div className="modal__wrapper">
            <p className="text-l">Вы уверены, что хотите выйти?</p>
            <Button
              buttonText="Выйти"
              buttonClassName="button button__modal-indent"
              onClick={() => dispatch(logOut())}
            />
            <button className="modal__cancell text-m-bold" onClick={() => closeModal}>
              Отменить
            </button>
          </div>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default ExitModal
