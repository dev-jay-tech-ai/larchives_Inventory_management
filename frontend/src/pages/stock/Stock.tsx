import './stock.scss'
import { useStockQuery } from "../../hooks/stockHooks"
import LoadingBox from '../../components/loading/LoadingBox'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { MessageBox } from '../../components/MessageBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'

interface StockItem {
  title: string;
  vendor: string;
  variants: Variant[];
}

interface Variant {
  barcode: string;
  inventory_quantity: number;
}

const Stock = () => {
  const { data: stock, isLoading, error } = useStockQuery()

  return (
    <div className='list'>
    <Sidebar />
    <div className='listContainer'>
      <Navbar /> 
      {isLoading? <LoadingBox />
      : error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
      : 
      <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Vendor</th>
          <th>Opition 1</th>
          <th>Opition 1 qty</th>
          <th>Opition 2</th>
          <th>Opition 2 qty</th>
        </tr>
      </thead>
      <tbody>
      {stock!.map((item: StockItem, index: number) => (
        <tr key={index}>
          <td>{item.title}</td>
          <td>{item.vendor}</td>
          <td>{item.variants[0].barcode}</td>
          <td>{item.variants[0].inventory_quantity}</td>
          <td>{item.variants[1]? item.variants[1].barcode: ''}</td>
          <td>{item.variants[1]? item.variants[1].inventory_quantity: ''}</td>
          </tr>
          ))}
        </tbody>
      </table>
      }
      </div>
    </div>  
  )
}

export default Stock