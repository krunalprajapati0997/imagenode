const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var router = express.Router();
var appRoutes = require("./route")(router);
const cors = require('cors')


mongoose.connect('mongodb://localhost:27017/Heer')
const conn = mongoose.connection
console.log('connection succescfull')

const app = express('');
app.use(cors())
app.use('/api',appRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads',express.static('uploads'));


         
     
app.listen(6001,function(){
    console.log('port is running');
})


