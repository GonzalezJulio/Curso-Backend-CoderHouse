import passport from "passport";
import local from "passport-local"
import userManager from "../dao/mongodb/userManager.js";
const UserManager = new userManager();

local.Strategy;

const InitLocalStrategy = () => {
    passport.use(
        "register",
        new local.Strategy(
            {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const userExists = await UserManager.getUserByName(username);
            if (!!userExists) return done(null, false);
            const { nombre, apellido } = req.body;
            
            const user = await UserManager.createUser({
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
   
    // login strategy

    passport.use(
        "login",
        new local.Strategy(
            {
         passReqToCallback: true,
        },
        async(req, username, password, done) => {
            const user = UserManager.validateUser(username, password);
            if(!user) return done("Credenciales no Validas");
            return done(null, user.toObject());
        }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserManager.getUserById(id);
        done(null, user);
    });
};
export default InitLocalStrategy;