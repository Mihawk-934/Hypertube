// import Photo from './Photo/Photo';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { checkInput } from '../../components/utility/utility';
import '../Auth/auth.css'
import Wrapper from '../../hoc/Wrapper/Wrapper';
import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';

class Register extends Component {
    state = {
        values: {},
        errors: {},
        disable: true,
        avatar: null,
        form: [
            {
                controlId: "lastName",
                label: "Nom",
                type: "text",
                min: 2,
                max: 20
            },
            {
                controlId: "firstName",
                label: "Prenom",
                type: "text",
                min: 2,
                max: 20
            },
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

    changedHandler = (e, min, max) => {
        const Id = e.target.id;
        const values = { ...this.state.values };
        values[Id] = e.target.value;
    
        this.setState({ values: values }, () => {
          let error = null;
          error = checkInput(Id, values[Id], min, max);
          const errors = { ...this.state.errors };
          errors[Id] = error; 
          this.setState({ errors: errors },
            () => { Object.values(this.state.errors).join('').length === 0 && Object.keys(this.state.errors).length === 5 ? this.setState({ disable: false }) : this.setState({ disable: true }); })
        });
    };

    submit = (e) => {
        e.preventDefault();
        console.log('OK');
    };

    render () {
        let form = (
            <Form className="login-form eiga-form" onSubmit={this.submit}>
                <div className="login-form-content">
                    <h3 className='H2'>Modifier mes informations</h3>
                    <Form.Group>
                        <Form.Label>Avatar</Form.Label>
                        {/* <Photo /> */}
                        <input style={{display: "none"}}type="file" onChange={this.handleChange} ref={fileInput => this.fileInput = fileInput}/>
                        <Form.Text className="text-muted">
                            {this.state.errors.avatar}
                        </Form.Text>
                    </Form.Group>
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
                    <MyButton disabled={this.state.disable}/>
                </div>
            </Form>
        )

        return (
            <Wrapper title="Profil" form = {form}/>
        );
    };
};


export default Register;