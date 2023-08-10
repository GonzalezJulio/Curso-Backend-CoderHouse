import { Router } from "express";
import MessageManager from "../dao/mongodb/MessagesManager.js"
const message = new MessageManager("messages")

const viewsMessagesRouter = Router();

viewsMessagesRouter.get("/join", async (req,res)=>{
   const messages = await message.addMessage();
  res.render("join")
  })

viewsMessagesRouter.get("/chat", async (req,res)=>{
  const messages = await message.addMessage();
  res.render("chat", messages)
  })


export default viewsMessagesRouter;

