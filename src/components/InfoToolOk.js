
import InfoTooltip from './InfoTooltip';
import okImg from '../images/Union.png';

function InfoToolOk(props) {


  return(

    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} name="ok">
      <img className="popup-info__img" src={okImg} alt="" />
      <h2 className="popup__title">
        Вы успешно <br />
        зарегистрировались!
      </h2>
    </InfoTooltip>
  )
}

export default InfoToolOk;