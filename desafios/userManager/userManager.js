import fs from "fs"
import crypto from "crypto"

class userManager {

    constructor () {
        this.userManager = [];
        this.file = "./userCreate.json"
    }
    async getUser() {
        try {
            const data =  await fs.promises.readFile(this.file, "utf-8")
            const users = JSON.parse(data);
            return users;

        }catch (e) {
            await fs.promises.writeFile(this.file, JSON.stringify([]));
            return [];

        }
    }

    // usuario = {name, lastname, user, password } 
    async createUser(user){
        const users = await this.getUser();
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto
        .createHmac('sha256', user.salt)
        .update(user.password)
        .digest('hex')

        users.push(user)
        await fs.promises.writeFile(this.file, JSON.stringify(users))

    }

    async validateUser(username, password) {

    }
}

const users = new userManager('./userCreate.json')
await users.createUser ({
    name: "Julio",
    lastname: "Gonzalez",
    user: "Aresden113",
    password: "coder1234",

})

