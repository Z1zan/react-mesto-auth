import InfoTooltip from './InfoTooltip.js'

function InfoToolNope(props) {


  return(

    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose}>
      <img className="popup-info__img" src="./images/Union.png" alt="" />
      <h2 className="popup__title">
        Что-то пошло не так! <br />
        Попробуйте ещё раз.
      </h2>
    </InfoTooltip>

  )
}

export default InfoToolNope;
