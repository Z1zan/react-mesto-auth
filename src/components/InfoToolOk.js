
import InfoTooltip from './InfoTooltip';

function InfoToolOk(props) {


  return(

    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose}>
      <img className="popup-info__img" src="./images/Union.png" alt="" />
      <h2 className="popup__title">
        Вы успешно <br />
        зарегистрировались!
      </h2>
    </InfoTooltip>
  )
}

export default InfoToolOk;