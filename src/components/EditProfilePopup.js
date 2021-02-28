import { useState, useContext, useEffect } from 'react';

import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }


  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 


  return (

    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="edit" title="Редактировать профиль" >
    <div className="popup__form">
      <input value={name} onChange={handleChangeName} className="popup__field popup__field_name" id="input-name" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
      <span className="popup__form-field-error" id="input-name-error">Вы пропустили это поле.</span>
    </div>
    <div className="popup__form">
      <input value={description} onChange={handleChangeDescription} className="popup__field popup__field_job" id="input-job" type="text" name="about" placeholder="Занятие" required minLength="2" maxLength="200" />
      <span className="popup__form-field-error" id="input-job-error">Вы пропустили это поле.</span>
    </div>
  </PopupWithForm>

  )
}

export default EditProfilePopup;

