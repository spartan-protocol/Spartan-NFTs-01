yarn hardhat compile

## Spin up local Hardhat Network:
- yarn hardhat node

## (Open new terminal and then:) Run scripts:
- yarn hardhat run --network localhost [script-name]
- ie. yarn hardhat run --network localhost scripts/deploy.js

## Open console session with local blockchain:
- yarn hardhat console --network localhost

## INITIAL/SMALL QUERIES VIA CONSOLE:
Attach contract (in console):
- const Box = await ethers.getContractFactory('Box');
- const box = await Box.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')

Interact with contract (in console):
- await box.store(42)
- await box.retrieve()              // BigNumber
- (await box.retrieve()).toString() // String

## PROPER INTERACTIONS USING JS SCRIPTS (AUTOMATED TESTING ETC):
- yarn hardhat run --network localhost scripts/index.js 

## RUN ALL TESTS
- yarn hardhat test

## REF MATERIAL
- https://docs.openzeppelin.com/learn/developing-smart-contracts
- https://docs.openzeppelin.com/contracts/4.x/api/token/erc1155
- https://docs.opensea.io/docs/contract-level-metadata
- https://docs.opensea.io/docs/metadata-standards
- https://github.com/ProjectOpenSea/opensea-erc1155/tree/master/contracts