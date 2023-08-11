import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
// import path from 'path'
import { userRouter } from './routers/userRouter'
import { stockRouter } from './routers/stockRouter'
import { seedRouter } from './routers/seedRouter'
import { productRouter } from './routers/productRouter'
import { dbRouter } from './routers/dbRouter'
import { sheetRouter } from  './routers/sheetRouter'
import { inventoryRouter } from  './routers/inventoryRouter'
 
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/larchivesdb'
mongoose.set('strictQuery',true)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connect to mongodb'))
  .catch(() => console.log('error mongodb'))

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))

app.get('/', (req: Request, res: Response) =>
  res.send('well done!')
)

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/stock', stockRouter)
app.use('/api/seed', seedRouter)
app.use('/api/db', dbRouter)
app.use('/api/sheet', sheetRouter)
app.use('/api/inventory', inventoryRouter)

/** deployment  */
// app.use(express.static(path.join(__dirname, '../../frontend/dist')))
// app.get('*', (req: Request, res: Response) => 
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
// )

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})