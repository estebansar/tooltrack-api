const express = require("express")
const dotenv = require("dotenv")

const mongodb = require("./data/database")

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

// This middleware allows the API to read JSON data
app.use(express.json())

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