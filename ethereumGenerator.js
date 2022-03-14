const fs = require("fs")
const sharp = require("sharp")

exports.run = (config) => {
  if (config.standard === "erc721") checkConfig(config, erc721)
  else console.log(`\u001b[1;31mStandard not implemented - \u001b[1;33m${config.standard}\u001b[0m`)
}

const checkConfig = (config, callback) => {
  console.log('Checking config ...')
  if (!checkRarityConfig(config)) return;
  console.log('Config is valid ...')
  callback(config)
}

const checkRarityConfig = ({
  layers
}) => {
  let noError = true
  layers.forEach(layer => {
    if (Object.values(layer.rarities).reduce((a, b) => a + b, 0).toPrecision(6) !== 1.0.toPrecision(6)) {
      console.log(`\u001b[1;31mLayer rarities do not add up to 100% (1.0)\u001b[0m - \u001b[1;33m${layer.layer}\u001b[0m`)
      noError = false
    }
    const layerFiles = Object.keys(layer.rarities)
    for (let i = 0; i < layerFiles.length; i++) {
      if (!fs.existsSync(`./assets/${layer.layer}/${layerFiles[i]}`)) {
        console.log(`\u001b[1;31mLayer file does not exist under layer folder \u001b[1;34m${layer.layer}\u001b[1;31m > \u001b[1;33m${layerFiles[i]}\u001b[0m`)
        noError = false
      }
    }
  })
  return noError
}

const erc721 = ({
  name,
  description,
  url,
  count,
  offset,
  layers
}) => {
  console.log(`Generating ${count} Ethereum NFTs ...`)
  for (let i = offset; i < count + offset; i++) {
    const attributes = []
    layers.forEach(layer => {
      attributes.push({
        "trait_type": layer.layer,
        "value": getRandomForLayer(layer.layer, layer.rarities)
      })
    })

    const metadata = {
      "name": `${name} #${i}`,
      "description": description,
      "external_url": url,
      "image": `${i}.png`,
      "attributes": attributes
    }

    fs.writeFile(`./out/${i}.json`, JSON.stringify(metadata, null, 4), (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Metadata generated for ${i}.png`)
      createImageFromLayers(attributes, i, "png")
    })
  }
}

const getRandomForLayer = (layer, rarities) => {
  const layerFiles = Object.keys(rarities)
  const layerRarities = Object.values(rarities)
  let roulette = 0
  const hit = Math.random()
  for (let i = 0; i < layerRarities.length; i++) {
    if (hit < roulette + layerRarities[i]) return layerFiles[i].split(".png")[0]
    roulette += layerRarities[i]
  }
  console.log(`\u001b[1;31mCould not get random layer file for ${layer}\u001b[0m`)
}

const createImageFromLayers = (layers, fileName, fileType) => {
  const layerImages = []
  for (let i = 1; i < layers.length; i++) {
    layerImages.push({
      input: `./assets/${layers[i]["trait_type"]}/${layers[i].value}.${fileType}`
    })
  }
  sharp(`./assets/${layers[0]["trait_type"]}/${layers[0].value}.${fileType}`)
    .composite(layerImages)
    .toFile(`./out/${fileName}.${fileType}`)

  console.log(`Image generated for ${fileName}.${fileType}`)
}