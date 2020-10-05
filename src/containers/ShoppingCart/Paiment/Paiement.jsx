import React from 'react';

const Paiement = ({qte, total, submit}) => (
    <div className="DroiteCart"> 
        <h4 className="titleRecap">Récapitulatif</h4>
        <div className="Recapitulatif">
            <div className="rubriqueRecapitulatif">
                <p className="infoGauche">Nombre d'articles</p>
                <p className="infoDroite">{qte}</p>
            </div>
            <div className="rubriqueRecapitulatif">
                <p className="infoGauche">Date de prise en charge et d'expédition estimée</p>
                <p className="infoDroite" style={{textDecoration:'line-through'}}> 0 € </p>
            </div>
            <p style={{textAlign:'center', fontStyle: 'italic'}}>Expedition offerte jusqu'au 31/12/2020</p>
            <div className='totalPrice'>
                <p className="totalPriceGauche">Total</p>
                <p className="totalPriceDroite">{total} €</p>
            </div>
        </div>
        <div className='blockButton'>
            <button className="buttonPaiment" disabled={qte === 0 ? true : false } onClick={submit}>Paiement</button>
        </div>
    </div>
)


export default Paiement;