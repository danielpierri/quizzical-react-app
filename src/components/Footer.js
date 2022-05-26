import { useContext } from "react"
import { ThemeContext } from "./themeContext"
import igLight from "../images/ig-light.png"
import liLight from "../images/li-light.png"
import ghLight from "../images/gh-light.png"
import igDark from "../images/ig-dark.png"
import liDark from "../images/li-dark.png"
import ghDark from "../images/gh-dark.png"

export default function Footer() {
  const {theme} = useContext(ThemeContext)

  return (
    <div className="footer__container">
      <div className="footer__icons">
        <a href="https://www.instagram.com/cyberpierri" classname="footer__ig"><img src={theme === "light" ? igLight : igDark} alt="Instagram logo" /></a>
        <a href="https://www.linkedin.com/in/danielpierri/" classname="footer__li"><img src={theme === "light" ? liLight : liDark} alt="LinkedIn logo" /></a>
        <a href="https://github.com/danielpierri" classname="footer__gh"><img src={theme === "light" ? ghLight : ghDark} alt="GitHub logo" /></a>
      </div>
      <div className={`footer__message footer__message--${theme}`}>
        <p className="footer__phrase">QUIZ APP DEVELOPED BY <span className={`footer__name footer__name--${theme}`}>DANIEL PIERRI</span></p>
        <p className="footer__year">2022</p>
      </div>
    </div>
  )
}