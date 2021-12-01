// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract SpartaBramNFTs is
    ERC1155,
    AccessControl,
    Pausable,
    ERC1155Burnable,
    ERC1155Supply
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string public collectionUri;

    uint256 private constant ALEX_SILVER = 0;
    uint256 private constant ALEX_GOLD = 1;
    uint256 private constant ALEX_ELECTRUM = 2;
    uint256 private constant ALEX_SPARTAN = 3;

    uint256 private constant ANAX_SILVER = 4;
    uint256 private constant ANAX_GOLD = 5;
    uint256 private constant ANAX_ELECTRUM = 6;
    uint256 private constant ANAX_SPARTAN = 7;

    uint256 private constant CLEO_SILVER = 8;
    uint256 private constant CLEO_GOLD = 9;
    uint256 private constant CLEO_ELECTRUM = 10;
    uint256 private constant CLEO_SPARTAN = 11;

    uint256 private constant LACE_SILVER = 12;
    uint256 private constant LACE_GOLD = 13;
    uint256 private constant LACE_ELECTRUM = 14;
    uint256 private constant LACE_SPARTAN = 15;

    uint256 private constant LEON_SILVER = 16;
    uint256 private constant LEON_GOLD = 17;
    uint256 private constant LEON_ELECTRUM = 18;
    uint256 private constant LEON_SPARTAN = 19;

    uint256 private constant ATHENA = 20;

    constructor(string memory _collectionUri, string memory _baseUri)
        ERC1155(_baseUri)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        collectionUri = _collectionUri; // CHANGE THIS TO THE METADATA FOR THE OVERALL COLLECTION WITH THE ARTIST FEE ETC

        _mint(_msgSender(), ALEX_SILVER, 36, ""); // Mint Silver
        _mint(_msgSender(), ALEX_GOLD, 14, ""); // Mint Gold
        _mint(_msgSender(), ALEX_ELECTRUM, 7, ""); // Mint Electrum
        _mint(_msgSender(), ALEX_SPARTAN, 3, ""); // Mint Spartan

        _mint(_msgSender(), ANAX_SILVER, 36, ""); // Mint Silver
        _mint(_msgSender(), ANAX_GOLD, 14, ""); // Mint Gold
        _mint(_msgSender(), ANAX_ELECTRUM, 7, ""); // Mint Electrum
        _mint(_msgSender(), ANAX_SPARTAN, 3, ""); // Mint Spartan

        _mint(_msgSender(), CLEO_SILVER, 36, ""); // Mint Silver
        _mint(_msgSender(), CLEO_GOLD, 14, ""); // Mint Gold
        _mint(_msgSender(), CLEO_ELECTRUM, 7, ""); // Mint Electrum
        _mint(_msgSender(), CLEO_SPARTAN, 3, ""); // Mint Spartan

        _mint(_msgSender(), LACE_SILVER, 36, ""); // Mint Silver
        _mint(_msgSender(), LACE_GOLD, 14, ""); // Mint Gold
        _mint(_msgSender(), LACE_ELECTRUM, 7, ""); // Mint Electrum
        _mint(_msgSender(), LACE_SPARTAN, 3, ""); // Mint Spartan

        _mint(_msgSender(), LEON_SILVER, 36, ""); // Mint Silver
        _mint(_msgSender(), LEON_GOLD, 14, ""); // Mint Gold
        _mint(_msgSender(), LEON_ELECTRUM, 7, ""); // Mint Electrum
        _mint(_msgSender(), LEON_SPARTAN, 3, ""); // Mint Spartan
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // CUSTOM FUNCTIONS
    function setCollectionUri(string memory _collectionUri)
        external
        onlyRole(URI_SETTER_ROLE)
    {
        collectionUri = _collectionUri;
    }

    function mintAthena(address to, uint256 amount) external {
        // ADD LOGIC TO MINT THIS SPECIAL EDITION/TBD
        mint(to, ATHENA, amount, "");
    }
}
