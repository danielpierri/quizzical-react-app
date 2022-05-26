import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "./components/themeContext"
import Answer from "./components/Answer"
import CheckAnswers from "./components/CheckAnswers"
import Score from "./components/Score"
import Header from "./components/Header"
import Footer from "./components/Footer"
import decodeHtml from "./utils/helper"
import { nanoid } from "nanoid"
import "./App.css"

export default function App() {
  // const [darkMode, setDarkMode] = useState(false)
  const {theme} = useContext(ThemeContext)
  const [quiz, setQuiz] = useState(false)
  const [areAllQuestionsAnswered, setAreAllQuestionsAnswered] = useState(false)
  const [questionsAndAnswers, setQuestionsandAnswers] = useState([
    {
      question: "",
      correctAnswer: "",
      incorrectAnswers: [],
      userAnswer: null
    }
  ])

  // function toggleDarkMode() {
  //   setDarkMode(prevMode => !prevMode)
  //   document.body.style.background = darkMode ? "var(--color-bg-gradient)" : ""
  // }

  function startQuiz() {
    setQuiz(true)
  }

  // Object as parameter example
  //const array = [{one: 1, two: 2, three: 3}]
  // array.map(({}) => {return {}})

  function fetchApi() {
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then(response => response.json())
      .then(data => {
        setQuestionsandAnswers(
          // Object as parameter
          data.results.map(
            ({
              question,
              correct_answer: correctAnswer,
              incorrect_answers: incorrectAnswers
            }) => {
              const allAnswers = [...incorrectAnswers, correctAnswer]
              const answers = allAnswers.sort(() => Math.random() - 0.5) // To get randomized answers
              return {
                question,
                correctAnswer,
                incorrectAnswers,
                answers,
                userAnswer: null
              }
            }
          )
        )
      // Cleaning up the previous answers to play again:
      setAreAllQuestionsAnswered(false)
      })
  }

  useEffect(() => {
    fetchApi()
  }, [])

  // Using user's answers as parameters
  function handleSelectedAnswer(selectedQuestion, selectedAnswer) {
    setQuestionsandAnswers((prevQuestionsAndAnswers) => {
      // Shallow clone of the previous state
      const newQuestionsAndAnswers = [...prevQuestionsAndAnswers]
      // Finding the questions respective to the answer
      const selectedQuestionAndAnswers = newQuestionsAndAnswers.find(({question}) => question === selectedQuestion
      )
      // Set userAnswer as the previously selectedAnswer
      selectedQuestionAndAnswers.userAnswer = selectedAnswer
      // Return the new state
      return newQuestionsAndAnswers
    })
  }

  function handleAllQuestionsAnswered() {
    setAreAllQuestionsAnswered(true)
  }

  // Enables and Disables the "Check Answers" button
  // If there is at least one answer which value is null, the button is set to Disabled
  const notAllQuestionsAnswered = questionsAndAnswers.some(
    ({ userAnswer }) => userAnswer === null
  )

  // Get the number of correct answers
  const score = questionsAndAnswers.filter(
    ({ userAnswer, correctAnswer }) => userAnswer === correctAnswer
  ).length

  function startNewGame() {
    fetchApi()
  }

  return (
    <div className={`body body--${theme}`}>
      <Header 
        // darkMode={darkMode}
        // toggleDarkMode={toggleDarkMode}
      />
      {quiz ? (
        <div className="quiz__container">
          {questionsAndAnswers.map(
            ({ question, answers, correctAnswer, userAnswer }, id) => {
              return (
                <div key={id + 1}>
                  <p className={`quiz__questions quiz__questions--${theme}`}>{decodeHtml(question)}</p>
                  <ul className={`quiz__answers quiz__answers--${theme}`}>
                    {answers.map(answer => (
                      <Answer
                        key={nanoid()}
                        answerText={decodeHtml(answer)}
                        onClick={() => handleSelectedAnswer(question, answer)}
                        isSelected={answer === userAnswer}
                        rightAnswer={answer === correctAnswer}
                        areAllQuestionsAnswered={areAllQuestionsAnswered}
                      />
                    ))}
                  </ul>
                </div>
              )
            }
          )}
          {areAllQuestionsAnswered ? (
            <Score
              score={score}
              questionsAndAnswers={questionsAndAnswers}
              onClick={startNewGame}
            />
          ) : (
            <CheckAnswers
              onClick={handleAllQuestionsAnswered}
              disabled={notAllQuestionsAnswered}
            />
          )}
        </div>
      ) : (
        <div className={`start__container`}>

          <h2 className={`start__title start__title--${theme}`}>Quizzical</h2>
          <p className={`start__subtitle start__subtitle--${theme}`}>Test your general knowledge skills</p>
          <button 
            className={`start__btn start__btn--${theme}`}
            onClick={startQuiz}
          >
            Start Quiz
          </button>
          <Footer />
        </div>
      )}
    </div>
  )
}
