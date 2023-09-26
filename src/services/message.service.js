import { getDAOS } from '../models/daos/index.dao.js';
import messageDao from '../models/daos/message.dao.js';
const { MessageDAO } = getDAOS()

class MessageService {
    async getAll() {
        try{
            return await MessageDAO.getAllMessages()
        }catch(error){throw error}
    }
    async saveMessage() {
        try{
            const response = await messageDao.saveMessage();
            if (response === null) return { status: 'error', message: 'Mesanje no enviado'}
            return response
        }catch(error){ throw error}
    }
}

export default new MessageService()