export type Sheet = [
  string,      // ID
  string,      // Description
  string,      // Color
  string,      // Size
  number,      // Purchase price
  number,      // Count in stock
  string,      // Price
  string,      // Link
  string,      // Brand
  string,      // Date in
  string,      // Date out
]

export type SheetData =  {
  stock_code?: string
  title?: string
  color?: string
  size?: string
  pricePurchase?: string
  countInStock?: string
  price?: string
  link?: string
  brand?: string
  date_in?: string
  date_out?: string
} 