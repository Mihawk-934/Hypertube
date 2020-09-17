import React, { useState, useEffect } from 'react';
import Img from '../../../../assets/miclaude.png';
import { MdAddAPhoto } from 'react-icons/md';
import '../MyInfo.css';
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

    let imageProfil = localStorage.getItem('photo');

    useEffect (() => {
        if (localStorage.getItem('photo')) {
            setImage(localStorage.getItem('photo')) 
            photoProfil(localStorage.getItem('photo'));
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
                    console.log(err)
                })
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== image ) {
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
                {/* <img src={Img} className='ImgProfil'alt=''/>
                <div className='BlockLogo'>
                    <MdAddAPhoto className='LogoAdd'/>
                </div> */}
                 { image !== null ? 
                        <img src={image} alt='' style={{height:'140px', width:'140px',borderRadius:'10px'}}/>
                        : <div style={{height:'140px', width:'140px'}}/>}
                        { !imageProfil && <div>
                            <input style={{color:'black'}}type='file' accept="image/*" onChange={handleChange}  /> 
                            <button onClick={handleUpload}>Upload</button>
                        </div> }    
            </div>
        </div>
    )
}

export default PhotoUser;