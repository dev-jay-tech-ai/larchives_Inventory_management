import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../utils'
import { initial_pw } from '../pwGenerator'
import multer from 'multer'
import path from 'path'

export const userRouter = express.Router()

userRouter.get('/',
  asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find()
    res.json(users)
  })
)

userRouter.post('/signin', 
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        })
        return
      }
    }
    res.status(401).json({ message: 'Invaild email or password' })
  })
)

userRouter.post('/signup', 
  asyncHandler(async (req: Request, res: Response) =>  {
    const { name, email, password } = req.body
    const user = await UserModel.create({
      name, 
      email, 
      password: bcrypt.hashSync(password) 
    } as User)
    res.json({
      _id:  user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    })
  })
)

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req: Request, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

userRouter.post('/adduser', 
  upload.single('file'), // formData의 file 속성
  asyncHandler(async (req: Request, res: Response) =>  {
    const { name, email } = req.body
    const file = req.file
    const password = Math.random().toString(36).slice(2)
    const user = await UserModel.create({
      name,
      email,
      file: file?.filename,
      password: bcrypt.hashSync(password)
    } as User)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      file: user.file,
      token: generateToken(user)
    })
    initial_pw(email, password)
  })
)

userRouter.get('/user/:slug', 
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ _id: req.params.slug })
    if(user) res.json(user)
    else res.status(401).json({ message: 'Invaild userId' })
  })
)

userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
      return
    }

    res.status(404).json({ message: 'User not found' })
  })
)