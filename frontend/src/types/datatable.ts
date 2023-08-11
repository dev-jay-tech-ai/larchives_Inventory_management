export type Variants = {
  option: string
  price: number
  pricePurchase: number | null
  barcode: string
  inventory_quantity: number
}

export type Inventories = {
  inventory_item_id: number
  available: number
}

export type Sheetstocks = {
  barcode?: number
  countInStock?: number
}

export type CellRenderParams = {
  row: {
    productId: number
    title: string
    vendor: string
    variants: Variants[]
    inventories: Inventories[] 
    sheetstocks: Sheetstocks[]
    image: string
    status: string
    link: string
    update: string
    [key: string]: any   
  }
}

export type UserCols = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  // Add other columns as needed, ensuring that `headerName` is always a string
];
