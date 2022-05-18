import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
