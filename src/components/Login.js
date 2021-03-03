import { useState } from 'react';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onLogin({
      email,
      password
    });
  }

  return(

    <form onSubmit={handleSubmit} className="form form-login">
      <div className="form__container">
        <h2 className="form__title">Вход</h2>
        <div className="form__form">
          <input onChange={handleChangeEmail} className="form__field form__field_email" id="input-email" name="email" value={email}
              placeholder="Email" required="" minLength="2" maxLength="30" />
            <span className="form__form-field-error" id="input-email-error"></span>
        </div>
        <div className="form__form">
          <input onChange={handleChangePassword} className="form__field form__field_password" id="input-password" type="password" name="password"
              value={password} placeholder="Пароль" required="" minLength="8" />
            <span className="form__form-field-error" id="input-link-error"></span>
        </div>
        <button className="form__submit-btn submit-add-btn form__submit-btn_inactive" type="submit">
          Войти
        </button>
      </div>
    </form>

  )
}
export default Login;