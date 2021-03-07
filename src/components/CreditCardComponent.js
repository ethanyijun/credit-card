import React, {useEffect, useState} from 'react'
import '../credit-card.css';
import visaLogo from '../img/visa.jpg';
import masterCardLogo from '../img/master.jpg';

const CreditCardComponent = (props) => {
    const [cardLogo, setCardLogo] = useState('');

    useEffect (()=>{
        const masterCardRegex = /^5[1-5][0-9]{14}$/;
        const visaCardRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        setCardLogo(masterCardRegex.test(props.number)? masterCardLogo : visaCardRegex.test(props.number)? visaLogo : "");
    }, [props.number]);


    
    return (
        <div className='credit-card'>
            <div className='credit-card__logo'>
                <img className='logo' src={cardLogo} width="60" alt=""/>
            </div>

            <div className='credit-card__number'>{props.number}</div>
            
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
