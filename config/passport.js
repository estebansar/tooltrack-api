const passport = require("passport")

// This strategy lets Passport use GitHub login
const GitHubStrategy = require("passport-github2").Strategy

// Shows the callback URL being used
console.log("Callback URL:", process.env.GITHUB_CALLBACK_URL)

// This tells Passport how to log in with GitHub
passport.use(
  new GitHubStrategy(
    {
      // Reads the GitHub client id from .env
      clientID: process.env.GITHUB_CLIENT_ID,

      // Reads the GitHub secret from .env
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      // GitHub sends the user back to this route after login
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },

    // This runs after GitHub login is successful
    (accessToken, refreshToken, profile, done) => {

      // Shows the logged in GitHub user in the terminal
      console.log(profile)

      // Saves the user profile into the session
      return done(null, profile)
    }
  )
)

// Saves the user into the session
passport.serializeUser((user, done) => {
  done(null, user)
})

// Gets the user back out of the session
passport.deserializeUser((user, done) => {
  done(null, user)
})

// Exports passport so other files can use it
module.exports = passport
