import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'

const authRouter = express.Router()

const login = async (req,res) => {
    // login requires just username and password

    let user = await userModel.findOne({username: req.body.username})
    if(!user) return res.status(400).send('Incorrect username or password')
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).send('incorrect password')
    const tokenSecret = 'thisismytokensecrettemporarily'
    const token = jwt.sign({_id: user._id}, tokenSecret)
    console.log('token' + token)



return res.send('attempting login')
}

authRouter.post('/login', login)


export default authRouter