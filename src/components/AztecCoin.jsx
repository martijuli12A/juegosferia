import React from 'react';

const AztecCoin = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full 
                     shadow-lg animate-float">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-yellow-300 rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-yellow-200 rounded-full flex items-center justify-center">
              <div className="w-1/4 h-1/4 bg-yellow-100 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-4 border-yellow-700 rounded-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-yellow-700 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 bg-yellow-700 rounded-full"></div>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-yellow-700 rounded-full"></div>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-yellow-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AztecCoin; 