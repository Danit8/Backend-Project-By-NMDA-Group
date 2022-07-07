
const {New,validate,newSchema}= require('../models/MainNew');
const mongoose = require('mongoose');
const Joi= require('joi');
const express = require('express');
const config = require('config');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const _= require('lodash');
const auth = require('../Middleware/auth');
const admin = require('../Middleware/admin')
router.get('/:id',async(req, res)=>{
    console.log(req.params)
    const news=await New.findById(req.params.id);
    if(!news){
        return res.status(400).send('There is no post with given id.');
    };
    res.send(news);
});
module.exports = router;