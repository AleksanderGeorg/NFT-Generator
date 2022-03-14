const config = require("./config.json")

try {
  const generator = require(`./${config.blockchain}Generator.js`)
  generator.run(config)
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    const supported = require("./supported.json")
    console.log(`\u001b[1;31mConfig is set to generate NFTs on invalid blockchain - ${config.blockchain}\u001b[0m\nCurrently supported (blockchain - standard):\n${supported.blockchains.join("\n")}`)
  } else {
    console.log(error)
    console.log(`\u001b[1;31mUnknown error in config.json\u001b[0m`)
  }
}