import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import request from 'request'
import dotenv from 'dotenv'
import { ProductModel } from '../models/productModel'
import { InventoryModel } from '../models/inventoryModel'
import { SheetModel } from '../models/sheetModel'
import { promisify } from 'util'
dotenv.config()
const requestAsync = promisify(request)

const { SHOPIFY_API_KEY, SHOPIFY_LOCATION_ID, SHOPIFY_ACCESS_TOKEN } = process.env
export const productRouter = express.Router()

const set = { 
  'method': 'POST',
  'url' : `https://${SHOPIFY_API_KEY}:${SHOPIFY_ACCESS_TOKEN}@privaeuk.myshopify.com/admin/api/2023-04/inventory_levels/set.json`,
  'headers' : {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "location_id": SHOPIFY_LOCATION_ID,
    "inventory_item_id": null, // We will replace this with the actual value later
    "available": null // We will replace this with the actual value later
  })
}

productRouter.post('/update',
  asyncHandler(async (req: Request, res: Response) => {
    const { inventoryItemId, qty } = req.body.data;
    try {
      const setWithIdAndQty = {
        ...set,
        body: JSON.stringify({
          ...JSON.parse(set.body), // Parse the existing body JSON
          "inventory_item_id": inventoryItemId, // Replace with actual value
          "available": qty || 0 // Replace with actual value
        })
      }
      request(setWithIdAndQty, (err, resp) => {
        if(err) throw new Error(err)
        console.log(resp.body)
        res.send(resp.body)
      })
    } catch(err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
)

productRouter.post('/update/bulk',
  asyncHandler(async (req: Request, res: Response) => {
    const products:Request['Inventory'][] = req.body.data;
    console.log(req.body.data)
    try {
      const requests = products.map((product: Request['Inventory']) => {
        const setWithIdAndQty = {
          ...set,
          body: JSON.stringify({
            ...JSON.parse(set.body), // Parse the existing body JSON
            "inventory_item_id": product.inventoryItemId, // Replace with actual value
            "available": product.qty || 0 // Replace with actual value
          })
        };
        return requestAsync(setWithIdAndQty)
      })
      const response = await Promise.all(requests)
      res.status(200).json(response.map((resp) => JSON.parse(resp.body)))
    } catch(err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
)

productRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
  try {
    const productsWithInventory = await ProductModel
    .aggregate([
      {
        $lookup: {
          from: InventoryModel.collection.name,
          localField: 'variants.inventory_item_id',
          foreignField: 'inventory_item_id',
          as: 'inventories'
        }
      }, 
      {
        $unwind: "$inventories" // Unwind the inventories array for sorting
      },
      {
        $sort: { "variants.inventory_item_id": 1, "inventories.inventory_item_id": 1 }
      },
      {
        $group: {
          _id: "$_id", // Group the documents back by _id
          productId: { $first: "$productId" },
          title: { $first: "$title" },
          image: { $first: "$image" },
          vendor: { $first: "$vendor" },
          link: { $first: "$link" },
          variants: { $first: "$variants" }, // Restore the original variants array
          inventories: { $push: "$inventories" } // Push the sorted inventories back to the array
        }
      },
      {
        $addFields: {
          inventories: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$inventories",
                      cond: { $eq: ["$$this.inventory_item_id", "$$variant.inventory_item_id"] }
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: SheetModel.collection.name,
          localField: 'variants.barcode',
          foreignField: 'barcode',
          as: 'sheetstocks'
        }
      },
      { // filter out qty 0
        $match: {
          "inventories.available": { $gt: 0 }
        }
      },
      {
        $addFields: {
          sheetstocks: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$sheetstocks",
                      cond: { $eq: ["$$this.barcode", "$$variant.barcode"] }
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      }
    ]).sort({'_id': 1});

    res.json(productsWithInventory)
  } catch (error) {
    console.error('Error fetching products with inventories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}));

productRouter.delete('/delete/:productId', 
  asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.productId
    // console.log(id)
    try {
      await ProductModel.deleteOne({ productId: id })
    } catch (err) {
      console.log(err)
    }  
    res.json('Deleted!')
  })
)

productRouter.delete('/delete', 
  asyncHandler(async (req:Request, res:Response) => {
    const productIds = req.body
    try {
      await ProductModel.deleteMany({ productId: { $in: productIds } });
      console.log(productIds + 'deleted!')  
      res.json('Deleted!')
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    } 
  })
)