import fs from "fs"
import crypto from "crypto"

export default class userManager {

    constructor (file) {
        this.file = `./db/${file}.json`;
    }
    async getUser() {
        try {
          const data = await fs.promises.readFile(this.file, "utf-8");
          const users = JSON.parse(data);
          return users;
        } catch (e) {
          await fs.promises.writeFile(this.file, JSON.stringify([]));
          return [];
        }
      }

    async updateUser() {};

    // usuario = {name, lastname, user, password } 
    async createUser(user){
        const users = await this.getUser();
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto
        .createHmac("sha256", user.salt)
        .update(user.password)
        .digest("hex")

        users.push(user)
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(users))
        } catch(e) {
            return "No se ha podido escrbir el archivo!"
        }

    }

    async validateUser(username, password) {
        const users = await this.getUser();
        const user = users.find((user) => user.name == username);
        if (!user) return "Error, usuario no exite!";
        const loginHash = crypto
        .createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

        return loginHash == user.password
        ? "Usuario Loggeado!"
        : "usuario/contrase;a incorrecta";
}
}