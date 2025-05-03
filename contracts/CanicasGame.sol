// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CanicasGame {
    // Game variables
    struct Game {
        address player;
        uint256 betAmount;
        uint256 marblesInCircle;
        bool isActive;
    }

    mapping(uint256 => Game) public games;
    mapping(address => uint256) public playerBalances;
    uint256 public gameCounter;

    // Events
    event GameStarted(uint256 gameId, address player, uint256 betAmount);
    event GameResult(uint256 gameId, address player, bool won, uint256 prize);
    event BalanceUpdated(address player, uint256 newBalance);

    function startGame(uint256 marblesInCircle) external payable {
        // Para pruebas, permitimos jugar con 0 balance
        // require(msg.value > 0, "Debes apostar algo");
        require(marblesInCircle > 0 && marblesInCircle <= 10, "Máximo 10 canicas");

        uint256 gameId = gameCounter++;
        games[gameId] = Game({
            player: msg.sender,
            betAmount: msg.value,
            marblesInCircle: marblesInCircle,
            isActive: true
        });

        // Simulate game result (30% chance to win)
        bool won = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, gameId))) % 100 < 30;
        uint256 prize = won ? (msg.value * 2 + 0.01 ether) : 0; // Da un premio mínimo para pruebas

        if (won) {
            playerBalances[msg.sender] += prize;
            emit BalanceUpdated(msg.sender, playerBalances[msg.sender]);
        }

        emit GameResult(gameId, msg.sender, won, prize);
    }

    function withdrawBalance() external {
        uint256 balance = playerBalances[msg.sender];
        require(balance > 0, "No tienes balance para retirar");
        
        playerBalances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transferencia fallida");
        
        emit BalanceUpdated(msg.sender, 0);
    }

    function getPlayerBalance() external view returns (uint256) {
        return playerBalances[msg.sender];
    }
} 