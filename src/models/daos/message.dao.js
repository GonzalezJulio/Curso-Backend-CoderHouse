import messageModel from '../schemas/messages.model.js'

class MessageDAO {
    constructor() {
        console.log('Messages DAO connected.')
    }

    getAllMessages = async () => {
        try {
            const messages = await messageModel.find().lean()
            return messages
        } catch (error) { console.error('Error getting messages from db', error.message) }
    }

    saveMessage = async (message) => {
        try {
            await messageModel.create(message)
            return { status: 'Success.', message: 'Message added.' }
        } catch (error) { console.error('Error creating messages from db', error.message) }
    }
}

export default new MessageDAO()