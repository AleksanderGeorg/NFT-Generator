const config = require("./config.json")
const generator = require(`./${config.blockchain}Generator.js`)

generator.run(config)