
import React from 'react';

function FeedbackScreen({ questions, userAnswers }) {
 
  const isCorrect = (questionIndex) => {
    const correctAnswers = questions[questionIndex].correctAnswer;
    const userAns = userAnswers[questionIndex];
    
    if (!userAns || userAns.length !== correctAnswers.length) return false;
    
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAns[i] !== correctAnswers[i]) return false;
    }
    
    return true;
  };


  const calculateScore = () => {
    let score = 0;
    questions.forEach((_, index) => {
      if (isCorrect(index)) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Test Results</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Your Score</h2>
          <div className="text-5xl font-bold text-blue-600">
            {calculateScore()} <span className="text-gray-400">/ {questions.length}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Review Your Answers</h3>
        
        {questions.map((question, index) => {
          const correct = isCorrect(index);
          
          return (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 ${
                correct ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-700">Question {index + 1}</h4>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${
                  correct ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {correct ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              
              <div className="p-3 bg-gray-50 rounded mb-4">
                <p className="text-gray-700">{question.question}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Your Answer</h5>
                  <ul className="space-y-2">
                    {userAnswers[index].map((word, wordIndex) => (
                      <li 
                        key={wordIndex} 
                        className="p-2 border border-gray-200 rounded"
                      >
                        {word || '[Not answered]'}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {!correct && (
                  <div>
                    <h5 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Correct Answer</h5>
                    <ul className="space-y-2">
                      {question.correctAnswer.map((word, wordIndex) => (
                        <li 
                          key={wordIndex} 
                          className="p-2 border border-green-200 bg-green-50 rounded text-green-700"
                        >
                          {word}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedbackScreen;