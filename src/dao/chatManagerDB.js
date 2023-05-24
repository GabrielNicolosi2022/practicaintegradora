import chatModel from "./models/ChatModel.js";

class ChatManager {
  constructor() {}
  static async saveChat(user, message) {
    try {
      const chat = new chatModel({
        user: user,
        message: message,
      });
      await chat.save();
      return chat;
    } catch (error) {
      console.error('Error saving chat: ', error);
      throw error;
    }
    }
    static async deleteChat(chatId) {
        try {
            const deletedChat = await chatModel.findByIdAndDelete(chatId);
            return deletedChat;
        } catch (error) {
            console.error('Error deleting chat: ', error);
            throw error;
        }
    }
}

export default ChatManager;