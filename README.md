yarn hardhat compile

## Spin up local Hardhat Network (For manual testing, not required if using --network hardhat):
- yarn hardhat node

## (Open new terminal and then:) Run scripts:
- yarn hardhat run --network hardhat [script-name]
- ie. yarn hardhat run --network hardhat scripts/alex721s.js 

## RUN ALL TESTS
- yarn hardhat test --network hardhat tests/Alex721.js 

## VALIDATE ON BSC TESTNET
- https://tofunft.com/tools/validator

## REF MATERIAL
- https://docs.openzeppelin.com/learn/developing-smart-contracts
- https://docs.openzeppelin.com/contracts/4.x/api/token/erc1155
- https://docs.opensea.io/docs/contract-level-metadata
- https://docs.opensea.io/docs/metadata-standards
- https://github.com/ProjectOpenSea/opensea-erc1155/tree/master/contracts