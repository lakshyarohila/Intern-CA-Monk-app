
import React from 'react';

function Timer({ timeLeft }) {
 
  const getColorClass = () => {
    if (timeLeft > 15) return 'bg-blue-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`flex justify-center items-center w-16 h-16 rounded-full ${getColorClass()} text-white font-bold text-xl`}>
        {timeLeft}
      </div>
      <div className="text-xs text-gray-500 mt-1">seconds</div>
    </div>
  );
}

export default Timer;