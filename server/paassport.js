import passport from "passport";
import User from "./models/User";
import GitHubStrategy  from "passport-github";
import dotenv from "dotenv";
import { GITHUB_LOGIN_CALLBACK } from "./router/userRouter";

dotenv.config();

// 로그인 

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// 깃허브 로그인

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1000/user/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const { _json : { id , avatar_url, name, email } }  = profile;

  }
));