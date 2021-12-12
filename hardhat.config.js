require("@nomiclabs/hardhat-waffle"); // INCLUDES ETHERS
require("hardhat-gas-reporter");
const dotenv = require('dotenv');
dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  gasReporter: {
    currency: "USD",
    token: "BNB",
    gasPrice: 6,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};
