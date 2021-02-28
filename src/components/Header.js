import logo from '../images/header-logo.svg';

function Header() {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <div className="header__line" />
    </header>
  )
}
export default Header;