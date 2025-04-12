// App.jsx
import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Question from './components/Question';
import Options from './components/Options';
import FeedbackScreen from './components/FeedbackScreen';
import { questionData } from './data'; // Import static data

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load questions from static data
  useEffect(() => {
    try {
      // Use static data instead of fetching
      const data = questionData;
      console.log('Loaded data:', data);
      
      if (data && data.data && Array.isArray(data.data.questions)) {
        setQuestions(data.data.questions);
        
        // Initialize user answers array
        const initialUserAnswers = data.data.questions.map(() => []);
        setUserAnswers(initialUserAnswers);
      } else {
        console.error('Data structure is not as expected');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isLoading || isTestCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isLoading, isTestCompleted]);

  // Handle selecting a word for a blank
  const handleSelectWord = (word, blankIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    
    // If this blank already has a word, remove it
    if (newSelectedAnswers[blankIndex]) {
      newSelectedAnswers[blankIndex] = null;
    }
    
    // Add the new word
    newSelectedAnswers[blankIndex] = word;
    setSelectedAnswers(newSelectedAnswers);
  };

  // Handle clicking on a filled blank to unselect the word
  const handleUnselectWord = (blankIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[blankIndex] = null;
    setSelectedAnswers(newSelectedAnswers);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    // Save current answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = [...selectedAnswers];
    setUserAnswers(newUserAnswers);
    
    // Reset selected answers
    setSelectedAnswers([]);
    
    // Move to next question or end test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setIsTestCompleted(true);
    }
  };

  // Calculate number of blanks in the current question
  const getBlankCount = () => {
    if (!questions[currentQuestionIndex]) return 0;
    return (questions[currentQuestionIndex].question.match(/_{10,}/g) || []).length;
  };

  // Check if all blanks are filled
  const areAllBlanksFilled = () => {
    const blankCount = getBlankCount();
    return selectedAnswers.filter(answer => answer !== null && answer !== undefined).length === blankCount;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-blue-600">Loading questions...</div>
      </div>
    );
  }

  if (isTestCompleted) {
    return (
      <FeedbackScreen 
        questions={questions} 
        userAnswers={userAnswers} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Sentence Construction Tool</h1>
          <Timer timeLeft={timeLeft} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-sm text-gray-500 mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          {questions.length > 0 && (
            <>
              <Question 
                question={questions[currentQuestionIndex].question} 
                selectedAnswers={selectedAnswers} 
                onUnselectWord={handleUnselectWord} 
              />
              
              <Options 
                options={questions[currentQuestionIndex].options} 
                selectedAnswers={selectedAnswers} 
                onSelectWord={handleSelectWord} 
              />
              
              <button 
                className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
                  areAllBlanksFilled() 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleNextQuestion}
                disabled={!areAllBlanksFilled()}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;