import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./router/ProductRouter.js";
import viewsProductRouter from "./router/viewsProductRouter.js"
import cartRouter from "./router/CartRouter.js";
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager("./db/products.json")
import { Server as SocketServer } from "socket.io";
import __dirname from "./dirname.js"


const app = express();

const appServer = app.listen(8080, () => console.log("ATR"))

const io = new SocketServer(appServer)

app.engine("handlebars", handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars");
app.use("/", viewsProductRouter)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "public"))
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

io.on ('connetion', async (socket) => {
    socket.emit('connected', (file) => {
        console.log('conectado')
    })
    socket.emit('products', await productManager.getProducts())
    socket.on('newProduct', async (file) => {
        productManager.addProduct(file)
        socket.emit('products', await productManager.getProducts())
    })

    socket.on('deleteProduct', async (file) => {
        productManager.deleteProductById(file.idProduct)
        socket.emit('products', await productManager.getProducts())
    })
})