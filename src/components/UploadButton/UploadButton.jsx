import './UploadButton.scss'

function UploadButton({ text, onClick }) {
  return (
    <button type="text" className="upload text-m" onClick={onClick}>
      {text}
    </button>
  )
}

export default UploadButton
