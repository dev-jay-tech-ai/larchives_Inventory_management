import bcrypt from 'bcryptjs'
import { User } from './models/userModel'
import { Product } from './models/productModel'

export const sampleProducts: Product[] = [
  {
    productId: 7510476128414,
    title: 'AZA Point To Middle Hill Pumps',
    vendor: 'Jimmy Choo',
    image: 'https://cdn.shopify.com/s/files/1/0595/6275/4206/products/KakaoTalk_Image_2023-07-11-15-58-48_002.jpg?v=1689244261',
    variants: [
      { 
        variantId: 42660456530078,
        option: "Black / EU 34",
        price: 600.00,
        pricePurchase: 660.00,
        barcode: "L10034380IT",
        inventory_item_id: 44760682889374,
        inventory_quantity: 1
      },
      {
        variantId: 42660456562846,
        option: "Black / EU 34.5",
        price: 600.00,
        pricePurchase: 660.00,
        barcode: "L10034380IT",
        inventory_item_id: 44760682922142,
        inventory_quantity: 1
      }
    ], 
    link: 'https://smartstore.naver.com/lalalondon/products/5930518338'
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]