import React from 'react';
import Sidebar from './Sidebar/SideBar';
import MoviesList from './MoviesList/MoviesList';
import Animation from './Animation/Animation';
import MySlider from './Slider/Slider';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import './Home.css';

const Home = () =>  {
    const [aff, setAff] = useState(true);
    const dispatch = useDispatch();
    const hideAction = useCallback(() => { 
        dispatch(actions.showToolbarAndFooter());
    }, [dispatch]);

    useEffect(() => {
        if (localStorage.getItem('animation')) {
            setTimeout(() => {
                hideAction()
                localStorage.removeItem('animation');
                setAff(false);
            }, 4000);
        }
        else
            setAff(false)
    }, [hideAction]);
    
    const Page = (
        <div className="Page">
            <MySlider style={{margin:'auto'}}/>
            <div className="Gauche">
                <Sidebar/>
            </div>
             <div className="Droite">
                <MoviesList/>
            </div>
        </div>
    )
    let display = aff ? <Animation/> : Page;

    return <>{display}</> 
}

export default Home;