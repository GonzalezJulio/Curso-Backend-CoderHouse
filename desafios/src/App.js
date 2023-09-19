// Video de Arquitectura de capas 45:13
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
import 'dotenv/config'


import appRouter from './router/app.router.js'
/* //Gestores de ruta
import productsRouter from "./router/ProductRouter.js";
import ViewsRouter from "./router/ViewsRouter.js"
import router from './router/sessions.router.js' 
import cartRouter from "./router/CartRouter.js";
//Router ArqCaps
import ProdRouter from './routers/products.router.js'
 */
/* // Manager
import MessageManager from "./dao/mongodb/MessagesManager.js";
import userManager from "./dao/mongodb/userManager.js";
import ProductManager from "./dao/mongodb/ProductManager.js";

const manager = new userManager("user")
const productManager = new ProductManager("products")
const messagesDb = new MessageManager("messages") */

//Servidor
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const httpServer = HTTPServer(app)

//Conexion a mongoose
const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)

app.use(session({
  secret: "superseguronadieve",
  resave: true,
  saveUninitialized: true,
/* store: new FS ({ path: "./sessions" }) */
store: new MongoStore({
  mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`,
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


/* //Routers
app.use('/', ViewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)
app.use('/api/sessions', router)
app.use('/api/product', ProdRouter)
const FS = sessionFileStore(session)

//Router ArqCapas
app.use("/product", ProdRouter) */

// Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", appRouter)

// Socket Product

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