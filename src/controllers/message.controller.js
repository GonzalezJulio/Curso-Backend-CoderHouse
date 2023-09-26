import MessageService from '../services/message.service.js'


class MessageController {
    getAll = async (req, res) => {
        try{
            let messages = await MessageDAO.getAllMessages()
            res.status(201).send({messages: messages})
        }catch(error){
            return {status: 500, error: `Mensaje no Enviado, ${error.message}`}
        }
    }

    saveMessage = async (req, res) => {
        const newMessage = req.body
    if (newMessage.user && newMessage.message) {
        try {
            await MessageDAO.saveMessage(newMessage)
            res.send({ status: 201, message: 'Success' })
        } catch (error) { return { status: 500, error: `Message Router Post failed, catch is ${error.message}` } }
    } else {
        res.send({ status: 400, error: 'user and message needed.' })
    }
    }
}

export default new MessageController()