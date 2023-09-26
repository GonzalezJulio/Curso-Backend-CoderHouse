import { Server } from "socket.io"
import MessageDAO from "../models/daos/message.dao.js"


function SetupServer (server) {
  const io =  new Server(server)
  io.on('connection', socket => {
    console.log('Nuevo Usuario Conectado')
    socket.on('message', async data => {
      try{
        await MessageDAO.saveMessage(data);
        const allMessages = await MessageDAO.getAllMessages()
        io.emit('messageLogs', allMessages)
      }catch(error){
        console.error(`Error al guarda o traer todo los mensajes ${error.message}`)
      }
    })
  });

};
export default SetupServer;