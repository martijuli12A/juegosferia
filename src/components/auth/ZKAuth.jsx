import React, { useState } from 'react';
import './ZKAuth.css';

const ZKAuth = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!username.trim()) {
        throw new Error('Por favor ingresa un nombre de usuario');
      }

      // Simulamos una autenticación exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAuthenticated(username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zk-auth-container">
      <h2>¡Bienvenido a la Feria!</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre"
            disabled={loading}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button 
          type="submit"
          disabled={loading || !username.trim()}
          className="connect-button"
        >
          {loading ? 'Entrando...' : 'Entrar a la Feria'}
        </button>
      </form>
    </div>
  );
};

export default ZKAuth; 