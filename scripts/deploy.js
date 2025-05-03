const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the CanicasGame contract
  const CanicasGame = await hre.ethers.getContractFactory("CanicasGame");
  
  // For local development, we'll use mock values
  const vrfCoordinator = "0x0000000000000000000000000000000000000000";
  const keyHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
  const subscriptionId = 0;

  const canicasGame = await CanicasGame.deploy(
    vrfCoordinator,
    keyHash,
    subscriptionId
  );

  await canicasGame.deployed();

  console.log("CanicasGame deployed to:", canicasGame.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 