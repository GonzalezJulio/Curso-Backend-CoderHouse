import passport from 'passport';
import UserDTO from '../controllers/DTO/users.dto.js';
import userModel from '../models/schemas/user.model.js';
import gitHubService from 'passport-github2';

//github
passport.use('github', new gitHubService({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('passport strat GitHubService profile is:');
        console.log(profile);
        let exists = await userModel.findOne({ email: profile._json.email });
        if (!exists) {
            let userRegisterData = {
                name: profile._json.login,
                lastname: '',
                age: '',
                email: profile._json.email,
                password: '',
            };
            const newUser = await UserDTO.createUser(userRegisterData);
            let result = await userModel.create(newUser);
            done(null, result);
        } else {
            done(null, exists);
        }
    } catch (error) {
        return done(error);
    }
}));
