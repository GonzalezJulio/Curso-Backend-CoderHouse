import express from "express";
import userManager from "../userManager/userManager.js";
const app = express()
const manager = new userManager('./../userManager/userCreate.json') 
// ? => /evento/:id
// * => /evento/3
app.get('/product', async (req, res) => {
    
    const usuarios = await manager.getUser();
    res.send(usuarios);
});
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const usuarios = await manager.getUser();
    res.send(usuarios);
});

app.listen(8080, () => {
    console.log("Conectados!");
});