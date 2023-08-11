import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { InventoryModel } from '../models/inventoryModel';
import { SheetModel } from '../models/sheetModel';

export const inventoryRouter = express.Router()
inventoryRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
  try {
    const products = await ProductModel
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
        $sort: { "variants.inventory_item_id": 1, "inventories.inventory_item_id": 1, "inventories.createdAt": 1 }
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
      }
    ]).limit(200);

    res.json(products)
  } catch (error) {
    console.error('Error fetching products with inventories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}));