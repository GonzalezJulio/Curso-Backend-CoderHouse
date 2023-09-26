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
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import SetupServer from './chat/socket.chat.js'


import appRouter from './router/app.router.js'


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




app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine","handlebars")
app.use("/assets",express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/public"))
app.use(cookieParser())


// Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", appRouter)

// Socket Product
SetupServer(httpServer)



httpServer.listen(8080,()=>console.log("ATR"));