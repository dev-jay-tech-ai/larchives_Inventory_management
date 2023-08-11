import './list.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import UserTable from '../../components/datatable/Usertable'
import ProductTable from '../../components/datatable/Producttable'
import { useLocation } from 'react-router-dom'

const List: React.FC = () =>  {
  let path = useLocation()
  let list = path.pathname.split('/')[1]

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        { list === 'users' ? <UserTable /> :
          <ProductTable /> }
      </div>
    </div>
  )
}

export default List