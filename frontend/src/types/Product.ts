
export type Variants = {
  variantId: number
  option: string
  price: number
  pricePurchase: number
  barcode: string
  inventory_quantity: number
  inventory_item_id: number
}

export type Inventory = {
  inventory_item_id: number
  available: number
}

export type SheetStock =  {
  title: string
  barcode: string
  color: string
  countInStock: number
  link: string
}

export type Product = {
  productId: number
  title: string
  vendor: string
  variants: Variants[]
  inventories: Inventory[]
  sheetstocks: SheetStock[]
  image: string
  link: string
}

export type ProductObj = {
  inventoryItemId: number
  qty: number
}