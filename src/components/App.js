import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';

import Login from './Login';
import Register from './Register';
import InfoToolOk from './InfoToolOk';
import InfoToolNope from './InfoToolNope';
import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const history = useHistory();
  console.log("из App", history);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [isInfoToolOkPopupOpen, setIsInfoToolOkPopupOpen] = useState(false);
  const [isInfoToolNopePopupOpen, setIsInfoToolNopePopupOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
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
      .catch((err) => console.log(err));
  }, [])


  // const history = useHistory();
  // console.log(history);

  // function handleRegister(item) {
  //   // console.log(item);
  //   api
  //     .registration(item)
  //     .then((data) => {
  //       // console.log(data);
  //       handelInfoToolOk();
  //       // setTimeout(() => {
  //       //   history.push("/signin");
  //       // }, 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       handleInfoToolNope();
  //     })
  // }


  function handleRegister(item) {
    // console.log(item);
    api
      .registration(item)
      .then((data) => {
        handelInfoToolOk();
      })
      .catch((err) => {
        console.log(err);
        handleInfoToolNope();
      })
  }


  function handleLogin(item) {
    console.log("логинися", item)
    api
      .login(item)
      .then((data) => {
        localStorage.setItem("jwl", data.token);
        setUserEmail(item.email)
        handelInfoToolOk();
        setLoggedIn(true);
        // setTimeout(() => {
        //   history.push("/main");
        // }, 2000);
      })
      .catch((err) => {
        console.log(err);
        handleInfoToolNope();
      })
  }

  // console.log(loggedIn);

  function handleSignOut() {
    localStorage.removeItem("jwl");
    setLoggedIn(false);
    setUserEmail('');
    // history.push("/signin")
  }

  useEffect(() => {
    if (localStorage.jwt) {
      console.log(localStorage.jwt)
      api
        .checkValidToken(localStorage.jwt)
        .then((item) => {
          console.log(item)
          setLoggedIn(true);
          setUserEmail(item.data.email);
          // history.push("./main")
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
              userEmail={userEmail}
              onClick={handleSignOut}
              text={'Выйти'}
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
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin"/>}
            </Route>

          </Switch>

          <Footer />

        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
