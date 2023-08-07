import express from "express";
import userManager from "./userManager.js";
const app = express()
const manager = new userManager("userCreate")
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

app.get("/userCreate", async (req, res) => {
    
    const user = await manager.getUser();
    res.send(user);
});
// * POST
app.post("/userCreate", async (req, res) => {
    const {body} = req;
    await manager.createUser(body)
    res.send(body)
})
// quedamos en el minuto 01:22
app.get("/userCreate/:id", async (req, res) => {
    const { id } = req.params;
    const { ocultarPassword } = req.query;
    const user = await manager.getUser();
    res.send(user.find((user) => user.id == id));
});

app.listen(8080, () => {
    console.log("Conectados!");
});