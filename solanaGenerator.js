const fs = require("fs")
const sharp = require("sharp")

exports.run = (config) => {
  if (config.standard === "metaplex") checkConfig(config, metaplex)
  else console.log(`\u001b[1;31mStandard not implemented - ${config.standard}\u001b[0m\nStopping generation ...`)
}

const checkConfig = (config, callback) => {
  if (false) {
    console.log(`\u001b[1;31mLayer ${0} rarities do not add up to 100% (1.0)\u001b[0m\nStopping generation ...`)
    return
  }
  callback(config)
}

const metaplex = ({
  name,
  symbol,
  description,
  count,
  fees,
  creators,
  offset,
  layers
}) => {
  console.log(`Generating ${count} Solana NFTs ...`)
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
      "symbol": symbol,
      "description": description,
      "seller_fee_basis_points": fees,
      "image": `${i}.png`,
      "attributes": attributes,
      "properties": {
        "creators": creators,
        "files": [{
          "uri": `${i}.png`,
          "type": "image/png"
        }]
      },
      "collection": {
        "name": name,
        "family": name
      }
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