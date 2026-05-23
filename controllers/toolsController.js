const mongodb = require("../data/database")

// This gets all tools from the tools collection
const getAllTools = async (req, res) => {
  const result = await mongodb.getDb().collection("tools").find()

  result.toArray().then((tools) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tools)
  })
}

module.exports = {
  getAllTools
}