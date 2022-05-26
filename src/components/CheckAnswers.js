import { useContext } from "react"
import { ThemeContext } from "./themeContext"

export default function CheckAnswers ({
  onClick,
  disabled
}) {
  const {theme} = useContext(ThemeContext)
  return (
    <button
      className={disabled ? `check-answers__btn--disabled check-answers__btn--disabled--${theme}` : `check-answers__btn check-answers__btn--${theme}`}
      onClick={onClick}
      disabled={disabled}
    >
      Finish
    </button>
  )
}