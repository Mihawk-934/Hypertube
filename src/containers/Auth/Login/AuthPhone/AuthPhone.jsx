import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import firebase from '../../../../fire';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';
import '../../auth.css';
import { checkInput } from '../../../../components/utility/utility';

class Phone extends Component {
    state = {
        values: {},
        errors: {},
        errorCatch:'',
        disable: true,
        show: false,
        codeError: null,
        code: false
    }

    handleInput = (e, number) => {
        const Id = e.target.id;
        const values = {...this.state.values};
        values[Id] = e.target.value;
        this.setState({ values : values }, () => {
            let error = null;
            error = checkInput(Id, values[Id]);
            const errors = {...this.state.errors};
            errors[Id]= error;
            this.setState({ errors: errors }, () => {
                Object.values(this.state.errors).join('').length === 0 && Object.keys(this.state.errors).length === number ? 
                this.setState({ disable: false }) : this.setState({ disable: true });
            })
        });
    }

    sendCode = (e) => {  
        e.preventDefault();
        firebase.auth().languageCode = 'fr';
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", { size:"invisible" });
        let phoneNumber = this.state.values.phone;
        let appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(confirmationResult => { 
                this.setState({ show: true, disable : true }, () => {
                    window.confirmationResult = confirmationResult;
                    phoneNumber = null;
                })
            })
            .catch(error => {
                this.setState({errorCatch:error.message})
            });
    }
        
    receiveCode = (e) => {
        e.preventDefault();
        const verificationId = this.state.values.codeVerification;
        window.confirmationResult
        .confirm(verificationId)
        .then(result => {
            localStorage.setItem('photoPhone', 'https://img.over-blog-kiwi.com/2/71/08/42/20190322/ob_3e6dd6_f4f45f93-efae-4acd-a7c7-0fefe62c85dd.png');
            localStorage.setItem('animation', true);
            localStorage.setItem('id',result.user.uid);
            localStorage.setItem('token', result.user.ma);
            localStorage.setItem('show', true);
            this.props.onPhone(result.user.ma,result.user.uid);
            this.props.history.push('/home');
        })
        .catch(error => {
            this.setState({codeError:'Error'});
        });
    }

    render() {
        let msgCatch;
        let formPhone;
        let formCode; 

        if (this.state.errorCatch && this.state.codeError === null)
            msgCatch = <p>Trop d'essai votre compte a été temporairement suspendu. Reesayer plus tard</p>;
        
        if (this.state.codeError)
            msgCatch = <p>le code ne coresspond pas a celui qui vous a été envoyer veuillez ressayer</p>;

        if (this.state.show === false) {
            formPhone = (
                <Form className="login-form eiga-form" onSubmit={this.onSubmit}>
                    <div className="login-form-content">
                        {msgCatch}
                        <MyInput 
                            label="Connexion via Smarthpone" 
                            id="phone"
                            type="tel"
                            placeholder="ex:+33610122325"
                            error={this.state.errors.phone} 
                            maxLength='12'
                            changed={(e) => this.handleInput(e, 1)} />
                        <p> Entrer votre numero de mobile pour recevoir un code par SMS </p>
                        <MyButton id="recaptcha-container" disabled={this.state.disable} clicked={(e) => this.sendCode(e)}/>
                    </div>
                </Form>
            )
        }

        else if (this.state.show) {
            formCode = (
                <Form className="login-form eiga-form" onSubmit={this.onSubmit}>
                    <div className="login-form-content">
                        {msgCatch}
                        <MyInput 
                            label="Entrer Votre Code"
                            id="codeVerification"
                            type="tel"
                            placeholder="Tapez le code de verification"
                            error={this.state.errors.codeVerification} 
                            maxLength='6'
                            value={this.state.values.codeVerification}
                            changed={(e) => this.handleInput(e, 2)} />
                        <p> Entrer le code reçu par SMS </p>
                        <MyButton id="recaptcha-container" disabled={this.state.disable} clicked={this.receiveCode}/>
                    </div>
                </Form>
            )
        }

        return (
            <> 
                {formPhone}
                {formCode}
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPhone: (token, userId) => dispatch(actions.authSuccess(token, userId))
    };
};

export default withRouter(connect(null, mapDispatchToProps) (Phone));
