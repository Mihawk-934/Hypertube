import React from 'react';
import Img from '../../../../assets/miclaude.png';
import { MdAddAPhoto } from 'react-icons/md';
import '../MyInfo.css';
import './PhotoUser.css';

const PhotoUser = () => {

    return (
        <div className="BlockContainer">
            <div className="TitleBackground">
                <h4 className='h4'>Photo de Profil</h4>
            </div>
            <div className="BlockImageProfil">
                <img src={Img} className='ImgProfil'alt=''/>
                <div className='BlockLogo'>
                    <MdAddAPhoto className='LogoAdd'/>
                </div>
            </div>
        </div>
    )
}

export default PhotoUser;