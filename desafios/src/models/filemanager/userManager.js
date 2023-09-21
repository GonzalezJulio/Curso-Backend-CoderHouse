import crypto from "crypto"
import mongoose from "mongoose";
import userModel from "../models/user.model.js"
import bcrypt  from "bcrypt"

export default class userManager {

    constructor () {}
    
    async getUser() {
       const users = await userModel.find();
       return users;
    }
    
    async getUserByName(username) {
      return await userModel.findOne({ username });
    }
    
    async recoverUserPassword (username, password) {
      const user = await userModel.findOne({ username });
      if(!user) throw new Error("Usuario no encontrado");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt )
      await user.save();
      return true;
    }

    async updateUser(username, password) {
      const user = await userModel.findOne({ username });
      user.user.avatar = profile_picture;
      await user.save();
      const userObject = user.toObject();
      const userJSON = await model.find({});
      res.render("index", { prod: products } )
      
    };

    // usuario = {name, lastname, user, password } 
  
    async createUser(users) {
      const salt = await bcrypt.genSalt(10);
      users.password = await bcrypt.hash(users.password, salt);
        
      const user = await userModel.create(users);
      return user;
    }

    async validateUser(username, password) {
      const user = await userModel.findOne({ username });
      if (!user) return false;
      const isEqual = await bcrypt.compare(password, user.password);
      return isEqual ? user.toObject() : false;
    }

    async deleteUser(username) {  
      const users = await userModel.deleteOne({ username })
        return users;
    }
}