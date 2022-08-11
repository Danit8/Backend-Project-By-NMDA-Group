const Joi=require('joi');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const config=require('config');
const newSchema=new mongoose.Schema({
    new: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 2000000
    },
    author: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 300
    }
});
const New=mongoose.model('New',newSchema);
function validateNew(news){
  const schema={
  new: Joi.string().min(5).max(2000000).required(),
  author: Joi.string().min(5).max(300).required()
  };
  return Joi.validate(news, schema);
};

exports.validate = validateNew;
exports.newSchema=newSchema;
exports.New=New;