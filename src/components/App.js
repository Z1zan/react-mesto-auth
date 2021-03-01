import React from 'react';
import { useState, useEffect  } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';


import Login from './Login.js';
import Register from './Register.js';
// import InfoTooltip from './InfoTooltip.js';
import InfoToolOk from './InfoToolOk.js';
import InfoToolNope from './InfoToolNope.js';


import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});


  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }


  const avatarPopupOpen = `${isEditAvatarPopupOpen ? 'popup_opened' : ''}`;
  const editPopupOpen = `${isEditProfilePopupOpen ? 'popup_opened' : ''}`;
  const addPopupOpen = `${isAddPlacePopupOpen ? 'popup_opened' : ''}`;
  const imgPopupOpen = `${isImagePopupOpen ? 'popup_opened' : ''}`;

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
  }, [])

  function handleUpdateUser(item) {
    api
      .setUserInfo(item)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(item) {
    api
      .setUserAvatar(item)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }




  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);

        // Обновляем стейт
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }



  function handleAddPlaceSubmit(card) {
    api
      .createCardOne(card)
      .then(card => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }





  return (
    <BrowserRouter>

      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Switch>

          <Route path="/main">
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onImgCard={handleCardClick}
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              />
              <EditAvatarPopup setAvatar={handleUpdateAvatar} isOpen={avatarPopupOpen} onClose={closeAllPopups} />
              <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={editPopupOpen} onClose={closeAllPopups} />
              <AddPlacePopup addCard={handleAddPlaceSubmit} isOpen={addPopupOpen} onClose={closeAllPopups} />
              <PopupWithForm name="del" title="Вы уверены?" >
                <input id="" name="cardId" required type="text" hidden />
              </PopupWithForm>
              <ImagePopup card={selectedCard} isOpen={imgPopupOpen} onClose={closeAllPopups} />
            </Route>

            <Route path="/sign-in">
              <Login />
              <InfoToolOk />
              <InfoToolNope />
            </Route>

            <Route path="/sign-up">
              <Register />
              <InfoToolOk />
              <InfoToolNope />
            </Route>

          </Switch>

          <Footer />

        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
