export default function Answer({
  answerText,
  onClick,
  isSelected,
  rightAnswer,
  areAllQuestionsAnswered,
}) {
  let className

  if (areAllQuestionsAnswered) {
    if (rightAnswer) {
      className = "correct-answer"
    } else if (isSelected) {
      className = "incorrect-answer"
    }
  } else {
    if (isSelected) {
      className = "selected-answer"
    }
  }

  const className2 = areAllQuestionsAnswered && "default-cursor"

  // Only apply click event if all the answers are not checked yet
  // Otherwise I don't want the selected answers to be changed

  function handleClick() {
    if (!areAllQuestionsAnswered) {
      return onClick()
    }
  }

  return (
    <li onClick={handleClick} className={`${className} ${className2}`}
    >
      {answerText}
    </li>
  )
}