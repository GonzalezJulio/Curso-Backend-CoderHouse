
// Dependencias
import express from "express";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import MongoStore from "connect-mongo";
import session from "express-session"
import sessionFileStore from "session-file-store";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

//Gestores de ruta
import productsRouter from "./router/ProductRouter.js";

import ViewsRouter from "./router/ViewsRouter.js"
import router from './router/sessions.router.js' 
import cartRouter from "./router/CartRouter.js";

// Manager
import MessageManager from "./dao/mongodb/MessagesManager.js";
import userManager from "./dao/mongodb/userManager.js";
import ProductManager from "./dao/mongodb/ProductManager.js";
const manager = new userManager("user")
const productManager = new ProductManager("products")
const messagesDb = new MessageManager("messages")

//Servidor
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const httpServer = HTTPServer(app)

//Conexion a mongoose
const conn = await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)

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



const io =  new SocketServer(httpServer)


app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine","handlebars")
app.use("/assets",express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/public"))
app.use(cookieParser())


//Routers
app.use('/', ViewsRouter)

app.use('/api/product', productsRouter);
app.use('/api/cart', cartRouter)
app.use('/api/sessions', router)
const FS = sessionFileStore(session)

// Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());



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
    console.log(data)
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