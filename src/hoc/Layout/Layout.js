import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
import ButtonTop from './ButtonTop/ButtonTop';
import Footer from './Footer/Footer';

class Layout extends Component {
    render () {
        return (
            <>
                { localStorage.getItem('token') ? <Toolbar /> : null }
                <main>
                    {this.props.children}
                </main>
                <ButtonTop />
                { localStorage.getItem('token') ? <Footer /> : null }
            </>
        )
    }
};

export default Layout;