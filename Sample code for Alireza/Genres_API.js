const express = require('express');
const app= express();
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Genre')
.then(()=>{console.log('connected to mongoose...')})
const schema=new mongoose.Schema({
    genre:{
        type:String,
        required:true
    },
    tags:Array,
    author:String
}
);
const Genre =mongoose.model('Genre',schema);
  app.get('/', (req, res) => {
    res.send('Genres Site Where You Can Find All of Those Categories')
});
const genre=new Genre({
    genre:'Drama', 
    tags:['newmovie','top5','bestOfMonth'],
    author:'Danial'
});
app.get('/api/Genres', (req, res) => {
    res.send(genre)
});
  app.post('/api/Genres', async(req, res) => {
   const genrep=new Genre({
       genre:req.body.name,
        tags:['newmovie','top2','bestOfMonth'],
        author:'john'
});
   genrel=await genrep.save();
    res.send(genrel);
 });
 app.put('/api/Genres/:id',async (req, res)=>{
    const pop=await Genre.findByIdAndUpdate(req.params.id,{genre:req.body.name},{
        new:true
    }) ;
    res.send(pop);

 }) 
 app.get('/api/Genres/:id', async(req, res) => {
  const eoq=await Genre.findById(req.params.id);
app.send(eoq);
});
 app.delete('/api/Genres/:id', async(req, res) => {
    const sus=await Genre.findByIdAndRemove(req.params.id);
   res.send(sus);
 });
 app.listen(4000, () => { console.log('listening on port 4000...') });