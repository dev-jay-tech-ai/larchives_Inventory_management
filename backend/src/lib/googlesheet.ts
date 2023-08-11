// src/libs/googlesheet.ts

import { GoogleSpreadsheet } from "google-spreadsheet";
import dotenv from 'dotenv'
import credential  from './larchives-8db88e4b9606.json';
dotenv.config()

// 구글 시트 조회하는 로직
const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
    const doc = new GoogleSpreadsheet('1u7qy74FUXwQeRtyHt8GQHJbSTl2FnLWhlDGixd13oVw', credential);
    await doc.loadInfo();
    return doc;
}

getGoogleSheet().then((doc) => console.log(doc));

