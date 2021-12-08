const truffleAssert = require("truffle-assertions");

async function main() {
  const ALEX_SILVER = 0;
  const ALEX_GOLD = 1;
  const ALEX_ELECTRUM = 2;
  const ALEX_SPARTAN = 3;

  const ANAX_SILVER = 4;
  const ANAX_GOLD = 5;
  const ANAX_ELECTRUM = 6;
  const ANAX_SPARTAN = 7;

  const CLEO_SILVER = 8;
  const CLEO_GOLD = 9;
  const CLEO_ELECTRUM = 10;
  const CLEO_SPARTAN = 11;

  const LACE_SILVER = 12;
  const LACE_GOLD = 13;
  const LACE_ELECTRUM = 14;
  const LACE_SPARTAN = 15;

  const LEON_SILVER = 16;
  const LEON_GOLD = 17;
  const LEON_ELECTRUM = 18;
  const LEON_SPARTAN = 19;

  const ATHENA = 20;

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
  const NftContract = await ethers.getContractFactory("SpartaBramNFTs");
  console.log("--- Deploying Sparta<>Bram NFTs ---");
  const contractDeployer = await NftContract.deploy(
    "https://nfts.spartanprotocol.org/spartabram01/index.json", // Collection URI
    "https://nfts.spartanprotocol.org/spartabram01/{id}.json" // Base URI
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

  console.log("Sparta<>Bram NFTs deployed to:", contractDeployer.address);

  console.log("--- Check balance of Alex NFTs ---");
  let balance = await contractDeployer.balanceOf(addr.deployer, ALEX_SILVER);
  console.log(addr.deployer, "has", balance.toString(), "ALEX_SILVER NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ALEX_GOLD);
  console.log(addr.deployer, "has", balance.toString(), "ALEX_GOLD NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ALEX_ELECTRUM);
  console.log(addr.deployer, "has", balance.toString(), "ALEX_ELECTRUM NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ALEX_SPARTAN);
  console.log(addr.deployer, "has", balance.toString(), "ALEX_SPARTAN NFTs");

  console.log("--- Check balance of Anax NFTs ---");
  balance = await contractDeployer.balanceOf(addr.deployer, ANAX_SILVER);
  console.log(addr.deployer, "has", balance.toString(), "ANAX_SILVER NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ANAX_GOLD);
  console.log(addr.deployer, "has", balance.toString(), "ANAX_GOLD NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ANAX_ELECTRUM);
  console.log(addr.deployer, "has", balance.toString(), "ANAX_ELECTRUM NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ANAX_SPARTAN);
  console.log(addr.deployer, "has", balance.toString(), "ANAX_SPARTAN NFTs");

  console.log("--- Check balance of Cleo NFTs ---");
  balance = await contractDeployer.balanceOf(addr.deployer, CLEO_SILVER);
  console.log(addr.deployer, "has", balance.toString(), "CLEO_SILVER NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, CLEO_GOLD);
  console.log(addr.deployer, "has", balance.toString(), "CLEO_GOLD NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, CLEO_ELECTRUM);
  console.log(addr.deployer, "has", balance.toString(), "CLEO_ELECTRUM NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, CLEO_SPARTAN);
  console.log(addr.deployer, "has", balance.toString(), "CLEO_SPARTAN NFTs");

  console.log("--- Check balance of Lace NFTs ---");
  balance = await contractDeployer.balanceOf(addr.deployer, LACE_SILVER);
  console.log(addr.deployer, "has", balance.toString(), "LACE_SILVER NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LACE_GOLD);
  console.log(addr.deployer, "has", balance.toString(), "LACE_GOLD NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LACE_ELECTRUM);
  console.log(addr.deployer, "has", balance.toString(), "LACE_ELECTRUM NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LACE_SPARTAN);
  console.log(addr.deployer, "has", balance.toString(), "LACE_SPARTAN NFTs");

  console.log("--- Check balance of Leon NFTs ---");
  balance = await contractDeployer.balanceOf(addr.deployer, LEON_SILVER);
  console.log(addr.deployer, "has", balance.toString(), "LEON_SILVER NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LEON_GOLD);
  console.log(addr.deployer, "has", balance.toString(), "LEON_GOLD NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LEON_ELECTRUM);
  console.log(addr.deployer, "has", balance.toString(), "LEON_ELECTRUM NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, LEON_SPARTAN);
  console.log(addr.deployer, "has", balance.toString(), "LEON_SPARTAN NFTs");

  console.log("--- Check -> Mint -> Check: Athena NFTs ---");
  balance = await contractDeployer.balanceOf(addr.deployer, ATHENA);
  console.log(addr.deployer, "has", balance.toString(), "ATHENA NFTs");
  const athenaMintQty = 1;
  await contractDeployer.mintAthena(addr.deployer, athenaMintQty);
  console.log(addr.deployer, "was minted", athenaMintQty, "ATHENA NFTs");
  balance = await contractDeployer.balanceOf(addr.deployer, ATHENA);
  console.log(addr.deployer, "has", balance.toString(), "ATHENA NFTs");

  console.log(
    "--- Test: addr.minter Should NOT be able to mint Athena NFTs ---"
  );
  balance = await contractMintman.balanceOf(addr.minter, ATHENA);
  console.log(addr.minter, "has", balance.toString(), "ATHENA NFTs");
  await truffleAssert.fails(
    contractMintman.mintAthena(addr.minter, athenaMintQty)
  );
  console.log(
    addr.minter,
    "tried to mint",
    athenaMintQty,
    "ATHENA NFTs & failed (PASS!)"
  );
  balance = await contractMintman.balanceOf(addr.minter, ATHENA);
  console.log(addr.minter, "still has", balance.toString(), "ATHENA NFTs");

  console.log("--- Give addr.minter the MINTER_ROLE ---");
  await contractDeployer.grantRole(MINTER_ROLE, addr.minter);
  console.log(addr.minter, "has the ability to MINT now");

  console.log(
    "--- Test: addr.minter Should now be able to mint Athena NFTs ---"
  );
  await contractMintman.mintAthena(addr.minter, athenaMintQty);
  console.log(addr.minter, "was minted", athenaMintQty, "ATHENA NFTs");
  balance = await contractMintman.balanceOf(addr.minter, ATHENA);
  console.log(addr.minter, "has", balance.toString(), "ATHENA NFTs");

  console.log("--- Check URIs ---");
  let uri = await contractDeployer.uri(ALEX_SILVER);
  console.log("NFT 0's URI =", uri);
  uri = await contractDeployer.uri(ALEX_GOLD);
  console.log("NFT 1's URI =", uri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
