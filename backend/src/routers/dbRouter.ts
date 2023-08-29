import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import request from 'request'
import dotenv from 'dotenv'
import * as fs from 'fs';
import { Product, ProductModel } from '../models/productModel';
import { Inventory, InventoryModel } from '../models/inventoryModel';
dotenv.config()
const { SHOPIFY_API_KEY, SHOPIFY_LOCATION_ID, SHOPIFY_ACCESS_TOKEN } = process.env
export const dbRouter = express.Router()

const totalProductsJSON:Product[] = []
const productsUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_ACCESS_TOKEN}@privaeuk.myshopify.com/admin/api/2023-04/`
// Use the route handler for the /insert endpoint
const insertProducts = async (req: Request, res: Response) => {
  const options = {
    'method' : 'GET',
    'url' : productsUrl + 'products.json?limit=250',
    'headers' : {
    'Content-Type': 'application/json'
    }
  }

  try {
    await makeRequest(options.url, 'products')
    
    const dataBuffer = fs.readFileSync('products_250_7.json');
    const dataJSON: Request['ProductData'][] = JSON.parse(dataBuffer.toString()).products;
    // Loop through each product in dataJSON
    for (const data of dataJSON) {
      const product = await ProductModel.create({
        productId: data.id,
        title: data.title,
        image: data.image.src,
        vendor: data.vendor,
        variants: data.variants.map((variant) => ({
          variantId: variant.id,
          option: variant.title,
          price: variant.price,
          pricePurchase: null,
          barcode: variant.barcode,
          inventory_item_id: variant.inventory_item_id,
          inventory_quantity: variant.inventory_quantity,
        })),
      });

      // Log the inserted product (optional)
      console.log('Inserted product:', product);
    }

    res.json({ message: 'Products inserted successfully' });
  } catch (err) {
    console.error('Error inserting products:', err);
    res.status(500).json({ error: 'Something went wrong' });
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

const insertProduct = async (req: Request, res: Response) => {
  try {
    const dataBuffer = fs.readFileSync('products_250_5_val.json');
    const data = JSON.parse(dataBuffer.toString()).product;
    // console.log(data)
    // Loop through each product in dataJSON
    const product = await ProductModel.create({
      productId: data.id,
      title: data.title,
      image: data.image.src,
      vendor: data.vendor,
      variants: data.variants.map((variant: Variants) => ({
        variantId: variant.id,
        option: variant.title,
        price: variant.price,
        pricePurchase: null,
        barcode: variant.barcode,
        inventory_item_id: variant.inventory_item_id,
        inventory_quantity: variant.inventory_quantity,
      })),
    });

    // Log the inserted product (optional)
    console.log('Inserted product:', product);
    res.json({ message: 'Products inserted successfully' });
  } catch (err) {
    console.error('Error inserting products:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
const totalIventoryJSON:Inventory[] = []
const inventoryUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_ACCESS_TOKEN}@privaeuk.myshopify.com/admin/api/2023-04/locations/${SHOPIFY_LOCATION_ID}/`;

const makeRequest = (link: string, target: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const fetchNextLink = (nextLink: string) => {
      console.log('다음 이동 링크', nextLink)
      request.get(nextLink, (err, resp) => {
        if (err) {
          reject(err); // Reject the promise if there's an error with the request
        } else {
          const responseBody = JSON.parse(resp.body);
          let targetArray;
          if(target === 'inventory') {
            targetArray = responseBody.inventory_levels;
            totalIventoryJSON.push(...targetArray);
          } else {
            targetArray = responseBody.inventory_levels;
            totalProductsJSON.push(...targetArray);
          }
          const headerLink = resp.headers['link'];
          const match = headerLink && headerLink[0].match(/<[^;]+\/(\w+\.json[^;]+)>;\srel="next"/);
          const nextLink = match ? 
            target === 'inventory' ? inventoryUrl + match[1] : productsUrl + match[1]
            : false;
          if (nextLink) {
            fetchNextLink(nextLink); // Fetch the next link recursively
          } else {
            resolve(); // Resolve the promise if there's no "next" link
          }
        }
      })
    }
    fetchNextLink(link); // Start fetching recursively from the provided link
  })
}

const insertInventory = async (req: Request, res: Response) => {
  const options = {
    'method' : 'GET',
    'url' : inventoryUrl + 'inventory_levels.json?limit=250',
    'headers' : {
    'Content-Type': 'application/json'
    }
  }

  try {
    // Call makeRequest and wait for all the data to be fetched
    await makeRequest(options.url, 'inventory')
    for (const data of totalIventoryJSON) {
      await InventoryModel.findOrCreateByItemId(data.inventory_item_id, {
      available: data.available })
    }
    res.status(200).json("All inventory data fetched!");
    // The rest of your code to insert inventory data into the database goes here
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Use the route handler for the /insert endpoint
dbRouter.get('/insert/single', asyncHandler(insertProduct));
dbRouter.get('/insert', asyncHandler(insertProducts));
dbRouter.get('/insert/shopify/inventory', asyncHandler(insertInventory));