NFT Generator

Simple NFT generator for various blockchains.

How to use for generating:
1. Set up config.json or any number of <FILENAME>.config.json
2. Import assets into folder "assets" (you can delete .gitkeep if you want)
3. Run in console `npm run generate` or `npm run generate -- <FILENAME>.config.json`
4. Matadata and NFT images will be generated into folder "out"

How to use for matching metadata with NFT images:
1. Run in console `npm run check`
2. The script will check for matching discrepancies between metadata and NFT files in "out" folder

How to use to generate NFT rarities JSON data from plain text:
1. Create and fill a file <FILENAME>.data.txt or data.txt with your data
  - Each layer should be separated by newline
  - First line of each layer should be the layer name with no spaces
  - All other lines should be the data for that layer in the format:
    <LAYER_NAME> <RARITY_PERCENTAGE>
  - Layer name can have spaces
  - Rarity percentage should be a number between 0 and 100 and end with % OR number between 0 and 1 without the leading %
  - Rarity percentages can have decimals
2. Run in console `npm run create-meta` or `npm run create-meta -- <FILENAME>.data.txt`
3. Rarities JSON data will be generated into file "out/meta.json"

Don't forget to `npm install` before you run the program first time!

Currently supported (blockchain - standard)
1. solana - metaplex
2. ethereum - erc721
