import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils'
import { initial_pw } from '../pwGenerator'

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

userRouter.post('/adduser',
  asyncHandler(async (req: Request, res: Response) =>  {
    const { name, email, file } = req.body
    const password = Math.random().toString(36).slice(2)
    initial_pw(email, password)
    const user = await UserModel.create({
      name,
      email,
      file,
      password: bcrypt.hashSync(password)
    } as User)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.file,
      token: generateToken(user)
    })
  })
)

userRouter.get('/:slug', 
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ _id: req.params.slug })
    console.log(user)
    if(user) res.json(user)
    else res.status(401).json({ message: 'Invaild userId' })
  })
)