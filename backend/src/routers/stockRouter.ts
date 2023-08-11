import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import request from 'request'
import dotenv from 'dotenv'
import * as fs from 'fs';
dotenv.config()

const { SHOPIFY_API_KEY, SHOPIFY_ACCESS_TOKEN } = process.env

export const stockRouter = express.Router()
// /api/stock/
let options = {
 'method' : 'GET',
 'url' : `https://${SHOPIFY_API_KEY}:${SHOPIFY_ACCESS_TOKEN}@privaeuk.myshopify.com/admin/api/2023-04/products.json?limit=250&page_info=eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NzUwODA2NTk0MzcxMCwibGFzdF92YWx1ZSI6IldvbWVuJ3MgQWxsIE92ZXIgQ3J5c3RhbCBUcmlhbmdsZSBMb2dvIENodW5reSBMb3BwZXIifQ`,
 'headers' : {
  'Content-Type': 'application/json'
 }
}

stockRouter.get('/shopify_products',
  asyncHandler(async () => {
    try {
      request(options, (err, resp) => {
        if(err) throw new Error(err)
        fs.writeFileSync('products_6.json',resp.body);
        // console.log(resp.headers)
      })
    } catch(err) {
      console.error(err)
    }
  })
)

stockRouter.get('/shopify',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      request(options, (err, resp) => {
        if(err) throw new Error(err)
        // Parse the response body as JSON
        const responseBody = JSON.parse(resp.body);
        // Extract the "products" array from the response body
        const productsArray = responseBody.products;
        // Send only the "products" array to the client
        res.json(productsArray);
      })
    } catch(err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
)