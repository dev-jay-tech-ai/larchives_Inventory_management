import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routers/userRouter'
import { stockRouter } from './routers/stockRouter'
import { seedRouter } from './routers/seedRouter'
import { productRouter } from './routers/productRouter'
import { dbRouter } from './routers/dbRouter'
import { sheetRouter } from  './routers/sheetRouter'
 
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/larchivesdb'
mongoose.set('strictQuery',true)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connect to mongodb'))
  .catch(() => console.log('error mongodb'))

const app = express()
app.use(cors())

app.use('/public', express.static('public'))
// 정적(static) 파일을 손쉽게 제공하기 위해 사용한다. express.static 을 사용하지 않으면,
// 정적 파일이 존재하는 path 로 접근하기 위한 코드가 번거롭고 복잡하게 된다.
// static 의 인자로 디렉토리명을 전달하며, 해당 디렉토리 경로의 데이터들은 
// 웹브라우저의 요청에 따라 서비스를 제공할 수 있다.
// 해당 디렉토리에 접근할때에도 해당 경로를 static 경로로 지정해야 한다.

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))

app.get('/', (req: Request, res: Response) =>
  res.send('well done!')
)

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/stock', stockRouter)
app.use('/api/seed', seedRouter)
app.use('/api/db', dbRouter)
app.use('/api/sheet', sheetRouter)

/** deployment  */
// app.use(express.static(path.join(__dirname, '../../frontend/dist')))
// app.get('*', (req: Request, res: Response) => 
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
// )

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})