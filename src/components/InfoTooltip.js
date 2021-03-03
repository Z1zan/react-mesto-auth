
function InfoTooltip(props) {


  return (

    <form className={`popup popup-info ${props.isOpen}`} name="infoPopup">
      <div className="popup__container">
        <button onClose={props.onClose} className="popup__close-btn popup-add__close-btn opacity" type="reset"></button>
        <>{props.children}</>
      </div>
      <div className="popup__overlay overlay-add"></div>
    </form>

  )
}

export default InfoTooltip;