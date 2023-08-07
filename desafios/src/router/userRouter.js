import { Router } from "express";
import userManager from "../dao/userManager.js"

const manager = new userManager("user");
const userRouter = Router();

//

userRouter.get("/api/users", async (req, res) => {
    
    const user = await manager.getUser();
    res.send(user);
});
// * POST
userRouter.post("/api/usercreate", async (req, res) => {
    const {body} = req;
    await manager.createUser(body)
    res.send(body)
})
// quedamos en el minuto 01:22
userRouter.get("/api/usercreate/:id", async (req, res) => {
    const { id } = req.params;
    const { ocultarPassword } = req.query;
    const user = await manager.getUser();
    res.send(user.find((user) => user.id == id));
});

export default userRouter;