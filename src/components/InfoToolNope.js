import InfoTooltip from './InfoTooltip.js'

import nopeImg from '../images/UnionNope.png'

function InfoToolNope(props) {


  return(

    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} name="nope">
      <img className="popup-info__img" src={nopeImg} alt="" />
      <h2 className="popup__title">
        Что-то пошло не так! <br />
        Попробуйте ещё раз.
      </h2>
    </InfoTooltip>

  )
}

export default InfoToolNope;
