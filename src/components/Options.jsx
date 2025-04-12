
import React from 'react';

function Options({ options, selectedAnswers, onSelectWord }) {

  const isWordSelected = (word) => {
    return selectedAnswers.includes(word);
  };

 
  const findAvailableBlankIndex = () => {
    for (let i = 0; i < 4; i++) {
      if (!selectedAnswers[i]) {
        return i;
      }
    }
    return null;
  };


  const handleWordClick = (word) => {
    if (isWordSelected(word)) return;
    
    const blankIndex = findAvailableBlankIndex();
    if (blankIndex !== null) {
      onSelectWord(word, blankIndex);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {options.map((option, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded border transition-all ${
            isWordSelected(option)
              ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }`}
          onClick={() => handleWordClick(option)}
          disabled={isWordSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;