import { ethers } from 'ethers';
import { Web3Provider } from 'zksync-web3';
import config from '../zkconfig.json';

class ZKScoreService {
  constructor() {
    this.provider = new Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner();
    this.contract = new ethers.Contract(
      config.contracts.scoreVerifier,
      ['function verifyScore(uint256 score, bytes calldata proof) public returns (bool)'],
      this.signer
    );
  }

  async generateProof(score, gameId) {
    try {
      // Aquí iría la lógica para generar la prueba ZK
      // Por ahora, devolvemos un mock
      return {
        score,
        gameId,
        proof: '0x' + Buffer.from('mock_proof').toString('hex'),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating proof:', error);
      throw error;
    }
  }

  async verifyScore(score, proof) {
    try {
      const tx = await this.contract.verifyScore(score, proof);
      const receipt = await tx.wait();
      return receipt.status === 1;
    } catch (error) {
      console.error('Error verifying score:', error);
      throw error;
    }
  }

  async getHighScores(gameId) {
    try {
      // Aquí iría la lógica para obtener los puntajes altos
      // Por ahora, devolvemos un mock
      return [
        { address: '0x123...', score: 1000 },
        { address: '0x456...', score: 800 },
        { address: '0x789...', score: 600 }
      ];
    } catch (error) {
      console.error('Error getting high scores:', error);
      throw error;
    }
  }
}

export default new ZKScoreService(); 