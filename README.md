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

Don't forget to `npm install` before you run the program first time!

Currently supported (blockchain - standard)
1. solana - metaplex
2. ethereum - erc721