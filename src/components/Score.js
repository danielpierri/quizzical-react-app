import { useContext } from "react"
import { ThemeContext } from "./themeContext"

export default function Score({
  score,
  questionsAndAnswers,
  onClick
}) {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={`score-and-play-again__container--${theme}`}>
      <p>
        You scored {score}/{questionsAndAnswers.length} correct answers
      </p>
      <button
        className={`play-again__btn play-again__btn--${theme}`}
        onClick={onClick}
      >
        Play Again
      </button>
    </div>
  )
}