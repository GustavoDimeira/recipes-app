import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  const history = useHistory();

  return (
    <Router history={ history }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ Foods } />
        <Route exact path="/foods/:id/in-progress" component={ Foods } />
        <Route exact path="/foods/:id/in-progress" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ Drinks } />
        <Route exact path="/drinks/:id/in-progress" component={ Drinks } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ profile } />
      </Switch>
    </Router>
  );
}
export default App;
