import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import { userRouter } from './routers/userRouter'
import { stockRouter } from './routers/stockRouter'
import { productRouter } from './routers/productRouter'
import { dbRouter } from './routers/dbRouter'
import { sheetRouter } from  './routers/sheetRouter'
 
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://larchives:nk3VvM8CObshAyn3@cluster0.fjaapvf.mongodb.net/larchivesdb?retryWrites=true&w=majority'
mongoose.set('strictQuery',true)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connect to mongodb'))
  .catch(() => console.log('error mongodb'))

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
app.use('/images', express.static('backend/public/images'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/stock', stockRouter)
app.use('/api/db', dbRouter)
app.use('/api/sheet', sheetRouter)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) => 
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})