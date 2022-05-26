import { useContext} from "react"
import { ThemeContext } from "./themeContext"
import moonEmpty from "../images/moon-empty.png"
import moonFilled from "../images/moon-filled.png"

export default function Header() {
  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <header className="header">
      <button
        className={`header__toggler-btn header__toggler-btn--${theme}`}
        onClick={toggleTheme}
      >
        <img src={theme === "dark" ? moonFilled : moonEmpty} alt="theme toggler" className="header__toggler-img" />
      </button>
    </header>

  )
}