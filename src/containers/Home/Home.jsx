import React from 'react';
import Sidebar from './Sidebar/SideBar';
import MoviesList from './MoviesList/MoviesList';
import './Home.css';
import Animation from './Animation/Animation';
import { useEffect, useState } from 'react';

const Home = () =>  {
    const [aff, setAff] = useState(true);
    
    useEffect(() => {  
        if (localStorage.hasOwnProperty('animation')) {
            setTimeout(() => {
                localStorage.removeItem('animation');
                setAff(false);
            }, 4000);
        }
        else
            setAff(false)
    }, []);
    
    const Page = (
        <div className="Page">
            <div className="Gauche">
                <Sidebar/>
            </div>
             <div className="Droite">
                <MoviesList/>
            </div>
        </div>
    )
    let display = aff ? <Animation/> : Page;

    return (
        <> 
            {display}
        </>
    )   
}

export default Home;
