import React from 'react';

const WalletLogin = ({ onConnect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">¡Bienvenido a la Feria Mexicana!</h1>
          <p className="text-sm md:text-base text-gray-600">Conecta tu wallet para comenzar la diversión</p>
        </div>
        
        <button
          onClick={onConnect}
          className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold py-3 md:py-4 px-6 rounded-lg 
                   hover:from-yellow-500 hover:to-red-600 transform hover:scale-105 transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 text-sm md:text-base"
        >
          Conectar Wallet
        </button>
        
        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500">
          <p>Al conectar tu wallet, aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};

export default WalletLogin; 