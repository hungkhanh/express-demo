require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(process.env.SESSION_SECRET));

// app.use(cookieParser('1324564dsad'));

app.use('/users', authMiddleware.requireAuth ,userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/static', express.static('public'))
// http://localhost:3000/static/sea.jpg

app.get('/', (req, res) => {
  res.render('index', { title: 'AAA', message: 'Hello ' });
});

app.listen(3000, (req, res) => {
  console.log('Server start on port 3000');
});