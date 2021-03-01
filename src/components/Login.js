

function Login() {


  return(

    <div className="form form-login">
      <div className="form__container">
        <h2 className="form__title">Вход</h2>
        <div className="form__form">
          <input className="form__field form__field_email" id="input-email" name="email" value=""
              placeholder="Email" required="" minLength="2" maxLength="30" />
            <span className="form__form-field-error" id="input-email-error"></span>
        </div>
        <div className="form__form">
          <input className="form__field form__field_password" id="input-password" type="password" name="password"
              value="" placeholder="Пароль" required="" minLength="8" />
            <span className="form__form-field-error" id="input-link-error"></span>
        </div>
        <button className="form__submit-btn submit-add-btn form__submit-btn_inactive" type="submit" disabled="true">
          Войти
        </button>
      </div>
    </div>

  )
}
export default Login;