import './live.scss'
import { useSheetQuery, useSheetMutation } from "../../hooks/liveHooks"
import LoadingBox from '../../components/loading/LoadingBox'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { MessageBox } from '../../components/MessageBox'
import Modal from 'react-modal'
import moment from 'moment';
import { toast } from 'react-toastify'
import { CSVLink } from "react-csv"
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import { Button } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { csvHeaders, orgData } from '../../utils'
import { SheetData } from "../../types/Sheet"
import { LinearProgress } from '@mui/material'

const { 
  VITE_WORKSHEET_ID_CLOTH, 
  VITE_WORKSHEET_ID_BAG,
  VITE_WORKSHEET_ID_SHOES,
  VITE_WORKSHEET_ID_WALLET,
  VITE_WORKSHEET_ID_ACC,
  VITE_WORKSHEET_ID_SCARF
} = import.meta.env

const Live = () => {
  const [ sheetId, setSheetId ] = useState(String(VITE_WORKSHEET_ID_CLOTH))
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ isLoadingSubmit, setIsLoadingSubmit ] = useState(false)
  const { mutateAsync: transferSheetData } = useSheetMutation()
  const { data: stockItems, isLoading, error } = useSheetQuery(sheetId)
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null)
  type ColumnMappings = {
    [key: string]: number;
  };
  const col:ColumnMappings = {};
  stockItems && stockItems[0].forEach((item, idx) => {
    if (typeof item === 'string') {
      if (item.includes('코드')) col.code = idx;
      else if (item.includes('품명')) col.title = idx;
      else if (item.includes('컬러')) col.color = idx;
      else if (item.includes('사이즈')) col.size = idx;
      else if (item.includes('구매')) col.price_uk = idx;
      else if (item.trim() === '수량') col.qty = idx;
      else if (item.includes('판매가격')) col.price_kr = idx;
      else if (item.includes('링크')) col.link = idx;
    }
  });
  const submitInsertHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if(stockItems) {
        setIsLoadingSubmit(true)
        const data:SheetData[] = orgData(stockItems?.slice(1))  
        await transferSheetData({ data }) 
        toast.success('Data transfer successful!')
      }
    } catch(err) {
      toast.error(getError(err as ApiError))
    } finally {
      setIsLoadingSubmit(false)
    }
  }
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar /> 
        <div className='listTitle'>Sheet Stock<div>
            <Button onClick={() => setModalIsOpen(true)}>Export</Button>
            {modalIsOpen && 
            <Modal 
              isOpen={true}
              onRequestClose={() => setModalIsOpen(false)}
              style={{ content: { 
                height: '10rem',
                display: 'flex',
                flexDirection: 'column'
              } }}
              > 
              <div className='top' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button style={{ backgroundColor:'#6439ff', border:'none' }} onClick={() => csvLink.current?.link.click()}>CSV</Button>
                <CSVLink 
                  data={stockItems?orgData(stockItems):[]} 
                  headers={csvHeaders}
                  onClick={() => {
                    if (window.confirm('Do you want to download the csv file?')) return true;
                    else return false;
                  }}
                  filename={`Export_${moment().format('YYYYMMDD')}`} // 파일명 재고관리에 따라 변경하기
                  ref={csvLink}
                  target='_blank'
                />
                <Button style={{ backgroundColor:'#6439ff', border:'none' }} onClick={submitInsertHandler}>Insert into DB</Button>
                <Button style={{ backgroundColor:'#6439ff', border:'none' }} onClick={()=> setModalIsOpen(false)}>X</Button>
              </div>
              <div className='bottom' style={{ marginTop: '4rem' }}>
                {isLoadingSubmit ? <LinearProgress /> : ''}
              </div>
            </Modal>}
          </div>   
        </div>
        <div className='category'>
          <Button>Total</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_CLOTH))}>Clothe</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_BAG))}>Bag</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_SHOES))}>Shoes</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_WALLET))}>Wallet</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_ACC))}>Acc</Button>
          <Button onClick={() => setSheetId(String(VITE_WORKSHEET_ID_SCARF))}>Scarf</Button>
        </div>
        {isLoading? <LoadingBox />
        : error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
        : 
        <table className='table'>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Title</th>
            <th>Colour</th>
            <th>Size</th>
            <th>Purchase Price</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
        {stockItems?.slice(1).map((stockItem, index: number) => (
          <tr key={index}>
            <td>{stockItem[col.code]}</td>
            <td>{stockItem[col.title]}</td>
            <td>{stockItem[col.color]}</td>
            <td>{stockItem[col.size]}</td>
            <td>{stockItem[col.price_uk]}</td>
            <td>{stockItem[col.qty]}</td>
            <td>{stockItem[col.price_kr]}</td>
            <td>{stockItem[col.link]}</td>
          </tr>
        ))}
        </tbody>
      </table>
      }
      </div>
    </div>  
  )
}

export default Live