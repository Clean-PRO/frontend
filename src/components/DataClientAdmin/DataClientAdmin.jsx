import './DataClientAdmin.scss'

function DataClientAdmin({ user, address }) {
  return (
    <div>
      <p>{user.username}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <p>
        г. {address.city}, ул {address.street}, д.{address.house}, кв {address.apartment}, подъезд {address.entrance},
        этаж {address.floor}
      </p>
    </div>
  )
}

export default DataClientAdmin
