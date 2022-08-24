import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const history = useHistory();
  const email = localStorage.getItem('user');
  const emailParse = JSON.parse(email);
  // console.log('email', email);
  // console.log('email Parse', emailParse);
  return (
    <div>
      <h2 data-testid="profile-email">{emailParse.email}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
    </div>
  );
}
