import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils'

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

userRouter.post('/signup',
  asyncHandler(async (req: Request, res: Response) =>  {
    const { name, email, password } = req.body
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password)
    } as User)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    })

  })
)