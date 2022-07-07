
const mongoose=require('mongoose');
const fileSchema=new mongoose.Schema({
    path:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000000
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000000
    }
});
const Gallery=mongoose.model('Gallery',fileSchema);

exports.fileSchema=fileSchema;
exports.Gallery=Gallery;