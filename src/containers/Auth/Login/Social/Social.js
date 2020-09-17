import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import { providerG, providerF,providerT } from '../../../../fire';
import '../../auth.css';
import AuthPhone from '../AuthPhone/AuthPhone';

import { FcIphone} from "react-icons/fc";

class Social extends Component {
    state = {
        show: false
    }

    authsocial = (provider) => {
        if (provider === providerT)
            this.props.socialTwitter(provider,this.props.history);
        else if (provider === providerF)
            this.props.socialFacebook(provider,this.props.history);
        else
            this.props.socialAuth(provider,this.props.history);
    }

    displayInput = () => (
        this.setState((prevstate) =>{
            return {show: !prevstate.show}
        })
    )

    render () {
        return (
            <div>
                <div className="alternate-login">Ou</div>  
                <div className="login-social-wrapper">
                    <button className="login-social" onClick={()=>this.authsocial(providerF)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.18 31.93c.97 0 1.75-.78 1.75-1.75V1.82c0-.97-.78-1.75-1.75-1.75H1.82C.85.07.07.85.07 1.82v28.36c0 .97.78 1.75 1.75 1.75h28.36z" fill="#3C5A99"/><path d="M22.05 31.93V19.6h4.15l.62-4.82h-4.77V11.7c0-1.38.4-2.33 2.4-2.33h2.53v-4.3c-.44-.06-1.95-.2-3.7-.2-3.68 0-6.2 2.25-6.2 6.37v3.54h-4.15v4.8h4.16v12.35h4.93z" fill="#FFF"/>
                        </svg>
                    </button>
            
                    <button className="login-social" onClick={()=>this.authsocial(providerT)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 26">
                            <path d="M32 3.076a13.14 13.14 0 0 1-3.771 1.034A6.584 6.584 0 0 0 31.116.478a13.166 13.166 0 0 1-4.169 1.593 6.557 6.557 0 0 0-4.792-2.073 6.565 6.565 0 0 0-6.565 6.565c0 .514.058 1.015.17 1.496a18.639 18.639 0 0 1-13.532-6.86 6.539 6.539 0 0 0-.889 3.3 6.563 6.563 0 0 0 2.92 5.465 6.532 6.532 0 0 1-2.973-.821l-.001.083a6.568 6.568 0 0 0 5.267 6.437 6.578 6.578 0 0 1-2.965.113 6.571 6.571 0 0 0 6.133 4.559 13.172 13.172 0 0 1-8.154 2.81c-.53 0-1.052-.031-1.566-.091a18.587 18.587 0 0 0 10.064 2.949c12.076 0 18.679-10.004 18.679-18.68 0-.284-.006-.567-.019-.85A13.315 13.315 0 0 0 32 3.077" fill="#55acee" />
                        </svg>
                    </button>
            
                    <button className="login-social" onClick={()=>this.authsocial(providerG)}>
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none"><rect fill="#FFF" width="40" height="40" rx="2"/>
                            <path d="M28.64 20.2c0-.63-.06-1.25-.16-1.84H20v3.48h4.84c-.2 1.13-.84 2.08-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.62z" fill="#4285F4" /><path d="M20 29c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.82.54-1.85.86-3.06.86-2.34 0-4.33-1.58-5.04-3.7h-3v2.32C13.44 26.98 16.48 29 20 29z" fill="#34A853" /><path d="M14.96 21.7c-.18-.53-.28-1.1-.28-1.7 0-.6.1-1.17.28-1.7v-2.34h-3c-.6 1.2-.96 2.6-.96 4.04 0 1.45.35 2.83.96 4.04l3-2.33z" fill="#FBBC05" /><path d="M20 14.58c1.32 0 2.5.45 3.44 1.35l2.58-2.6C24.46 11.9 22.42 11 20 11c-3.52 0-6.56 2.02-8.04 4.96l3 2.33c.7-2.15 2.7-3.73 5.04-3.73z" fill="#EA4335" /></g>
                        </svg>
                    </button>

                    <button className="login-social" onClick={this.displayInput}>
                        <FcIphone/>
                    </button>
                </div>

                {this.state.show ? <AuthPhone /> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        socialAuth:(provider,history) => dispatch(actions.socialAuth(provider,history)),
        socialFacebook:(provider,history) => dispatch(actions.socialFacebook(provider,history)),
        socialTwitter:(provider,history) => dispatch(actions.socialTwitter(provider,history)),

    };
};
  
export default withRouter(connect(null, mapDispatchToProps) (Social));