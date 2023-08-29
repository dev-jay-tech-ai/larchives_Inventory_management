import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { GoogleSpreadsheet } from "google-spreadsheet";
import credential from '../lib/larchives-8db88e4b9606.json';
import dotenv from 'dotenv'
import { SheetModel } from '../models/sheetModel';
dotenv.config()

// 구글 시트 조회하는 로직
const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CLOTH);
    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Error loading Google Spreadsheet:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
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
      // Filter out empty rows before processing the data
      const filteredRows = rows.filter((row) => row._rawData.length > 0);
      const googleSheetRows = filteredRows.map((row)=> row._rawData)
       // Print the first row's data (after filtering empty rows)
      // Send the filteredRows or process the data as needed
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
      for (const data of req.body.data) {
        console.log(data)
        if(data.stock_code && data.stock_code !== '') {
          await SheetModel.findOrCreateByBarcode(data.stock_code, data)
        }
      }
      res.status(200).json({ error: 'Impremented!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }) 
)