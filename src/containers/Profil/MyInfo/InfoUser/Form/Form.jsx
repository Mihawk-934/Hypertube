import React, { useEffect, useState }  from 'react';
import MyButton from '../../../../../components/MyButton/MyButton';
import axios from 'axios';
import { toast } from 'react-toastify';

const InfoUser = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
  
    useEffect(() => {    
        setId(localStorage.getItem('id'));
        let idLocal = localStorage.getItem('id');
        axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/user.json/`)
            .then(response => {
                setAddress(response.data.address) 
                setName(response.data.name)   
                setLastname(response.data.lastname)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])
 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const data = {
            name: name,
            lastname: lastname,
            address: address,
        };
        axios.put(`https://movies-27cd5.firebaseio.com/${id}/user.json/`,data)
            .then(res => {
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
    }
 
    return (
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
                <div style={{width: '200px'}} className='Duo'>
                    <MyButton />
                </div>
            </form>
        </div>
    )
}

export default InfoUser; 