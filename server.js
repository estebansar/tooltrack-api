const express = require("express")
const dotenv = require("dotenv")
const session = require("express-session") // Handles login sessions
const cors = require("cors") // Helps the browser send login session cookies --- need for be able to use post while we are login--lesson 8
const routes = require("./routes")

const mongodb = require("./data/database")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

dotenv.config()

const passport = require("./config/passport") // Uses our GitHub OAuth setup

const app = express()

const port = process.env.PORT || 3000

// This allows requests from my Render site to use the login session--- lesson 8
app.use(
  cors({
    origin: "https://tooltrack-api.onrender.com",
    credentials: true
  })
)

// This middleware allows the API to read JSON data from POST and PUT requests
app.use(express.json())

// This creates a session so users stay logged in- lesson 7--- updated in lesson 8- fixed the problem with post
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret from .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Render uses https--this will fix hte problem with swageer not showing correct the post -lesson 8
    }
  })
)

// Starts Passport authentication
app.use(passport.initialize())

// Allows Passport to use login sessions
app.use(passport.session())

// This connects my routes folder to the server
app.use("/", routes)

// This sets up the API documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Simple homepage route
app.get("/", (req, res) => {
  res.send("ToolTrack API is running")
})

// Starting the server only after MongoDB connects
mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  }
})