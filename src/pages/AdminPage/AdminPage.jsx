import AsideAdmin from '../../components/AsideAdmin/AsideAdmin'
import OfficeAdmin from '../../components/OfficeAdmin/OfficeAdmin'
import Footer from '../../components/Footer/Footer'
import CleanersAdmin from '../../components/CleanersAdmin/CleanersAdmin'
import CleanerCard from '../../components/CleanerCard/CleanerCard'
import CleanerAdd from '../../components/CleanerAdd/CleanerAdd'
import './AdminPage.scss'
import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import Statistics from '../../components/Statistics/Statistics'
import ServicesAdmin from '../../components/ServicesAdmin/ServicesAdmin'
import { useState } from 'react'
import CreateService from '../../components/CreateService/CreateService'

function AdminPage() {
  const linkView = useSelector(adminSelectors.getAdminNavLink)
  const [createService, setCreateService] = useState(false)

  function handleClickCreate() {
    setCreateService(() => !createService)
  }

  return (
    <>
      <section className="admin">
        <AsideAdmin />
        {linkView === 'orders' && <OfficeAdmin />}
        {linkView === 'services' && createService === false ? <ServicesAdmin onClick={handleClickCreate} /> : null}
        {linkView === 'services' && createService === true ? <CreateService onClick={handleClickCreate} /> : null}
        {linkView === 'packages' && <ServicesAdmin />}
        {linkView === 'staff' && <CleanersAdmin />}
        {linkView === 'cleanerCard' && <CleanerCard />}
        {linkView === 'newCleaner' && <CleanerAdd />}
        {linkView === 'statistics' && <Statistics />}
      </section>
      <Footer />
    </>
  )
}

export default AdminPage
