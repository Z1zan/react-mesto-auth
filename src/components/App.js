import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

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
import ProtectedRoute from './ProtectedRoute.js';


import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  // const history = useHistory();


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [isInfoToolOkPopupOpen, setIsInfoToolOkPopupOpen] = useState(false);
  const [isInfoToolNopePopupOpen, setIsInfoToolNopePopupOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState('');


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

  function handelInfoToolOk() {
    setIsInfoToolOkPopupOpen(true);
  }

  function handleInfoToolNope() {
    setIsInfoToolNopePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolOkPopupOpen(false);
    setIsInfoToolNopePopupOpen(false);
  }


  const avatarPopupOpen = `${isEditAvatarPopupOpen ? 'popup_opened' : ''}`;
  const editPopupOpen = `${isEditProfilePopupOpen ? 'popup_opened' : ''}`;
  const addPopupOpen = `${isAddPlacePopupOpen ? 'popup_opened' : ''}`;
  const imgPopupOpen = `${isImagePopupOpen ? 'popup_opened' : ''}`;
  const infoToolOkPopupOpen = `${isInfoToolOkPopupOpen ? 'popup_opened' : ''}`;
  const infoToolNopePopupOpen = `${isInfoToolNopePopupOpen ? 'popup_opened' : ''}`;

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
  }, [])




  function handleRegister(item) {
    console.log(item);
    api
      .registration(item)
      .then((data) => {
        console.log(data);
        handelInfoToolOk();
        // setTimeout(() => {
        //   history.push("/signin")
        // }, 3000)
      })
      .catch((err) => {
        console.log(err);
        handleInfoToolNope();
      })
  }


  function handleLogin(item) {
    console.log(item)
    api
      .login(item)
      .then((data) => {
        console.log("LOGIN", data);
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        // handelInfoToolOk()
        // setTimeout(() => {
        //   history.push("/main")
        // }, 3000)
      })
      .catch((err) => {
        console.log(err);
        handleInfoToolNope();
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  useEffect(() => {
    console.log("loggedIN", loggedIn)
    if (localStorage.jwt) {
      api
        .checkValidToken(localStorage.jwt)
        .then((item) => {
          console.log(item)
          setLoggedIn(true);
          setUserEmail(item.data.email);
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
          <Switch>

            <ProtectedRoute 
              path="/main" 
              loggedIn={loggedIn} 
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onImgCard={handleCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              handleUpdateAvatar={handleUpdateAvatar}
              avatarPopupOpen={avatarPopupOpen}
              closeAllPopups={closeAllPopups}
              handleUpdateUser={handleUpdateUser}
              editPopupOpen={editPopupOpen}
              handleAddPlaceSubmit={handleAddPlaceSubmit}
              addPopupOpen={addPopupOpen}
              selectedCard={selectedCard}
              imgPopupOpen={imgPopupOpen}
            />
            <Route path="/signin">
              <Header url="/signup" text="Зарегистрироваться"/>
              <Login onLogin={handleLogin} />
              <InfoToolOk isOpen={infoToolOkPopupOpen} onClose={closeAllPopups}/>
              <InfoToolNope isOpen={infoToolNopePopupOpen} onClose={closeAllPopups}/>
            </Route>

            <Route path="/signup">
              <Header url="/signin" text="Войти"/>
              <Register onRegister={handleRegister} />
              <InfoToolOk isOpen={infoToolOkPopupOpen} onClose={closeAllPopups}/>
              <InfoToolNope isOpen={infoToolNopePopupOpen} onClose={closeAllPopups}/>
            </Route>

            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect  to="/signin"/>}
            </Route>

          </Switch>

          <Footer />

        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
