import React, { useEffect, useCallback } from 'react';
import Toolbar from './Toolbar/Toolbar';
import ButtonTop from './ButtonTop/ButtonTop';
import Footer from './Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import  * as actions from '../../store/actions/index';
import Tchat from './Tchat/Tchat';

const Layout = (props) =>  {
    const show = useSelector((state => state.auth.show));
    const tchat = useSelector((state => state.auth.tchat));
    const dispatch = useDispatch();
    const showAction = useCallback(() => { 
        dispatch(actions.showToolbarAndFooter());
    }, [dispatch]);

    useEffect(() => {
        if (localStorage.getItem('token'))
            showAction()   
    }, [showAction])

    return (
        <>
            <header>
                { show && <Toolbar /> }
            </header>
            <main>
                {props.children}
            </main>
            { show && <ButtonTop /> }
            { show && <Footer /> }
            { show && tchat && <Tchat />}
        </>
    )
};

export default Layout;