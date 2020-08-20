/* istanbul ignore file */

import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Pwd from './containers/Auth/ForgetPwd/ForgetPwd';
import Home from './containers/Home/Home';
import Movie from './containers/Movie/Movie';
import Profil from './containers/Profil/Profil';

import MyOrder from './containers/Profil/MyOrder/MyOrder';

import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/forget_password" component={Pwd}/>
        <Redirect to='/'/>
      </Switch>
    );

    if (localStorage.getItem('token')) {
      routes = (
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/movie/:id" component={Movie}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/home" component={Home}/>
        {/* <Route path="/profil" component={Profil}/> */}
        <Route path="/profil/MyOrder" exact component={MyOrder}/>
        <Route path="/profil" component={Profil}/>

        <Redirect to="/home"/>
      </Switch>
      )
    }

    return(
      <Aux>
        <Layout>
          {routes}
        </Layout>
      </Aux>
    )
  } 
}

const mapStateToProps = state => {
  return{
    token: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));