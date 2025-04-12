
import React from 'react';

function Question({ question, selectedAnswers, onUnselectWord }) {
 
  const parts = question.split(/_{10,}/g);
  
  return (
    <div className="mb-8 text-lg leading-relaxed text-gray-800">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span 
              className={`inline-block min-w-[120px] px-3 py-1 mx-1 text-center border-b-2 ${
                selectedAnswers[index] 
                  ? 'bg-blue-50 border-blue-500 text-blue-600 font-medium rounded cursor-pointer' 
                  : 'border-gray-300 text-gray-400'
              }`}
              onClick={() => selectedAnswers[index] && onUnselectWord(index)}
            >
              {selectedAnswers[index] || '_______'}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Question;