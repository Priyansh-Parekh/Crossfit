const express = require('express');
const app = express();
const path = require('path');
const cookieParser=require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'server/views')); // Explicit views path
app.set('layout','layouts/main');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressLayout);
app.use(cookieParser());

app.use('/',require('./server/route/main.js')); // ✅ Use main route
app.use('/auth',require('./server/route/auth.js')); // ✅ Use auth route

//Error Handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message });
});
app.use((req, res) => {
  res.status(404).render('404');
});


app.get('/', (req, res) => {
   res.render('index', { tasks }); // ✅ Pass tasks to EJS
});
  // Replace with real tasks if needed

 

app.listen(port,()=>{
    console.log(`app is running on ${port} port`);
});