import express from 'express'
import userModel from '../models/user.js'
import _ from 'lodash'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


const createUser = async (req,res)=>{

  let user = await userModel.findOne({$or: [
    { username: req.body.username },
    {email: req.body.email} 
  ]})
  if (user) return res.send('That username already exists')


  user = new userModel(_.assign(_.pick(req.body, ['username', 'email', 'password']),
  {
    _id: new mongoose.Types.ObjectId() 
  }
))
const salt = await bcrypt.genSalt(10);


    user.password = await bcrypt.hash(user.password, salt)


  await user.save()
  console.log(user)
  return res.send('returning post action')
}

router.post('/', createUser)

export default router
  