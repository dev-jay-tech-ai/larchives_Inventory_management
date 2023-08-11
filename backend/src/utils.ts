import  jwt from 'jsonwebtoken'
import env from 'dotenv'
import { User } from './models/userModel'
import { NextFunction, Request, Response } from 'express'

env.config()

export const generateToken = (user: User) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
  process.env.JWT_SECRET || 'somethingsecret',
  {
    expiresIn: '30d',
  })
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if(authorization) {
    const token = authorization.slice(7,authorization.length) // Bearer ...
    const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
    req.user = decode as {
      _id: string
      name: string
      email: string
      isAdmin: boolean
      token: string
    } 
    next()
  } else  {
    res.status(400).json({ message: 'No Token' })
  }
}