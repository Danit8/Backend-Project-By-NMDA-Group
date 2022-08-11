const {New,validate}= require('../models/MainNew');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const _= require('lodash');
const Joi= require('joi');
const fu = require('express-fileupload');
const auth = require('../Middleware/auth');
const admin = require('../Middleware/admin')
// const fileUpload = require('express-fileupload');


router.post('/post',async(req, res)=>{
    const {error}= validate(req.body);
    console.log(error)

    if(error)return res.status(400).send(error.message);
    let news= new New(_.pick(req.body, ['new','author']));
    await news.save();
    res.status(200).send(_.pick(news,['new','author'])); 
});

router.post('/uploadimg', function(req, res) {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  console.log(req.files);
  uploadPath = process.cwd() + '/upload/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('Your file was successfully uploaded');
  });
});

router.delete('/:id',[auth,admin],async(req, res) => {
    const news = await New.findById(req.params.id);
    if(!news) return res.status(404).send('This New Does Not Exist.');
 } );
 router.put('/:id',[auth,admin],async(req,res)=>{
     const { error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const news = await New.findByIdAndUpdate(req.params.id,{title:req.body.title,name:req.body.name},{new:true});
    if(!news) return res.status(404).send('The New with the given id does not exist.');
    res.send(news);
    });
    
module.exports = router;