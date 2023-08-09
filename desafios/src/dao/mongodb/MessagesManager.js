import messagesModel from "../models/messages.model.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
console.log('Conectado mongoose Manager')

export default class MessageManager {
    constructor () {

    }

    async addMessage(user, message) {
        try{
            const new_message = await messagesModel.create({
                user: user._id,
                message: message,
            });
            return new_message;

        } catch (e) {

        }
    }

    async getMessage() {
        try{
            const messages = await messagesModel.find();
            return messages;

        }catch (e) {

        }
    }

}