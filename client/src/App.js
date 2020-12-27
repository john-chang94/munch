import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
