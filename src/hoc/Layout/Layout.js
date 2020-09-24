import React, { useEffect, useCallback } from 'react';
import Toolbar from './Toolbar/Toolbar';
import ButtonTop from './ButtonTop/ButtonTop';
import Footer from './Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import  * as actions from '../../store/actions/index';

const Layout = (props) =>  {
    const dispatch = useDispatch();
    const showAction = useCallback(() => { 
        dispatch(actions.showToolbarAndFooter());
    }, [dispatch]);
    
    useEffect(() => {
        if (localStorage.getItem('token'))
            showAction()   
    }, [showAction])
    
    const show = useSelector((state => state.auth.show))

    return (
        <>
            { show && <Toolbar /> }
            <main>
                {props.children}
            </main>
            <ButtonTop />
            { show && <Footer /> }
        </>
    )
};

export default Layout;