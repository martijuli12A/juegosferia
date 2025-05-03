const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const PescaGame = await hre.ethers.getContractFactory("PescaGame");
  const pescaGame = await PescaGame.deploy(
    "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", // VRF Coordinator
    "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // LINK Token
    "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", // Key Hash
    hre.ethers.parseEther("0.1") // Fee
  );

  await pescaGame.waitForDeployment();

  console.log("PescaGame deployed to:", await pescaGame.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 