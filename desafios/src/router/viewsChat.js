import { Router } from "express";
import MessageManager from "../dao/mongodb/MessagesManager.js";
const messageManager = new MessageManager("messages");
const viewsMessagesRouter = Router();

viewsMessagesRouter.get("/", async (req, res) => {
    const messages = await messageManager.getMessage();
    res.render("indexMessage", { messages });
});

viewsMessagesRouter.get("/messagesrealtime", async (req, res) =>{ 
    res.render("messagesRealTime", {})
});

export default viewsMessagesRouter;