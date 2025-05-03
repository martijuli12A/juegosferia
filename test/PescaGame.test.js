const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PescaGame", function () {
  let PescaGame;
  let pescaGame;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Desplegar el contrato
    PescaGame = await ethers.getContractFactory("PescaGame");
    pescaGame = await PescaGame.deploy(
      "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", // VRF Coordinator
      "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // LINK Token
      "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", // Key Hash
      ethers.parseEther("0.1") // Fee
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pescaGame.owner()).to.equal(owner.address);
    });
  });

  describe("Fishing", function () {
    it("Should not allow fishing during cooldown", async function () {
      await pescaGame.pescar();
      await expect(pescaGame.pescar()).to.be.revertedWith("Debes esperar para pescar de nuevo");
    });

    it("Should emit PezNormalEncontrado event for normal fish", async function () {
      await expect(pescaGame.pescar())
        .to.emit(pescaGame, "PezNormalEncontrado")
        .withArgs(owner.address);
    });

    it("Should emit PezRaroEncontrado and PremioGanado events for rare fish", async function () {
      // Mock the random number to be 0 (rare fish)
      await expect(pescaGame.pescar())
        .to.emit(pescaGame, "PezRaroEncontrado")
        .withArgs(owner.address)
        .and.to.emit(pescaGame, "PremioGanado")
        .withArgs(owner.address, ethers.parseEther("1"));
    });
  });

  describe("Rewards", function () {
    it("Should allow claiming rewards", async function () {
      // Mock a reward
      await pescaGame.pescar();
      
      const tokenAddress = "0x0000000000000000000000000000000000000000"; // Mock token address
      await expect(pescaGame.reclamarPremio(tokenAddress))
        .to.emit(pescaGame, "PremioGanado")
        .withArgs(owner.address, ethers.parseEther("1"));
    });

    it("Should not allow claiming rewards when there are none", async function () {
      const tokenAddress = "0x0000000000000000000000000000000000000000";
      await expect(pescaGame.reclamarPremio(tokenAddress))
        .to.be.revertedWith("No tienes premios pendientes");
    });
  });

  describe("Token Deposits", function () {
    it("Should allow token deposits", async function () {
      const tokenAddress = "0x0000000000000000000000000000000000000000";
      const amount = ethers.parseEther("1");
      
      await expect(pescaGame.depositarTokens(tokenAddress, amount))
        .to.not.be.reverted;
    });
  });
}); 