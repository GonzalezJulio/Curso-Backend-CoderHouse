import { Router } from "express";
import userManager from "../dao/userManager.js";
const manager = new userManager("user");
const viewsUserRouter = Router();

viewsUserRouter.get("/", async (req, res) => {
    const user = await manager.createUser();
    res.render("indexUser", { user });
});

viewsUserRouter.get("/userRealtime", async (req, res) => {
    res.render("usersRealTime", {});
});


export default viewsUserRouter;