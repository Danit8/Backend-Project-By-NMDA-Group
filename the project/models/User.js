const Joi=require('joi');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const config=require('config');
const userSchema=new mongoose.Schema({
    username:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    Admin: Boolean
});
const User=mongoose.model('User',userSchema);
exports.User=User;
userSchema.methods.generateAuthToken = function(){
    const token= jwt.sign({_id:this._id, Admin:this.Admin},'lol');
    return token
}
function validateUser(user){
    const schema={
    firstname: Joi.string().min(5).max(50).required(),
    lastname: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
};
// userSchema.methods.generateAuthToken = function() { 
//   const token = jwt.sign({ _id: this._id },'test');
//   return token;
// }

generateAuthToken =  function(_id){
  const token=  jwt.sign({userid:_id},config.get('jwtPrivateKey'));
  console.log(token)
  return token;

  
}
function generateDefaultToken(config){
  app.get(config.get('jwtPrivateKey'));
  User=user.get('jwtPrivate');
  if(!User){
    config='unknown'; 
    return
  };
}
exports.validate = validateUser;
exports.userSchema=userSchema;
exports.generateAuthToken = generateAuthToken;
exports.Defaulttokengenerator = generateDefaultToken;
