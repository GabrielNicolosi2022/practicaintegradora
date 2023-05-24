import mongoose from 'mongoose';

import db from './dbConnection.js';

const collection = 'chats';

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = db.model(collection, schema);
export default chatModel;
