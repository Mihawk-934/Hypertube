import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.resetFiltres();
        this.props.resetTextSearch();
        this.props.initialise();
        this.props.popularRequest(1);
        this.props.initCart();
        this.props.onLogout();
    }

    render () {
        return (<Redirect to="/"/>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetFiltres: () => dispatch(actions.initialiseFiltres()),
        resetTextSearch: () => dispatch(actions.initialiseTextSearch()),
        initialise: () => dispatch(actions.initialise()),
        popularRequest: (page) => dispatch(actions.popularRequest(page)),
        initCart: () => dispatch(actions.initCart()),
        onLogout: () => dispatch(actions.authLogout())
    };
}

export default connect(null,mapDispatchToProps)(Logout);