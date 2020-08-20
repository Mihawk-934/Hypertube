import React, { useEffect } from 'react';
import Toolbar from './Toolbar/Toolbar';
import ButtonTop from './ButtonTop/ButtonTop';
import Footer from './Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import  * as actions from '../../store/actions/index';

const Layout = (props) =>  {
    const dispatch = useDispatch();
    const hideAction = () => {
        dispatch(actions.hideToolbarAndFooter())
    }

    useEffect(() => {
        if (localStorage.getItem('token'))
            hideAction()   
    }, [])
    const hide = useSelector((state => state.auth.hideToolbatAndFooter))

    return (
        <>
            { hide && <Toolbar /> }
            <main>
                {props.children}
            </main>
            <ButtonTop />
            { hide && <Footer /> }
        </>
    )
};

export default Layout;