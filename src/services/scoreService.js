class ScoreService {
  constructor() {
    this.scores = {
      canicas: [],
      futbol: [],
      pesca: [],
      tiro: []
    };
  }

  async saveScore(gameId, address, score) {
    try {
      if (!this.scores[gameId]) {
        this.scores[gameId] = [];
      }

      this.scores[gameId].push({
        address,
        score,
        timestamp: Date.now()
      });

      // Ordenar por puntuación
      this.scores[gameId].sort((a, b) => b.score - a.score);

      // Mantener solo los 10 mejores
      this.scores[gameId] = this.scores[gameId].slice(0, 10);

      return true;
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  }

  async getHighScores(gameId) {
    try {
      return this.scores[gameId] || [];
    } catch (error) {
      console.error('Error getting high scores:', error);
      throw error;
    }
  }
}

export default new ScoreService(); 