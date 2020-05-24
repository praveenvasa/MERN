import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Login from './components/login&Register/Login';
import Register from './components/login&Register/Register';
import Alert from './components/Notification/Alert';
import { loadUser } from './actions/authactions';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import Create from './components/dashboard/Create';
import Update from './components/dashboard/Update';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/update" component={Update} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}

export default connect(null)(App);
