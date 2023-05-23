import mongoose from 'mongoose';

import db from './dbConnection.js';

const collection = 'carts';

const schema = new mongoose.Schema({
  products: [
    {
      _id: Object,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const cartsModel = db.model(collection, schema);
export default cartsModel;
