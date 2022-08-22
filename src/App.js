import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Foods from './Pages/Foods';

function App() {
  const history = useHistory();

  return (
    <Router history={ history }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
      </Switch>
    </Router>
  );
}

export default App;
