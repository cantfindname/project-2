import React, { useState } from "react";
import indieQuestion from "../indie-game-question.json";

const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = indieQuestion.questions[currentQuestionIndex];
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const selectedAnswer = e.target.elements.answer.value;
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: { selectedAnswer, isCorrect },
    });

    if (currentQuestionIndex < indieQuestion.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate the score
      const correctAnswers = Object.values(userAnswers).filter(
        (answer) => answer.isCorrect
      );
      const userScore =
        (correctAnswers.length / indieQuestion.questions.length) * 100;
      setScore(userScore);
    }
  };

  return (
    <div className="container">
      <div className="indie-question">
        {score !== null ? (
          <div>
            <h2>Your Score: {score}%</h2>
          </div>
        ) : (
          <div>
            <h2>Question: {currentQuestion.question}</h2>
            <form onSubmit={handleAnswerSubmit}>
              {currentQuestion.answers.map((answer, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="answer"
                    id={`answer-${index}`}
                    value={answer}
                  />
                  <label htmlFor={`answer-${index}`}>{answer}</label>
                </div>
              ))}
              <button type="submit">Submit Answer</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
