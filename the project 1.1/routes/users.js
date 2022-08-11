const {User,validate,userSchema, generateAuthToken}= require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const _= require('lodash');
const jwt=('jsonwebtoken');
const config = require('config');
const Joi= require('joi');
const auth = require('../Middleware/auth');

router.get('/me',auth,async(req, res)=>{
    const user=await User.findById(req.user._id).select('-password')
    res.send(user)
});
router.post('/',async(req, res)=>{
    const {error}= validate(req.body);

    if(error)return res.status(400).send(error.message);

    let user = await User.findOne({email:req.body.email});
    if(user)return res.status(400).send('User already exists')
    user= new User(_.pick(req.body, ['username','name','email','password']));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    user=await user.save();
    console.log(user);

    const token=await generateAuthToken(user._id);


    return res.status(200).header('x-auth-token',token).send(_.pick(user,['name','email'])); 
})
module.exports = router;