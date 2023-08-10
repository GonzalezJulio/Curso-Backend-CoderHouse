import messagesModel from "../models/messages.model.js";
import mongoose from "mongoose"

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)


class messagesManagerDB {
    constructor() {
        this.messagesModel = messagesModel;
    }
    async addMessage(user, message) {
        try {
            const messages = await this.messagesModel.create({
                user: user,
                message: message,
            });
            return messages;
        } catch (error) {
            
        }
    }
    async getMessages() {
        try {
            const messages = await this.messagesModel.find().lean();
            return messages;
        } catch (error) {
            throw new Error("No se pudo traer mensajes");
        }
    }
}
export default messagesManagerDB;

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
