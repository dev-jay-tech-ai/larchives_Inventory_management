import { ApiError } from './types/ApiError'
import { Sheet, SheetData } from './types/Sheet'

export const getError = (err: ApiError) => {
  return err.response && err.response.data.message
    ? err.response.data.message
    : err.message 
}

export const csvHeaders = [
  { label: 'Barcode', key: 'stock_code' },
  { label: 'Title', key: 'title' },
  { label: 'Colour', key: 'color' },
  { label: 'Purchase Price', key: 'pricePurchase' },
  { label: 'Qty', key: 'countInStock' },
  { label: 'Price', key: 'price' },
  { label: 'Link', key: 'link' },
];

export const orgData = (stockItems: Sheet[]): SheetData[] => {
  const targetIdx = {
    code: 0,
    title: 0,
    color: 0,
    // size: 0,
    pprice: 0,
    qty: 0,
    price: 0,
    link: 0,
  };
  stockItems && stockItems[0].forEach((item, idx) => {
    if (typeof item === 'string') {
      if (item.includes('코드')) targetIdx.code = idx;
      else if(item.includes('품명')) targetIdx.title = idx;
      else if(item.includes('컬러')) targetIdx.color = idx;
      // else if(item.includes('사이즈')) targetIdx.size = idx;
      else if(item.includes('구매')) targetIdx.pprice = idx;
      else if(item.trim() === '수량') targetIdx.qty = idx;
      else if(item.includes('판매가격')) targetIdx.price = idx;
      else if(item.includes('링크')) targetIdx.link = idx;
    }
  });
  return stockItems?.slice(1).map((stockItem) => {
    const data: SheetData = {}
    data.stock_code = String(stockItem[targetIdx.code])
    data.title = String(stockItem[targetIdx.title])
    data.color = String(stockItem[targetIdx.color])
    // data.size = String(stockItem[targetIdx.size])
    data.pricePurchase = String(stockItem[targetIdx.pprice])
    data.countInStock = String(stockItem[targetIdx.qty])
    data.price = String(stockItem[targetIdx.price])
    data.link = String(stockItem[targetIdx.link])
    return data;
  })
}