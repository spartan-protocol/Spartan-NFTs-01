const { assert, expect } = require("chai");

let MINTER_ROLE = ethers.utils.toUtf8Bytes("MINTER_ROLE");
MINTER_ROLE = ethers.utils.keccak256(MINTER_ROLE);

async function accounts() {
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
  return [addr, sign];
}

async function contracts(sign) {
  const NftContract = await ethers.getContractFactory("SpartaBramAlex");
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
  return [
    contractDeployer,
    contractMintman,
    contractPauseMan,
    contractUriLady,
    contractPlebMan,
  ];
}

describe("Deploy & check contract details", function () {
  it("Contract name: SpartaBram - Alexios", async function () {
    const [addr, sign] = await accounts();
    const [contractDeployer, , , , ,] = await contracts(sign);
    assert.equal(await contractDeployer.name(), "SpartaBram - Alexios");
  });

  it("Contract symbol: SP-ALEX", async function () {
    const [addr, sign] = await accounts();
    const [contractDeployer, , , , ,] = await contracts(sign);
    assert.equal(await contractDeployer.symbol(), "SP-ALEX");
  });
});

describe("Test safeMint & batchMint", function () {
  it("Deployer receives 60 Alexios NFTs", async function () {
    const [addr, sign] = await accounts();
    const [contractDeployer, , , , ,] = await contracts(sign);
    assert.equal(await contractDeployer.balanceOf(addr.deployer), 60);
  });

  const mintQty = 1;
  it(
    "Deployer mints & receives " + mintQty + " more manually",
    async function () {
      const [addr, sign] = await accounts();
      const [contractDeployer, , , , ,] = await contracts(sign);
      await contractDeployer.batchMint(addr.deployer, mintQty);
      assert.equal(
        await contractDeployer.balanceOf(addr.deployer),
        60 + mintQty
      );
      await contractDeployer.safeMint(addr.deployer);
      assert.equal(
        await contractDeployer.balanceOf(addr.deployer),
        60 + mintQty + 1
      );
    }
  );

  it("Non-deployer can't mint!", async function () {
    const [addr, sign] = await accounts();
    const [, contractMintman, , , ,] = await contracts(sign);
    await expect(contractMintman.batchMint(addr.minter, mintQty)).to.be
      .reverted;
    await expect(contractMintman.safeMint(addr.minter)).to.be.reverted;
  });

  it("Non-deployer is given minter role and mints + receives", async function () {
    const [addr, sign] = await accounts();
    const [contractDeployer, contractMintman, , , ,] = await contracts(sign);
    await contractDeployer.grantRole(MINTER_ROLE, addr.minter);
    await contractMintman.batchMint(addr.minter, mintQty);
    assert.equal(await contractMintman.balanceOf(addr.minter), mintQty);
    await contractMintman.safeMint(addr.minter);
    assert.equal(await contractMintman.balanceOf(addr.minter), mintQty + 1);
  });
});
