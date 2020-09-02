import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'

const CbUser = () => {
    return (
        <div className="BlockContainer">
            <div className="TitleBackground">
                <h4 className='h4'>Carte bancaire</h4>
            </div>
            <div className="BlockCbUser">
                <Cards
                    cvc={'122'}
                    expiry={'1234'}
                    focused={'name'}
                    name={'Mr DUPONT'}
                    number={1234123412341234}/>
            </div>
        </div>
    )
}

export default CbUser;