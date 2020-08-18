import React, { Component } from 'react';
import { checkInput } from "../../../components/utility/utility";
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from '../../../components/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import firebase from '../../../fire';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import { Form } from 'react-bootstrap';
import '../auth.css';


class FogertPwd extends Component {
    state = {
        errors: {},
        values: {},
        disabled : true,
        responseServor: null
    }
    
    changedHandler = (e, min, max) => {
        const Id = e.target.id;
        const values = {...this.state.values};
        values[Id] = e.target.value;

        this.setState({values : values}, () => {
            let error = null; 
            error = checkInput(Id, values[Id], min, max);
            const errors = {...this.state.errors};
            errors[Id] = error;
            this.setState({errors: errors}, () => {
                Object.values(this.state.errors).join('').length === 0 && Object.keys(this.state.errors).length === 1 ? 
                this.setState({ disabled: false }) : this.setState({ disabled: true });
            })
        });
    };

    submit = (e) => {
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.values.mail).then(response =>{
            this.setState({responseServor:'Un mail viens de vous etre envoyer'})
        })
        .catch(err => {
            this.setState({responseServor:'Adresse mail invalid'})
        })
    };

    render () {
        const form = (
            <Form className="login-form eiga-form" onSubmit={this.submit}>
                <div className="login-form-content">
                    <Form.Text>
                        Saisissez l’adresse email de votre compte afin de recevoir des instructions pour réinitialiser votre mot de passe.
                    </Form.Text>
                    <MyInput
                        data-test="Email"
                        controlId="mail"
                        type="text"
                        label="Email"
                        placeholder="Email"
                        error={this.state.errors["mail"]}
                        changed={(e) => this.changedHandler(e, 4, 40)} />
                    <MyButton data-test="button" disabled={this.state.disabled} />
                    {
                        this.state.responseServor ? 
                        <p className="errorAuth">{this.state.responseServor}</p> 
                        : null
                    }
                    <Form.Group className="Links">
                        <Form.Text>
                            Pas encore membre ? <NavLink className="Link" to="/register">Par ici !</NavLink>
                        </Form.Text>
                        <Form.Text >
                            Deja membre ?<NavLink className='Link' to="/"> Connectez-vous</NavLink>
                        </Form.Text>
                    </Form.Group>
                </div>
            </Form>
        )
        return (
            <Wrapper form={form} title="Mot de passe oublié ?" />
        );
    };
};

export default FogertPwd;