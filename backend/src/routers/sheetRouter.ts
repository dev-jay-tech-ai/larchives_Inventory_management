import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { GoogleSpreadsheet } from "google-spreadsheet";
import credential from '../lib/larchives-8db88e4b9606.json';
import dotenv from 'dotenv'
import { SheetModel } from '../models/sheetModel';
dotenv.config()

// Query to check Google sheets
const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CLOTH);
    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Error loading Google Spreadsheet:", error);
    throw error; 
  }
}

export const sheetRouter = express.Router()
// /api/sheet/:slug
sheetRouter.get('/stock/:slug',
  asyncHandler(async(req: Request, res: Response) => {
    try {
      const sheetId = req.params.slug;
      const googleSheet = await getGoogleSheet();
      const sheetsByIdElement = googleSheet.sheetsById[sheetId];
      const rows = await sheetsByIdElement.getRows();
      const header = await sheetsByIdElement.headerValues;
      const filteredRows = rows.filter((row) => row._rawData.length > 0);
      const googleSheetRows = filteredRows.map((row)=> row._rawData);
      googleSheetRows.unshift(header);
      res.send(googleSheetRows);
    } catch (error) {
      if(error instanceof Error) console.error('Error loading Google Spreadsheet:', error.message);
      res.status(500).json({ error: 'Error loading Google Spreadsheet' });
    }
  })
)

sheetRouter.post('/',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      // Step 1: Reset all stock quantities to 0
      // await SheetModel.updateMany({}, { $set: { countInStock : 0 } });
      /// Step 2: Iterate through req.body.data
      for (const data of req.body.data) {
        // Step 3: Check if stock_code exists and is not an empty string
        if (data.stock_code && data.stock_code !== '') {
          // Step 4: Update or create entry in SheetModel
          await SheetModel.findOneAndUpdate(
            { barcode: data.stock_code },
            { $set: data },
            { upsert: true, new: true }
          );
          console.log(data);
        }
      }

      res.status(200).json({ message: 'Implemented!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }) 
)