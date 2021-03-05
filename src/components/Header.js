import logo from '../images/header-logo.svg';


function Header(props) {

  return(
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Место Россия" />
        <div className="header__text">
          <a onClick={props.onClick} href={props.url} className="header__logout">{props.text}</a>
          <p className="header__email">{props.userEmail}</p>
        </div>
        
      </div>
      <div className="header__line" />
    </header>
  )
}
export default Header;