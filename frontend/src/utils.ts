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
  return stockItems.map((stockItem, index: number) => {
    const data: SheetData = {};
    data.stock_code = stockItems[index][1];
    data.title = stockItems[index][2];
    data.color = stockItems[index][3];
    data.pricePurchase = String(stockItems[index][5]);
    data.countInStock = stockItems[index][6];
    data.price = stockItems[index][7];
    data.link = stockItems[index][8];
    return data;
  });
};