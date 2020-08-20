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
import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MyOrder from './containers/Profil/MyOrder/MyOrder';
import MyInfo from './containers/Profil/MyInfo/MyInfo';
import MyList from './containers/Profil/MyList/MyList';

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

        <Route
          path="/profil"
          render={({ match: { url } }) => (
              <>
                  <Route path={`${url}/`} render={()=><Profil child={<Home/>} />} exact />
                  <Route path={`${url}/MyOrder`} render={()=><Profil child={<MyOrder/>} />} exact /> 
                  <Route path={`${url}/MyInfo`} render={()=><Profil child={<MyInfo/>} />} exact /> 
                  <Route path={`${url}/MyList`} render={()=><Profil child={<MyList/>} />} exact /> 
              </>
          )}
        />
       
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