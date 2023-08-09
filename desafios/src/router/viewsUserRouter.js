import { Router } from "express";
import userManager from "../dao/mongodb/userManager.js";
const manager = new userManager("user");
const viewsUserRouter = Router();

viewsUserRouter.get("/", async (req, res) => {
    const username = await manager.createUser();
    res.render("indexUser", { username });
});

viewsUserRouter.get("/userRealtime", async (req, res) => {
    res.render("usersRealTime", {});
});


export default viewsUserRouter;