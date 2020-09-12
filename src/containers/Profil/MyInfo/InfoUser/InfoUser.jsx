import React, { useEffect, useState }  from 'react';
import MyButton from '../../../../components/MyButton/MyButton';
import axios from 'axios';
import '../MyInfo.css';
import './InfoUser.css';

const InfoUser = () => {

    const [id, setId] = useState('');
    const [idToken, setIdToken] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [mail, setMail] = useState('');

    useEffect(() => {
        setIdToken(localStorage.getItem('token'));
        setId(localStorage.getItem('id'));
        let idLocal = localStorage.getItem('id');
        axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/user.json/`)
            .then(response => {
                setAddress(response.data.address) 
                setName(response.data.name)   
                setLastname(response.data.lastname)
            })
            .catch(err => { console.log(err)})
        axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/mail.json/`)
            .then(response => { 
                setMail(response.data.mail) 
            })
            .catch(err => { 
                console.log(err)
            })
    },[]) 
 
    const handleSubmitMail = (e) => {
        e.preventDefault(); 
        const authData = {
            idToken:idToken,
            email: mail,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E', authData)
            .then(response => { 
                const mail = { mail : response.data.mail };
                axios.put(`https://movies-27cd5.firebaseio.com/${id}/mail.json/`,mail)
                    .then(response => { 
                        console.log(response) 
                    })
                    .catch(err => { 
                        console.log(err) 
                    })
            })
            .catch(err => {
                console.log(err.response.data.error.message)
            })      
    }
 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const data = {
            name: name,
            lastname: lastname,
            address: address,
        };
        axios.put(`https://movies-27cd5.firebaseio.com/${id}/user.json/`,data)
            .then(response => {
                console.log('data',response);  
            })
            .catch(err => {
                console.log('data',err.response)
            })    
    }
 
    return (
        <>
           {localStorage.getItem('social') && 
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Informations Personelles</h4>
                </div>
                <form onSubmit={handleSubmitMail} className="BlockUserInfo">
                    <div className='Duo'>
                        <input className='Input' type="mail" id="mail" placeholder="Mail" 
                            minLength="6" value={mail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="email incorrect ex: netflix@gmail.com"
                            onChange={(e)=> setMail(e.target.value)} required />
                    </div>
                    <div style={{width: '200px'}}className='Duo'>
                        <MyButton />
                    </div>
                </form>
            </div>}

            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Informations Personelles</h4>
                </div>
                <form onSubmit={handleSubmit} className="BlockUserInfo">
                    <div className='Duo'>
                        <input className='Input' type="text" id="nom" placeholder="Nom" 
                            minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={name} title="Nom incorrect"
                            onChange={(e)=> setName(e.target.value)} required />
                    </div>
                    <div className='Duo'>
                        <input className='Input' type="text" id="prenom" placeholder="Prenom"
                            minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={lastname} title="Prenom incorrect"
                            onChange={(e)=> setLastname(e.target.value)} required />
                    </div>
                    <div className='Duo'>
                        <input className='Input' type="text" id="adresse" placeholder="Adresse" 
                            pattern="([a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_-]| |/|\\|@|#|\$|%|&)+" value={address} title= "pas de caracteres speciaux" 
                            onChange={(e)=> setAddress(e.target.value)} required />
                    </div>
                    <div style={{width: '200px'}}className='Duo'>
                        <MyButton style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #ae0000, #000000)'}}/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default InfoUser; 