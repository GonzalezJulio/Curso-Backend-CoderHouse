import express from "express";
import { Router } from "express";
import cookieParser from "cookie-parser";
import session from "express-session"
import sessionFileStore from "session-file-store";
import userManager from "../dao/mongodb/userManager.js";
const manager = new userManager("user");
const viewsUserRouter = Router();


session({
    secret: "superseguronadieve",
    resave: true,
    saveUninitialized: true,
  store: new sessionFileStore(session)({ path: "./sessions" })
  })

viewsUserRouter.get("/", async (req, res) => {
    const username = await manager.createUser();
    res.render("indexUser", { username });
});

viewsUserRouter.get("/userRealtime", async (req, res) => {
    res.render("usersRealTime", {});
});

viewsUserRouter.get("/login", (req, res) => {
    res.render("login")
});
viewsUserRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;  
    const validar = await manager.validateUser(username, password)
    if (!validar) return res.redirect("/login");

  delete validar.password;
  delete validar.salt;
 /*  req.session.validar = validar; */
  res.redirect("/profile");
})
viewsUserRouter.get("/register", async (req, res) => {
    const { name, lastname, username } = req.body
    const user =  await manager.getUser(name, lastname, username)
    res.send (user)
})
viewsUserRouter.get("/profile", (req, res) => {

})




export default viewsUserRouter;