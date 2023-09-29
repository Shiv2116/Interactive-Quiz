import React, { useState } from 'react';
import './Quiz.css';
const Quiz = () => {
  const [questions] = useState([
    {
      question: "What is the capital of France?",
      choices: ["London", "Berlin", "Madrid", "Paris"],
      correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
      },
      {
        question: "What is the largest mammal in the world?",
        choices: ["Giraffe", "Hippopotamus", "Elephant", "Blue Whale"],
        correctAnswer: "Blue Whale",
      },
      {
        question: "What is the tallest mountain in the world?",
        choices: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
        correctAnswer: "Mount Everest",
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
      },
      {
        question: "What is the chemical symbol for gold?",
        choices: ["Ag", "Fe", "Au", "Hg"],
        correctAnswer: "Au",
      },
      {
        question: "Which country is famous for the Great Wall?",
        choices: ["Japan", "China", "India", "Russia"],
        correctAnswer: "China",
      },
      {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"],
        correctAnswer: "William Shakespeare",
      },
      {
        question: "What is the largest organ in the human body?",
        choices: ["Liver", "Heart", "Brain", "Skin"],
        correctAnswer: "Skin",
      },
      {
        question: "Which gas makes up the majority of Earth's atmosphere?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen",
      },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  
  const handleChoiceChange =(e)=>{
    setSelectedChoice(e.target.value);
    setIsAnswerCorrect(null); // Reset the correctness status when the user selects a new choice
  }

  

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
    
        if (!attemptedQuestions.includes(currentQuestionIndex)) {
          if (selectedChoice === currentQuestion.correctAnswer) {
            setScore(score + 1);
            setIsAnswerCorrect(true); // Indicate that the answer is correct.
            setFeedback("Correct!");
          } else {
            setIsAnswerCorrect(false);
            setFeedback("Wrong Answer!");
          }
          setAttemptedQuestions([...attemptedQuestions, currentQuestionIndex]);
        } else {
          setFeedback("You've already attempted this question.");
        }
    
        setSelectedChoice(null);
        if (currentQuestionIndex === questions.length - 1) {
            // If it's the last question, show the final score.
            setFeedback(`Quiz completed! Your final score is: ${score} out of ${questions.length}`);
          }
      };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback("");
    } else {
      setFeedback("Quiz completed!");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={`quiz-container ${isAnswerCorrect === false ? 'wrong-answer' : ''}`}>
      <h1>Quiz Title</h1>
      {feedback && <p id="feedback">{feedback}</p>}
      {currentQuestionIndex < questions.length && (
        <div>
          <p id="question-text">{currentQuestion.question}</p>
          <ul id="choices-list">
            {currentQuestion.choices.map((choice, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="choice"
                  value={choice}
                  checked={selectedChoice === choice}
                  onChange={handleChoiceChange}
                />
                {choice}
              </li>
            ))}
          </ul>
          <button
            id="submit-button"
            onClick={handleSubmit}
            disabled={!selectedChoice}
          >
            Submit
          </button>
          <button
            id="next-button"
            onClick={handleNext}
            disabled={!feedback}
          >
            Next
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Quiz;
