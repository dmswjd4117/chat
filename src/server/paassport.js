import passport from "passport";
import User from "./models/User";
import GitHubStrategy  from "passport-github";
import dotenv from "dotenv";

dotenv.config();

// 로그인 
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// 깃허브 로그인 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1000/user/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const { _json : { id , avatar_url, name, email } }  = profile;
    console.log(email, profile._json.email )
    console.log(profile)
    try{
      const user = await User.findOne({email});
      if(user){
        user.githubId = id;
        user.save();
        return cb(null, user);
      }
      const newUser = await User.create({
        name,
        email,
        avataUrl : avatar_url,
        githubId : id
      });
      return cb(null, newUser)
    }catch(err){
      cb(err)
    }
  }
));