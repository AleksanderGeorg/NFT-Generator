const fs = require("fs")

console.log(`Checking if all metadata files have a matching NFT image file ...`)
const metadataFiles = fs.readdirSync(`./out`)
let notExisting = 0
for (let i = 0; i < metadataFiles.length; i++) {
  if (metadataFiles[i].includes(`.json`) && !fs.existsSync(`./out/${metadataFiles[i].split(".json")[0]}.png`)) {
    notExisting++
    console.log(`NFT image file does not exist for the existing metadata - \u001b[1;33m${metadataFiles[i]}\u001b[0m`)
  }
}

console.log(`Found ${notExisting === 0 ? "\u001b[1;32m0\u001b[0m" : `\u001b[1;31m${notExisting}\u001b[0m`} unmatched metadata files.`)