import { useContext } from 'react';
import Card from './Card.js';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Header from './Header.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return(
    <>
      <Header url="/" text="Выйти" onSignOut={props.handleSignOut} userEmail={props.userEmail} onClick={props.onClick} text={props.text} />
      <main className="main">
        <div className="profile">
          <div className="profile__container">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
            <div className="profile__avatar-overlay" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn opacity" type="button" onClick={props.onEditProfile} />
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__add-btn opacity" type="button" onClick={props.onAddPlace} />
        </div>
        <div className="elements">
          {props.cards.map(card => (
          <Card 
            card={card} 
            key={card._id} 
            {...card} 
            onCardClick={props.onImgCard} 
            onCardLike={props.handleCardLike} 
            onCardDelete={props.handleCardDelete} 
          />))}
        </div>
      </main>
      <EditAvatarPopup setAvatar={props.handleUpdateAvatar} isOpen={props.avatarPopupOpen} onClose={props.closeAllPopups} />
      <EditProfilePopup onUpdateUser={props.handleUpdateUser} isOpen={props.editPopupOpen} onClose={props.closeAllPopups} />
      <AddPlacePopup addCard={props.handleAddPlaceSubmit} isOpen={props.addPopupOpen} onClose={props.closeAllPopups} />
      <PopupWithForm name="del" title="Вы уверены?" >
        <input id="" name="cardId" required type="text" hidden />
      </PopupWithForm>
      <ImagePopup card={props.selectedCard} isOpen={props.imgPopupOpen} onClose={props.closeAllPopups} />
    </>
  )
}

export default Main;