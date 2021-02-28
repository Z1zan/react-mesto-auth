import { useContext } from 'react';
import Card from './Card.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return(
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
  )
}

export default Main;