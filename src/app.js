import express, { json, urlencoded } from 'express';
import __dirname from './utils.js';
import open from 'open';
import morgan from 'morgan';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { uploader } from './utils.js';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import viewProd from './routes/viewsProd.router.js';

/* CONFIGURACIONES */

// Express
const app = express();
app.use(json()); // Middleware para parsear JSON
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Morgan
app.use(morgan('dev'));

// Open
// const open = require('open');

// Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
  // open('http://localhost:8080/abmprod');
});

// Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Mongoose
const connection = mongoose.connect(
  'mongodb+srv://gabianp:PrIntMdb23@ecommerce.hwzuuds.mongodb.net/?retryWrites=true&w=majority'
);
app.use('/', viewProd);
// Router express
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// MongoDB
