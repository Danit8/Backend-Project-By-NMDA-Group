const Joi=require('joi');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const login= require('./routes/login');
const news= require('./routes/news')
const fu = require('express-fileupload');
const port= 3000;
const search = require('./routes/search')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());


mongoose.connect('mongodb://localhost/DetaBaseForProject')
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB'));
app.use(express.json());
app.use(express.static('upload'));
 app.use(fu());
 app.use('/api/users',users);
 app.use('/api/users/login',login);
 app.use('/api/news',news);
 app.use('/api/news',search);

 
app.listen(3000,()=>console.log(`Listening on Port ${port}...`))
