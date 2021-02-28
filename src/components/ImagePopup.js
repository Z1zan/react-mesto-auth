function ImagePopup(props) {
  return(
  <form className={`popup popup-img ${props.isOpen}`} name="fullImg">
    <div className="popup-img__container">
      <button onClick={props.onClose} className="popup__close-btn popup-img__close-btn opacity" type="reset" />
      <img className="popup-img__img" alt={props.card.name} src={props.card.link} />
      <p className="popup-img__name">{props.card.name}</p>
    </div>
    <div className="popup__overlay overlay-img" />
  </form>
  )
}

export default ImagePopup;