const fs = require("fs")

let data
try {
  if (process.argv[2].includes(".data.txt")) data = fs.readFileSync(`./${process.argv[2]}`).toString()
  if (data === undefined) data = fs.readFileSync("./data.txt").toString()
  createMeta()
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND" && error.message.match(/Cannot find module '.\/(.*?)data.txt'/).length > 0) {
    console.log(`\u001b[1;31mYou have not set up a data.txt or <FILENAME>.data.txt\u001b[0m`)
  } else {
    console.log(error)
    console.log(`\u001b[1;31mUnknown error with requiring a data file!\u001b[0m`)
  }
}

function createMeta() {
  try {
    console.log(`\u001b[1;33mProcessing ${process.argv[0].includes(".data.txt") ? process.argv[0] : 'data.txt'} file ...\u001b[0m`)
    const dataByLayers = data.split('\r\n\r\n')
    const output = []
    for (let i = 0; i < dataByLayers.length; i++) {
      const dataRows = dataByLayers[i].split('\n')
      const layerTitle = dataRows[0].trim()
      const dataObject = {}
      for (let i = 1; i < dataRows.length; i++) {
        const dataRow = dataRows[i].split(/\s+/)
        if (dataRow[dataRow.length - 1] === '') dataRow.pop()
        if (dataRow.length === 2) {
          dataObject[`${dataRow[0]}.png`] = dataRow[1].indexOf('%') !== -1 ? dataRow[1].replace('%', '') / 100 : dataRow[1] / 100
        } else if (dataRow.length > 2) {
          let key = dataRow[0]
          for (let j = 1; j < dataRow.length - 1; j++) {
            key += ' ' + dataRow[j]
          }
          dataObject[`${key}.png`] = dataRow[dataRow.length - 1].indexOf('%') !== -1 ? dataRow[dataRow.length - 1].replace('%', '') / 100 : dataRow[dataRow.length - 1] / 100
        } else if (dataRow.length !== 0) {
          throw new Error(`\u001b[1;31mInvalid data on row ${i + 1} - ${dataRows[i]}\u001b[0m`)
        }
      }
  
      console.log(`\u001b[1;33mParsed metadata for layer ${layerTitle}\u001b[0m`)
      output.push({
        layer: layerTitle,
        rarities: dataObject
      })
    }
  
    console.log(`\u001b[1;32mSuccessfully parsed data file!\u001b[0m`)
    //console.log(JSON.stringify(output, null, 2))
    fs.writeFileSync('out/meta.json', JSON.stringify(output, null, 2))
  } catch (error) {
    console.log(error)
  }
}
