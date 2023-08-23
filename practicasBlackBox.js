import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/userManager.js";
const User = new UserManager();
local.Strategy;
// * => username, password
const InitLocalStrategy = () => {
  // * register
  passport.use(
    "register",
    new local.Strategy(
      {
        passReqToCallback: true,
        // usernameField: 'email'
      },
      async (req, username, password, done) => {
        const userExists = await User.getUsuarioByName(username);

        if (userExists) return done(null, false);

        const { nombre, apellido } = req.body;

        const user = await User.crearUsuario({
          nombre,
          apellido,
          username,
          password,
          role: username == "admincoder@coder.com" ? "admin" : "user",
        });

        return done(null, user.toObject());
      }
    )
  );

  // * login
  passport.use(
    "login",
    new local.Strategy(
      {
        passReqToCallback: true,
        // usernameField: 'email'
      },
      async (req, username, password, done) => {
        const user = User.validarUsuario(username, password);
        if (!user) return done("credenciales no validas!");

        return done(null, user.toObject());
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.getUsuarioById(id);
    done(null, user);
  });
};
export default InitLocalStrategy;




import crypto from "crypto";
import mongoose from "mongoose";
import UserModel from "../../model/user.model.js";
import bcrypt from "bcrypt";
export default class UserManager {
  constructor() {}

  async getUsuarios() {
    const users = await UserModel.find();

    return users;
  }
  async getUsuarioByName(username) {
    return await UserModel.findOne({ username });
  }

  async recoverUserPassword(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return true;
  }

  // minor
  async updateUser(username, password) {
    const user = await UserModel.findOne({ username });
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
    // res.render("index", { prod: products });
  }

  // * usuario = {nombre, apellido, username, password, avatar}

  async crearUsuario(usuario) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
    const user = await UserModel.create(usuario);
    return user;
  }

  // *
  async validarUsuario(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) return false;
    const isEqual = await bcrypt.compare(password, user.password);
    return isEqual ? user.toObject() : false;
  }
}