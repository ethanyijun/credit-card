import React from 'react'
import '../credit-card.css';

const CreditCardComponent = (props) => {
    return (
        <div className='credit-card back'>
            <div className='black-bar'></div>
            
            <div className='white-wrapper'>
                <div className='credit-card__info_cvv'>
                    <div className='credit-card__info_label'>CVV</div>
                    <div className='credit-card__info_value'>{props.cvv}</div>
                </div>
            </div>
        </div>
    )
}

export default CreditCardComponent