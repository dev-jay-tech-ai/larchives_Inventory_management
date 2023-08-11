/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Express {
  export interface Request {
    Inventory: {
      inventoryItemId: number;
      qty?: number;
    }

    ProductData: {
      id: number;
      title: string;
      vendor: string;
      variants: Variants[];
      image: Image;
      link: string;
    }
  }

  interface Variants {
    id: number;
    title: string;
    option: string;
    price: number;
    pricePurchase: number;
    barcode: string;
    inventory_quantity: number;
    inventory_item_id: number;
  }

  interface Image {
    src: string;
  }
}
