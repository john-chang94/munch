import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Restaurant from './components/Restaurant';
import Footer from './components/Footer';
import RestaurantImages from './components/RestaurantImages';
import Search from './components/Search';

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container flex justify-sb">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/register' component={Register} />
            <Route path='/search' component={Search} />
            <Route exact path='/restaurants/:restaurant_id' component={Restaurant} />
            <Route exact path='/restaurants/:restaurant_id/photos' component={RestaurantImages} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
