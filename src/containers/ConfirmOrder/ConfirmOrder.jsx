import React from 'react';

const ConfirmOrder = () => {
    let order = 'FUWTS' + localStorage.getItem('numOrder');

    return (
        <div style={{height:'100vh', width:'65%', margin:'auto', marginTop:'50px'}}>
            <div style={{textAlign:'center'}}>
                <img alt="good" src='https://www.welovebuzz.com/wp-content/uploads/2019/11/giphy-5-8.gif' style={{borderRadius:'50%'}}/>
            </div>
            <h1 style={{marginTop:'50px'}}>Merci, nous avons reçu votre commande <br/>nᵒ {order}</h1>
            <p style={{marginTop:'50px'}}>Veuilez consulter votre messagerie pour obtenir la confirmation de commande, ainsi que tout les details correspond a votre achat.</p>
            <p>Vous avez dorenavant la possibilite d'acceder a vos films dans votre espace perso.</p>
            <p>Facture livrer au (adresse client).</p>
        </div>
    )
}
export default ConfirmOrder;