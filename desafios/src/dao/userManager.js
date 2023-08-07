import fs from "fs"
import crypto from "crypto"
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../schemas/user.model.js"
import mongoose from "mongoose";
const __dirname = dirname(fileURLToPath(import.meta.url));


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
    async createUser(users){
        
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto
        .createHmac("sha256", user.salt)
        .update(user.password)
        .digest("hex")
        userModel.create(user)
        const user = await userModel.insertMany([users])
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
}