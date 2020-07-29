import React, { Component } from 'react';

import Toolbar from './Toolbar/Toolbar';
import ButtonTop from './ButtonTop/ButtonTop';
import Footer from './Footer/Footer';

import Aux from '../Aux/Aux';

class Layout extends Component {
    render () {
        return (
            <Aux>
                { localStorage.getItem('token') ? <Toolbar /> : null }
                <main>
                    {this.props.children}
                </main>
                <ButtonTop />
                <Footer />
            </Aux>
        )
    }
};

export default Layout;