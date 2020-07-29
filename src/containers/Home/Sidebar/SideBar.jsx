import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import Filtres from './Filtre/Filtre';
import './SideBar.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'; 

class SideBar extends React.Component {
    handleSearchChange = (e) => {
        this.props.actionTextSearch(e.target.value);
    };

    render() {
        return (
            <div className="Sidebar">
                <SearchBar value={this.props.textSearch} changed={this.handleSearchChange} />
                <Filtres/>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        textSearch: state.movies.textSearch
    }
}
          
const mapDispatchToProps = dispatch => {
    return {
        actionTextSearch: (textSearch) => dispatch(actions.textSearch(textSearch)),
    };
};
          
export default connect(mapStateToProps, mapDispatchToProps) (SideBar);