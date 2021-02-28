import { useState, useContext } from 'react';

import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleAddCardName(e) {
    setName(e.target.value)
  }
  function handleAddCardLink(e) {
    setLink(e.target.value)
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.addCard({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  } 


  return(

  <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="add" title="Новое место" >
    <div className="popup__form">
      <input value={name} onChange={handleAddCardName} className="popup__field popup__field_name-photo" id="input-photo" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="popup__form-field-error" id="input-photo-error">Вы пропустили это поле.</span>
    </div>
    <div className="popup__form">
      <input value={link} onChange={handleAddCardLink} className="popup__field popup__field_link-photo" id="input-link" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="popup__form-field-error" id="input-link-error">Вы пропустили это поле.</span>
    </div>
  </PopupWithForm>

  )
  
}
export default AddPlacePopup;