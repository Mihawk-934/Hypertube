import React, { useState, useEffect } from 'react';
import './PhotoUser.css';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import firebase from '../../../../fire';

const PhotoUser = () => {
    let id = localStorage.getItem('id');
    let fileName = 'image';
    let newDirectory = id;
    let storage = firebase.storage().ref(`images/${newDirectory}/${fileName}`);
    
    const [ image, setImage ] = useState(null);
    const [ imageTmp, setImageTmp ] = useState(null);
    const [ good, setGood ] = useState(false);

    const dispatch = useDispatch();
    const photoProfil = (image) => dispatch(actions.photoUrl(image))

    let photoSocial = localStorage.getItem('photo');
    let photoPhone = localStorage.getItem('photoPhone');

    useEffect (() => {
        if (localStorage.getItem('photo')) {
            setImage(localStorage.getItem('photo')) 
            photoProfil(localStorage.getItem('photo'));
        }
        else if (localStorage.getItem('photoPhone')){
            setImage(localStorage.getItem('photoPhone')) 
            photoProfil(localStorage.getItem('photoPhone'));
        }
        else {
            storage.getDownloadURL()
                .then(function(url) {
                    if (url) {
                        photoProfil(url);
                        setImage(url);
                    }
                })
                .catch(err => {
                    setImage('https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
                })
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== image ) {
                console.log(e.target.files[0])
                setImageTmp(e.target.files[0]);
                setGood(true);
            }            
        }         
    };
    
    const handleUpload = async () => {
        if(good) {
            if (image !== undefined) {
                await storage.put(imageTmp)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }
            await storage.getDownloadURL()
                .then(function(url) {
                    photoProfil(url);
                    setImage(url);
                    setGood(false);                
                })
                .catch(err => {
                    console.log(err)
                })
        }        
    }

    return (
        <div className="BlockContainer">
            <div className="TitleBackground">
                <h4 className='h4'>Photo de Profil</h4>
            </div>
            <div className="BlockImageProfil">
                <img src={image} className='ImgProfil'alt=''/>
                { (!photoSocial && !photoPhone) && 
                <div className="BlockButton">
                    <input style={{color:'black', cursor:'pointer'}} type='file' accept="image/*" onChange={handleChange} />
                    <button className="ButtonUpload" onClick={handleUpload}>Upload</button>
                </div> }    
            </div>
        </div>
    )
}

export default PhotoUser;