import express from "express";
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import productsRouter from "./router/ProductRouter.js";
import userRouter from "./router/userRouter.js"
import viewsUserRouter from "./router/viewsUserRouter.js"
import viewsProductRouter from "./router/viewsProductRouter.js";
import cartRouter from "./router/CartRouter.js";
import userManager from "./dao/userManager.js";
import ProductManager from "./dao/ProductManager.js";
const manager = new userManager("user")
const productManager = new ProductManager("products")
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import __dirname from "./dirname.js";

const app = express();

const conn = await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
console.log("Conectados en mongoose")

const httpServer = HTTPServer(app)


const io =  new SocketServer(httpServer)

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine","handlebars")
app.use('/', viewsUserRouter)
app.use('/', viewsProductRouter)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/assets",express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/public"))
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)




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

  
})

httpServer.listen(8080,()=>console.log("connectados en 8080"));