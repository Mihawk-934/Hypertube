import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { checkInput } from "../../../components/utility/utility";
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from '../../../components/MyButton/MyButton';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { Form } from 'react-bootstrap';
import '../auth.css';

class Login extends Component {
    state = {
        values: {},
        errors: {},
        disabled: true,
        form: [
            {
                controlId: "mail",
                label: "Email",
                type: "text",
                min: 4,
                max: 40
            },
            {
                controlId: "password",
                label: "Mot de passe",
                type: "password",
                min: 6,
                max: 15
            }
        ]
    };

    componentWillUnmount () {
        this.props.initError(null);
    };
    
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
                Object.values(this.state.errors).join('').length === 0 && Object.keys(this.state.errors).length === 2 ? 
                this.setState({ disabled: false }) : this.setState({ disabled: true });
            })
        });
    };

    submit = (e) => {
        e.preventDefault();
        this.props.authLogin(this.state.values.mail, this.state.values.password, this.props.history);
    };

    render () {
        const form = (
            <Form className="login-form eiga-form" onSubmit={this.submit}>
                <div className="login-form-content">
                    {this.state.form.map(input => (
                        <MyInput
                            data-test={input.label}
                            key={input.label}
                            controlId={input.controlId}
                            type={input.type}
                            label={input.label}
                            placeholder={input.label}
                            error={this.state.errors[input.controlId]}
                            changed={(e) => this.changedHandler(e, input.min, input.max)}
                        />
                    ))}
                    <Form.Group className="Links">
                        <Form.Text>
                            Pas encore membre ? <NavLink className="Link" to="/register">Par ici !</NavLink>
                        </Form.Text>
                        <Form.Text>
                            <NavLink className="Link" to="/forget_password">Mot de passe oublié ?</NavLink>
                        </Form.Text>
                    </Form.Group>
                    <MyButton data-test="button" disabled={this.state.disabled} />
                    <p className="errorAuth">{this.props.error}</p>
                </div>
            </Form>
        )

        return (
            <Wrapper form={form} title="Connexion" social={true}/>
        );
    };
};

const mapStateToProps = state => {
    return {
        error: state.auth.errorServor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authLogin: (email, password, router) => dispatch(actions.authLogin(email, password,router)),
        initError: (error) => dispatch(actions.errorServor(error)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Login)); 