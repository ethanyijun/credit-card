import React, {useEffect, useState} from 'react'
import '../credit-card.css';
import visaCardLogo from '../img/visa.jpg';
import masterCardLogo from '../img/master.jpg';

const CreditCardComponent = (props) => {
    const [cardLogo, setCardLogo] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    useEffect (()=>{
        if(props.cardLogo == "masterCardLogo"){
            setCardLogo(masterCardLogo);
        }
        if(props.cardLogo == "visaCardLogo"){
            setCardLogo(visaCardLogo);
        }
        if(props.cardLogo == ""){
            setCardLogo("");
        }
        const number = props.number.toString();
        if(number.length > 4) {
            setCardNumber(number.substring(0, 4) + " " + number.substring(4, number.length));
        } else {
            setCardNumber(number);
        }
        if(number.length > 8) {
            setCardNumber(number.substring(0, 4) + " " + number.substring(4, 8) + " " + number.substring(8, number.length));
        }
        if(number.length > 12) {
            setCardNumber(number.substring(0, 4) + " " + number.substring(4, 8) + " " + number.substring(8, 12) + " " + number.substring(12, number.length));
        }
    }, [props.number, props.cardLogo]);
    
    return (
        <div className='credit-card'>
            <div className='credit-card__logo'>
                <img className='logo' src={cardLogo} width="60" alt=""/>
            </div>

            <div className='credit-card__number'>{cardNumber}</div>
            
            <div className='credit-card__info'>
                <div className='credit-card__info_name'>
                    <div className='credit-card__info_label'>Card Holder</div>
                    <div>{props.name}</div>
                </div>

                <div className='credit-card__info_expiry'>
                    <div className='credit-card__info_label'>Expires</div>
                    <div>{props.month}/{props.year}</div>
                </div>
            </div>

        </div>
    )
}

export default CreditCardComponent
