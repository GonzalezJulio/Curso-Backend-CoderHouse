import messagesModel from "../models/messages.model.js";



class messagesManagerDB {
    constructor() {}
    async addMessages() {
        try{
            await messagesModel.create(message)
            return { status: 'Success', message: 'Mensaje enviado'}

        }catch (error){
            console.error('Error al enviar el mnsj')

        }
       
    }
    async getMessages() {
        try{
            const messages = await messagesModel.find().lean()
            return messages

        } catch(error){
            console.error('Error al traer los mnsj desde la base', error)

        }
    }
}
export default messagesManagerDB;

