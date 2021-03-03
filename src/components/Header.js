import logo from '../images/header-logo.svg';

function Header(props) {

  // function handleOnClick(e) {
  //   e.preventDefault();
  
  //   props.onSignOut({
///????????????????jwl????????
  //   });
  // }


  return(
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Место Россия" />
        <a /*onClick={handleOnClick}*/ href={props.url} className="header__text">{props.text}</a>
      </div>
      <div className="header__line" />
    </header>
  )
}
export default Header;