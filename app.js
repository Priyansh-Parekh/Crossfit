const express = require('express');
const app = express();
const path = require('path');
const cookieParser=require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const { latitudeKeys } = require('geolib');
const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views')); // Explicit views path
// app.set('layout','layouts/main');
app.use(expressLayout);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout', './layouts/main');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressLayout);
app.use(cookieParser());

app.use('/',require('./server/route/main')); // ✅ Use main route
app.use('/',require('./server/route/auth')); // ✅ Use auth route

//Error Handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error',{
    title: 'Error',
    layout: 'layouts/main' ,
     error: err.message
     });
});

app.use((req, res) => {
  res.status(404).render('404',{
    title: 'Page Not Found',
    layout: 'layouts/main',
  });
});


app.get('/', (req, res) => {
   res.render('index', { tasks }); // ✅ Pass tasks to EJS
});
  // Replace with real tasks if needed

 

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
});