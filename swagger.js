const swaggerAutogen = require("swagger-autogen")()

const doc = {
  info: {
    title: "ToolTrack API",
    description: "API documentation for ToolTrack project"
  },
  host: "tooltrack-api.onrender.com",
  schemes: ["https"]
}

const outputFile = "./swagger.json"
const routes = ["./routes/index.js"]

swaggerAutogen(outputFile, routes, doc)