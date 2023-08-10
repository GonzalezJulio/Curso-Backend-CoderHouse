import fs from "fs"
import crypto from "crypto"
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../models/user.model.js"
import mongoose from "mongoose";
const __dirname = dirname(fileURLToPath(import.meta.url));


mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
console.log('Conectado mongoose userManager')

export default class userManager {

    constructor () {}
    async getUser() {
        try {
          
          const users = await userModel.find();
          return users;
        } catch (e) { 
          return [];
        }
      }

    async updateUser(username, profile_picture) {
      const user = await userModel.findOne({username})
      
    };

    // usuario = {name, lastname, user, password } 
  
    async createUser(users) {
      users.salt = crypto.randomBytes(128).toString("base64");
      users.password = crypto
        .createHmac("sha256", users.salt)
        .update(users.password)
        .digest("hex");
        userModel.create(users)
        console.log(users)
      const user = await userModel.insertMany([users]);
      return user;

    
    }

    async validateUser(username, password) {
      
      const user = await userModel.findOne({ username })
      if (!user) return "Error, usuario no exite!";
      
      const loginHash = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

      return loginHash == user.password
      ? "Usuario Loggeado!"
      : "usuario/contrase;a incorrecta";
    }

    async deleteUser(username) {
      const users = await userModel.indOne({ username })
        return users;
    }
}