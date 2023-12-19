import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './inventory.scss'
import { 
  useGetProductsQuery, 
  useUpdateProductMutation, 
  useUpdateProductsMutation,
  useShopifyInventoryMutation
} from '../../hooks/productHooks'
import LoadingBox from '../../components/loading/LoadingBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import { MessageBox } from '../../components/MessageBox'
import { Product, Variants, ProductObj } from '../../types/Product'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { LinearProgress } from '@mui/material'

const Inventory = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const { mutateAsync: updateProduct } = useUpdateProductMutation()
  const { mutateAsync: updateProducts } = useUpdateProductsMutation()
  const { mutateAsync: shopifyInventory } = useShopifyInventoryMutation()
  const [ selected, setSelected ] = useState<ProductObj[]>([])
  const [ selectedAll, setSelectedAll ] = useState(false)
  const [ isLoadingSubmit, setIsLoadingSubmit ] = useState(false)

  const handleUpdate = async (id: number, qty: number) => {
    try {
      await updateProduct({ inventoryItemId: id, qty: qty });
      toast.success('Data Updated!')     
    } catch (err) {
      throw getError(error as ApiError);
    }
  }

  const handleCheckboxChange = (item: Variants, qty: number) => {
    const isSelected = selected.some((sel) => sel.inventoryItemId === item.inventory_item_id)
    try {
      if (isSelected) {
        setIsLoadingSubmit(true)
        setSelected(selected.filter((sel) => sel.inventoryItemId !== item.inventory_item_id))
      } else {
        setSelected([ ...selected, { inventoryItemId: item.inventory_item_id, qty: qty || 0 }])
      }
    } catch(err) {
      toast.error(getError(err as ApiError))
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const handleCheckedAll = () => {
    const productObjs: ProductObj[] = [];
    products?.forEach((product: Product) => {
      product.variants?.forEach((variant: Variants) => {
        const productObj: ProductObj = { inventoryItemId: variant.inventory_item_id, qty: 0 }
        product.sheetstocks?.forEach((stock) => {
          if (stock?.barcode === variant.barcode) productObj.qty = stock.countInStock;
        });
        productObjs.push(productObj);
      })
    });
    if(!selectedAll) setSelected(productObjs);
    else setSelected([])
    setSelectedAll(!selectedAll)
  }

  const HandleCheckedUpdate = async () =>  {
    if(selected.length === 0) {
      alert('Please Selcect At Least One Item')
      return;
    }
    try {
      await updateProducts(selected)
      toast.success('Data Updated!')    
    } catch (err) {
      throw getError(error as ApiError)
    }
  }

  const HandleShopifyInventoryUpdate = async () => {
    try {
      await shopifyInventory()
      toast.success('Data imported successfully!')
    } catch (err) {
      throw getError(error as ApiError)
    }
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar /> 
        <div className='listNav'>
          <Button 
            onClick={HandleCheckedUpdate}
          >Update Selection</Button>
          <Button
            onClick={HandleShopifyInventoryUpdate}
          >Import current inventory</Button>
        </div>
        {isLoadingSubmit ? <div className='progressionBar'><LinearProgress /></div> : ''}
        {isLoading ? <LoadingBox />
        : error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
        : 
        <table className='table'>
          <thead>
            <tr>
              <th>
                <input 
                  type='checkbox' 
                  onChange={handleCheckedAll}
                />
              </th>
              <th>Barcode</th>
              <th>Vendor</th>
              <th>Image</th>
              <th>Colour</th>
              <th>Size</th>
              <th>Price</th>
              <th>Purchase Price</th>
              <th>Prev Qty</th>
              <th>Shopify Qty</th>
              <th>Sheet Qty</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {products!.map((product: Product) =>
            product.variants!.map((variant, idx) => {
              let option = variant.option.split(' / ');
              const inventoryAvailable = product.inventories[idx]?.available;
              const sheetStockCount = product.sheetstocks[idx]?.countInStock;
              const isDifferent = inventoryAvailable !== sheetStockCount;
              return (
                <tr key={variant.variantId}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={ selected.some((sel: ProductObj) => sel.inventoryItemId === variant.inventory_item_id)}
                      onChange={() => handleCheckboxChange(variant, sheetStockCount)}
                    />
                  </td>
                  <td>{variant.barcode}</td>
                  <td>{product.vendor}</td>
                  <td>
                    <img 
                    src={product.image} 
                    alt={product.title} 
                    />{"  "}{product.title}</td>
                  <td>{option[0]}</td>
                  <td>{option[1]}</td>
                  <td>{variant.price}</td>
                  <td>{variant.pricePurchase}</td>
                  <td>{variant.inventory_quantity}</td>
                  <td>{inventoryAvailable}</td>
                  <td className={isDifferent ? 'different-value' : ''}>
                  {sheetStockCount}
                  </td>
                  <td>-</td>
                  <td><Button className='btn-small'
                  onClick={() => {handleUpdate(variant.inventory_item_id, sheetStockCount)}}>Update</Button></td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      }
      </div>
    </div>    
  )
}

export default Inventory