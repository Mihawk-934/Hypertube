import React, { useEffect, useState }  from 'react';
import MyButton from '../../../../../components/MyButton/MyButton';
import axios from 'axios';
import { toast } from 'react-toastify';

const InfoUser = () => {
    const [id, setId] = useState('');
    const [idToken, setIdToken] = useState('');
    const [mail, setMail] = useState('');

    useEffect(() => {
        if (mail.length === 0)
            setMail(localStorage.getItem('email'))
        setIdToken(localStorage.getItem('token'));
        setId(localStorage.getItem('id'));
        let idLocal = localStorage.getItem('id');
        axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/mail.json/`)
            .then(response => { 
                setMail(response.data.mail) 
            })
            .catch(err => { 
                //  console.log(err)
            })
    },[mail.length]) 
 
    const handleSubmitMail = (e) => {
        e.preventDefault(); 
        const authData = {
            idToken:idToken,
            email: mail,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDPBaoPmbCgQfEQNz9VgHt88mGg6Jv4ces', authData)
            .then(response => { 
                console.log('[1]', response)
                const mail = { mail : response.data.email };
                axios.put(`https://movies-27cd5.firebaseio.com/${id}/mail.json/`, mail)
                    .then(res => {  
                        console.log(res)
                        toast.success('Info perso mise à jour.', {
                            autoClose: 3000,
                            closeButton: false,
                            className: "toastCss"
                        })
                    })
                    .catch(err => { 
                        toast.error('Erreur, veuillez ressayer plus tard 😮.', {
                            autoClose: 3000,
                            closeButton: false,
                            className: "toastCss"
                        })
                    })
            })
            .catch(err => {
                toast.error('Erreur, veuillez ressayer plus tard 😮.', {
                    autoClose: 3000,
                    closeButton: false,
                    className: "toastCss"
                })
            })      
    }
 
    return (
        <div className="BlockContainer">
            <div className="TitleBackground">
                <h4 className='h4'>Adresse Mail</h4>
            </div>
            <form onSubmit={handleSubmitMail} className="BlockUserInfo">
                <div className='Duo'>
                    <input className='Input'
                        type="mail"
                        id="mail"
                        placeholder="Mail" 
                        minLength="6"
                        value={mail}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="email incorrect ex: netflix@gmail.com"
                        onChange={(e)=> setMail(e.target.value)}
                        required />
                </div>
                <div style={{width: '200px'}} className='Duo'>
                    <MyButton />
                </div>
            </form>
        </div> 
    )
}

export default InfoUser; 