import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import Filtres from './Filtre/Filtre';
import './SideBar.css';

const SideBar = () => (
    <div className="Sidebar">
        <SearchBar/>
        <Filtres/>
    </div> 
)
          
export default SideBar;