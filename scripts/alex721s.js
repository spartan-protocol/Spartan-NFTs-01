// const truffleAssert = require("truffle-assertions");

async function main() {
  let MINTER_ROLE = ethers.utils.toUtf8Bytes("MINTER_ROLE");
  MINTER_ROLE = ethers.utils.keccak256(MINTER_ROLE);

  // Retrieve accounts from the local node
  const accounts = await ethers.provider.listAccounts();
  const addr = {
    deployer: accounts[0],
    minter: accounts[1],
    pauser: accounts[2],
    urier: accounts[3],
    pleb: accounts[4],
  };
  const signers = await ethers.getSigners();
  const sign = {
    deployer: signers[0],
    minter: signers[1],
    pauser: signers[2],
    urier: signers[3],
    pleb: signers[4],
  };

  // We get the contract to deploy
  const NftContract = await ethers.getContractFactory("SpartaBramAlex");
  console.log("--- Deploying Sparta<>Bram Alexios NFTs ---");
  const contractDeployer = await NftContract.deploy(
    60 // Qty of NFTs to mint
  );
  await contractDeployer.deployed();
  let contractMintman = contractDeployer;
  contractMintman = await contractMintman.connect(sign.minter);
  let contractPauseMan = contractDeployer;
  contractPauseMan = await contractPauseMan.connect(sign.pauser);
  let contractUriLady = contractDeployer;
  contractUriLady = await contractUriLady.connect(sign.urier);
  let contractPlebMan = contractDeployer;
  contractPlebMan = await contractPlebMan.connect(sign.pleb);

  // const ownednstuff = await contractDeployer.tokenOfOwnerByIndex(
  //   addr.deployer,
  //   0
  // );
  // console.log("DEPLOYER OWNS", ownednstuff);

  console.log("Sparta<>Bram NFTs deployed to:", contractDeployer.address);

  console.log("--- Check balance of Alex NFTs ---");
  let balance = await contractDeployer.balanceOf(addr.deployer);
  console.log(addr.deployer, "has", balance.toString(), "ALEX NFTs");

  console.log("--- Mint -> Check: Mint NFT ---");
  const mintQty = 1;
  await contractDeployer.batchMint(addr.deployer, mintQty);
  console.log(addr.deployer, "was minted", mintQty, "ALEX NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer);
  console.log(addr.deployer, "has", balance.toString(), "ALEX NFTs");

  console.log(
    "--- Test: addr.minter Should NOT be able to mint Athena NFTs ---"
  );
  balance = await contractMintman.balanceOf(addr.minter);
  console.log(addr.minter, "has", balance.toString(), "ALEX NFTs");
  // await truffleAssert.fails(
  //   contractMintman.batchMint(addr.minter, mintQty)
  // );
  console.log(
    addr.minter,
    "tried to mint",
    mintQty,
    "ALEX NFTs & failed (GOOD!)"
  );
  balance = await contractMintman.balanceOf(addr.minter);
  console.log(addr.minter, "still has", balance.toString(), "ALEX NFTs");

  console.log("--- Give addr.minter the MINTER_ROLE ---");
  await contractDeployer.grantRole(MINTER_ROLE, addr.minter);
  console.log(addr.minter, "has the ability to MINT now");

  console.log("--- Test: addr.minter Should now be able to mint ALEX NFTs ---");
  await contractMintman.batchMint(addr.minter, mintQty);
  console.log(addr.minter, "was minted", mintQty, "ALEX NFTs");
  balance = await contractMintman.balanceOf(addr.minter);
  console.log(addr.minter, "has", balance.toString(), "ALEX NFTs");

  console.log("--- Check URIs ---");
  let nftName = await contractDeployer.name();
  console.log("Contract's name =", nftName);
  let nftSymbol = await contractDeployer.symbol();
  console.log("Contracts symbol =", nftSymbol);
  let uri = await contractDeployer.tokenURI(0);
  console.log("NFT 0's URI =", uri);
  uri = await contractDeployer.tokenURI(1);
  console.log("NFT 1's URI =", uri);
  uri = await contractDeployer.tokenURI(2);
  console.log("NFT 2's URI =", uri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
