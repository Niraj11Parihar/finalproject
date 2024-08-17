const express = require('express');
const db = require('./config/Database');
const router = require('./router/router');
const path = require('path')
const bodyParser = require('body-parser');


const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")))
app.use(router);


app.listen(2020,(err)=>{
    if(err){
        console.error("Server not started",err)
    }
    else{
        db;
        console.log("Server started at : http://localhost:2020")
    }
})