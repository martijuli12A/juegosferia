// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract PescaGame is VRFConsumerBase {
    address public owner;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastFishingTime;
    uint256 public constant FISHING_COOLDOWN = 1 minutes;
    uint256 public constant RARE_FISH_PROBABILITY = 1000; // 0.1% chance
    uint256 public constant RARE_FISH_REWARD = 1 * 10 ** 18; // 1 token

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    event PremioGanado(address indexed player, uint256 amount);
    event PezRaroEncontrado(address indexed player);
    event PezNormalEncontrado(address indexed player);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        owner = msg.sender;
        keyHash = _keyHash;
        fee = _fee;
    }

    function pescar() public returns (bytes32 requestId) {
        require(
            block.timestamp >= lastFishingTime[msg.sender] + FISHING_COOLDOWN,
            "Debes esperar para pescar de nuevo"
        );
        
        require(LINK.balanceOf(address(this)) >= fee, "No hay suficientes LINK tokens");
        
        lastFishingTime[msg.sender] = block.timestamp;
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        uint256 randomNumber = randomness % 1000;
        
        if (randomNumber == 0) {
            rewards[msg.sender] += RARE_FISH_REWARD;
            emit PremioGanado(msg.sender, RARE_FISH_REWARD);
            emit PezRaroEncontrado(msg.sender);
        } else {
            emit PezNormalEncontrado(msg.sender);
        }
    }

    function reclamarPremio(address tokenAddress) public {
        uint256 amount = rewards[msg.sender];
        require(amount > 0, "No tienes premios pendientes");

        rewards[msg.sender] = 0;
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    function depositarTokens(address tokenAddress, uint256 amount) public {
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    }

    function getTiempoRestante(address player) public view returns (uint256) {
        if (block.timestamp >= lastFishingTime[player] + FISHING_COOLDOWN) {
            return 0;
        }
        return (lastFishingTime[player] + FISHING_COOLDOWN) - block.timestamp;
    }
} 