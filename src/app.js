import express, { json, urlencoded } from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import ChatManager from './dao/chatManagerDB.js';
import chatModel from './dao/models/ChatModel.js';
import productsRouter from './router/products.routes.js';
import cartsRouter from './router/carts.routes.js';
import chatRouter from './router/chat.routes.js';
import morgan from 'morgan';

/* CONFIGURATIONS */

// Express
const app = express();
app.use(json()); // Middleware para parsear JSON
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Morgan
app.use(morgan('dev'));

// Server HTTP
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log('Connection Error: ', err);
    return;
  }
  console.log(`Listen on port ${PORT}`);
});
// Server Socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.on('message', async (data) => {
    try {
      // Persistence in mongoDB
    const chat = await ChatManager.saveChat(data.user, data.message);
    const chats = await chatModel.find();
    io.emit('messageLogs', chats);
    } catch (error) {
      console.error('Error handling message:', error);
    }
    
  });

  socket.on('authenticated', (data) => {
    socket.broadcast.emit('newUserConnected', data);
  });
});

// Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Router express
// file system
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
// mongoDB
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/chat', chatRouter);

export default app;
