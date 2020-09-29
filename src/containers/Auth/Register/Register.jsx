import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { checkInput } from "../../../components/utility/utility";
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from "../../../components/MyButton/MyButton";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'; 
import { Form, Spinner } from "react-bootstrap";
import  '../auth.css';

class Register extends Component {
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
    this.props.initRegisterSuccess(false);
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

  submit = e => {
    e.preventDefault();
    this.props.onAuth(this.state.values.mail, this.state.values.password, this.props.history);
  };

  render() {
   
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
          <Form.Text className="mt-3">
            Deja membre ?<NavLink className='Link' to="/login"> Connectez-vous</NavLink>
          </Form.Text>
          <MyButton data-test="button" disabled={this.state.disabled} />
        </div>
        <div style={{display:'flex', flexDirection:'column', margin:'auto'}}>
          <p className="errorAuth">{this.props.errorServor}</p>
          <div style={{margin:'auto'}}>{this.props.registerSuccess && <Spinner margin='auto' animation="border" variant="danger" />}</div>
        </div> 
      </Form>
    )

    return (
      <Wrapper form={form} title="Inscription" />   
    );
  };
};

const mapStateToProps = state => {
  return {
    errorServor: state.auth.errorServor,
    registerSuccess: state.auth.registerSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initRegisterSuccess: (value) => dispatch(actions.registerSuccess(value)),
    initError: (error) => dispatch(actions.errorServor(error)),
    onAuth: (email, password, router) => dispatch(actions.authRegister(email, password, router)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Register));
