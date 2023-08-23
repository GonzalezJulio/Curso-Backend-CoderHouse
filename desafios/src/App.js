import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session"
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import productsRouter from "./router/ProductRouter.js";
import userRouter from "./router/userRouter.js"
import viewsCartRouter from "./router/viewsCart.js"
import viewsMessagesRouter from "./router/viewsChat.js";
import viewsUserRouter from "./router/viewsUserRouter.js"
import viewsProductRouter from "./router/viewsProductRouter.js";
import cartRouter from "./router/CartRouter.js";
import MessageManager from "./dao/mongodb/MessagesManager.js";
import userManager from "./dao/mongodb/userManager.js";
import ProductManager from "./dao/mongodb/ProductManager.js";
const manager = new userManager("user")
const productManager = new ProductManager("products")
const messagesDb = new MessageManager("messages")
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import __dirname from "./dirname.js";
const app = express();

const conn = await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
// 36 MIN CLASE STORAGE 2

const httpServer = HTTPServer(app)


const io =  new SocketServer(httpServer)


app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine","handlebars")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use("/assets",express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/public"))
app.use('/', viewsMessagesRouter)
app.use('/', viewsCartRouter)
app.use('/', viewsUserRouter)
app.use('/', viewsProductRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)
const FS = sessionFileStore(session)
app.use(session({
  secret: "superseguronadieve",
  resave: true,
  saveUninitialized: true,
/* store: new FS ({ path: "./sessions" }) */
store: new MongoStore({
  mongoUrl: `mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`,
  ttl: 30,
}),
ttl: 30,
}))




// Socket Product
io.on('connection', async (socket) => {
  socket.emit('connected', (data) => {
  console.log('connected with server')
})
  socket.emit('productos',await productManager.getProducts())

  socket.on('new_prod', async (data) => {
    productManager.addProduct(data)
      
      socket.emit('productos', await productManager.getProducts())     
  })

  socket.on('delete_prod',async (data) => {
    productManager.deleteProductById(data.pid)

      socket.emit('productos',await productManager.getProducts())
  })

  socket.on('new_user', async (data) => {
    await manager.createUser(data)
  })

  socket.on('delete_username',async (data) => {
    await manager.deleteUser(data.usna)
})

});
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






httpServer.listen(8080,()=>console.log("ATR"));