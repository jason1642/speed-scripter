import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

const login = async (req,res) => {

return res.send('attempting login')
}

authRouter.post('/login', login)


export default authRouter