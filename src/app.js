import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
// import open from 'open';
import morgan from 'morgan';
import productsRouter from './router/products.routes.js';
import cartsRouter from './router/carts.routes.js';
import { engine } from 'express-handlebars';
import viewProd from './router/viewProd.router.js';

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

// Server HTTP
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log('Connection Error: ', err);
    return;
  }
  console.log(`Listen on port ${PORT}`);
  // open('http://localhost:8080/abmprod');
});
// Server Socket.io
const io = new Server(server);

// Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewProd);

// Router express
// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

export default app;