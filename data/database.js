const dotenv = require("dotenv")
dotenv.config()

const MongoClient = require("mongodb").MongoClient

let _db

// This connects my project to MongoDB Atlas
const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized")
    return callback(null, _db)
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db("tooltrackDB")
      console.log("Connected to MongoDB")
      callback(null, _db)
    })
    .catch((err) => {
      callback(err)
    })
}

// This lets my controllers use the database connection
const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized")
  }
  return _db
}

module.exports = {
  initDb,
  getDb
}