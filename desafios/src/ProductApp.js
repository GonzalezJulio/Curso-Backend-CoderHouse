import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./router/ProductRouter.js";
import viewsProductRouter from "./router/viewsProductRouter.js";
import cartRouter from "./router/CartRouter.js";
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager("products")
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import __dirname from "./dirname.js";

const app = express();


const httpServer = HTTPServer(app)


const io =  new SocketServer(httpServer)

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine","handlebars")

app.use('/', viewsProductRouter)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/assets",express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/public"))
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)




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

  
})



httpServer.listen(8080,()=>console.log("connectados en 8080"));