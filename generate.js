let config
try {
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i].includes(".config.json")) config = require(`./${process.argv[i]}`)
  }
  if (config === undefined) config = require("./config.json")
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND" && error.message.match(/Cannot find module '.\/(.*?)config.json'/).length > 0) {
    console.log(`\u001b[1;31mYou have not set up a config.json or <FILENAME>.config.json\u001b[0m`)
  } else {
    console.log(error)
    console.log(`\u001b[1;31mUnknown error with requiring a config file!\u001b[0m`)
  }
}

try {
  if (config !== undefined) {
    const generator = require(`./${config.blockchain}Generator.js`)
    generator.run(config)
  }
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND" && error.message.includes(`Cannot find module './${config.blockchain}Generator.js'`)) {
    const supported = require("./supported.json")
    console.log(`\u001b[1;31mConfig is set to generate NFTs on an invalid blockchain - \u001b[1;33m${config.blockchain}\u001b[0m\nCurrently supported (blockchain - standard):\n${supported.blockchains.join("\n")}`)
  } else if (error.code === "MODULE_NOT_FOUND") {
    console.log(`\u001b[1;31mYou have not done \`npm install\`\u001b[0m`)
  } else {
    console.log(error)
    console.log(`\u001b[1;31mUnknown error in your config file!\u001b[0m`)
  }
}