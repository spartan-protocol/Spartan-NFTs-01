// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract SpartaBramNFTs is ERC1155 {
    uint256 public constant SILVER = 0;
    uint256 public constant GOLD = 1;
    uint256 public constant ELECTRUM = 2;
    uint256 public constant SPARTAN = 3;

    constructor() {
        // SET ACCESS ETC FOR MINTING/ADMIN
    }

    function contractURI() public view returns (string memory) {
        return "https://.json"; // CHANGE THIS TO THE METADATA FOR THE OVERALL COLLECTION WITH THE SELLER FEE ETC
    }

    function mintAlexios() external {
        // ADD LOGIC TO MINT ALL EDITIONS OF ALEXIOS
    }

    function mintAnaxandrides() external {
        // ADD LOGIC TO MINT ALL EDITIONS OF
    }

    function mintCleomenes() external {
        // ADD LOGIC TO MINT ALL EDITIONS OF
    }

    function mintLacedaemon() external {
        // ADD LOGIC TO MINT ALL EDITIONS OF
    }

    function mintLeonidas() external {
        // ADD LOGIC TO MINT ALL EDITIONS OF
    }

    function mintAthena() external {
        // ADD LOGIC TO MINT THIS SPECIAL EDITION/TBD
    }
}
