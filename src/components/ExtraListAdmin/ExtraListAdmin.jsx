import './ExtraListAdmin.scss'

function ExtraListAdmin({ services }) {
  return (
    <div className="extra-list">
      {services?.map(s => (
        <div  key={s.id} className="extra-list__item">
          <p className="extra-list__service">{s.title}</p>
          <p className="extra-list__quantity">&#215; {s.amount}</p>
        </div>
      ))}
    </div>
  )
}

export default ExtraListAdmin
