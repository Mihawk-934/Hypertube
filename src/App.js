/* istanbul ignore file */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';

import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Pwd from './containers/Auth/ForgetPwd/ForgetPwd';

import Home from './containers/Home/Home';
import Movie from './containers/Movie/Movie';
import Profil from './containers/Profil/Profil';

import MyOrder from './containers/Profil/MyOrderAndMyList/MyOrder/MyOrder';
import MyInfo from './containers/Profil/MyInfo/MyInfo';
import MyList from './containers/Profil/MyOrderAndMyList/MyList/MyList';
import Social from './containers/Profil/Social/Social';

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
          <Route
            path="/profil"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} render={()=><Profil child={<MyInfo/>} />} exact /> 
                <Route path={`${url}/MyOrder`} render={()=><Profil child={<MyOrder/>} />} exact />
                <Route path={`${url}/MyList`} render={()=><Profil child={<MyList/>} />} exact />
                <Route path={`${url}/Social`} render={()=><Profil child={<Social/>} />} exact /> 
              </>
            )}/>
          <Redirect to="/home"/>
        </Switch>
      )
    }

    return(
      <>
        <Layout>
          {routes}
        </Layout>
      </>
    )
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));