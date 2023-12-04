import './UploadButton.scss'

function UploadButton({ text, onClick, icon }) {
  return (
    <button type="text" className={`upload text-m`} onClick={() => onClick()}>
      {icon && <img src={icon} className="upload__img" alt="" />}
      {text}
    </button>
  )
}

export default UploadButton
