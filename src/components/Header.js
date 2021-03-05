import logo from '../images/header-logo.svg';

import { useHistory } from 'react-router-dom';

function Header(props) {

  // function handleOnClick(e) {
  //   e.preventDefault();
  
  //   props.onSignOut({
///????????????????jwl????????
  //   });
  // }

  const history = useHistory();
  console.log("из Header", history);


  return(
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Место Россия" />
        <div className="header__text">
          <a /*onClick={handleOnClick}*/ onClick={props.onClick} href={props.url} className="header__logout">{props.text}</a>
          <p className="header__email">{props.userEmail}</p>
        </div>
        
      </div>
      <div className="header__line" />
    </header>
  )
}
export default Header;