import { Server } from "socket.io"
import 


function SetupServer (server) {
   const io =  new SocketServer(httpServer)
    io.on('connection', async (socket) => {
        console.log('Conexion de Usuario');
        
        socket.emit("messageLogs")
      socket.on("message", async (data) => {
        let user = data.user;
        let message = data.message;
        await messagesDb.addMessage(user, message)
        const messages = await messagesDb.getMessages();
        socket.emit("messageLogs", messages)
      })
      
      });
}

export default SetupServer();