const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayout);
app.use(cookieParser());

app.use('/', require('./server/route/main')); // ✅ Use main route
app.use('/clubs', require('./server/route/clubs')); // ✅ Use clubs route
app.use('/leagues', require('./server/route/leagues')); // ✅ Use leagues route
app.use('/live_scores', require('./server/route/live_scores')); // ✅ Use live_scores route
app.use('/merchandise', require('./server/route/merchandise')); // ✅ Use merchandise route
app.use('/login', require('./server/route/login')); // ✅ Use login route
app.use('/logout', require('./server/route/logout')); // ✅ Use logout route
app.use('/register', require('./server/route/register')); // ✅ Use register route
app.use('/dashboard', require('./server/route/dashboard')); // ✅ Use dashboard route
app.use('/match', require('./server/route/match')); // ✅ Use match route
app.use('/cart', require('./server/route/cart')); // 🛒 ADD THIS LINE


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
});