import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Restaurant from './components/Restaurant';
import RestaurantImages from './components/RestaurantImages';
import Search from './components/Search';
import Profile from './components/Profile';
import UserReviews from './components/UserReviews';

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.props.verifyUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="flex justify-sb flex-col outer-wrapper">
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={SignIn} />
              <Route path='/register' component={Register} />
              <Route path='/search' component={Search} />
              <Route exact path='/restaurants/:restaurant_id' component={Restaurant} />
              <Route exact path='/restaurants/:restaurant_id/photos' component={RestaurantImages} />
              <Route exact path='/profile/:user_id' component={Profile} />
              <Route exact path='/profile/:user_id/reviews' component={UserReviews} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
