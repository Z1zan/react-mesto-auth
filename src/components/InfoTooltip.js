
function InfoTooltip(props) {


  return (

    <form class="popup popup-info popup_opened" name="infoPopup">
      <div class="popup__container">
        <button class="popup__close-btn popup-add__close-btn opacity" type="reset"></button>
        <>{props.children}</>
      </div>
      <div class="popup__overlay overlay-add"></div>
    </form>

  )
}

export default InfoTooltip;