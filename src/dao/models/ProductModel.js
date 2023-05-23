import mongoose from 'mongoose';

import db from './dbConnection.js';

const collection = 'products';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.0,
    max: Number.MAX_VALUE,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String],
    required: false,
  },
});

const productsModel = db.model(collection, schema);
export default productsModel;
