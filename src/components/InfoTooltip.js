
function InfoTooltip(props) {


  return (

    <form className={`popup popup-info popup-${props.name} ${props.isOpen}`} name={`infoPopup-${props.name}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-btn popup-add__close-btn opacity" type="reset"></button>
        <>{props.children}</>
      </div>
      <div className="popup__overlay overlay-add"></div>
    </form>

  )
}

export default InfoTooltip;