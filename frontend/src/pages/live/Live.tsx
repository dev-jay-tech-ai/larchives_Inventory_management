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
  console.log(stockItems);
  const submitInsertHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if(stockItems) {
        setIsLoadingSubmit(true)
        const data:SheetData[] = orgData(stockItems)  
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
                <Button style={{ backgroundColor:'#6439ff', border:'none' }} onClick={submitInsertHandler}>Insert</Button>
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
            <th>Purchase Price</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
        {stockItems?.map((stockItem, index: number) => (
          <tr key={index}>
            <td>{ stockItem[1] }</td>
            <td>{ stockItem[2] }</td>
            <td>{ stockItem[3] }</td>
            <td>{ stockItem[5] }</td>
            <td>{ stockItem[6] }</td>
            <td>{ sheetId===String({VITE_WORKSHEET_ID_SHOES})? stockItem[8]:stockItem[7] }</td>
            <td>{ sheetId===String({VITE_WORKSHEET_ID_SHOES})? stockItem[9]:stockItem[8] }</td>
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