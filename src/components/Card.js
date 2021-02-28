import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);



  const isOwn = props.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? '' : 'element__trash_hidden'}`
  );


  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked ? 'element__like-btn_active' : ''} opacity`
  );


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }


  return (
    <div className="element">
      <img className="element__image" onClick={handleClick} src={props.link} alt={props.name} />
      <div className="element__text">
        <p className="element__name">{props.name}</p>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
      </div>
      <span className="element__like-number">{props.likes.length}</span>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
    </div>
  )
}

export default Card;