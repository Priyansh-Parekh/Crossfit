const express = require('express');
const app = express();
const path = require('path');
const cookieParser=require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('layout','layouts/main');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressLayout);
app.use(cookieParser());
app.use('/',require('./server/route/main'));

app.listen(port,()=>{
    console.log(`app is running on ${port} port`);
});