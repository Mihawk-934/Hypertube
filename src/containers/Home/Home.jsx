import React from 'react';
import Sidebar from './Sidebar/SideBar';
import MoviesList from './MoviesList/MoviesList';
import './Home.css';

const Home = () => (
    <div className="Page">
        <div className="Gauche">
            <Sidebar/>
        </div>
        <div className="Droite">
            <MoviesList/>
        </div>
    </div>
) 

export default Home;
  