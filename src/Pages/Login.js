import React, { useContext } from 'react';
import useApp from '../context/useApp';

export default function Login() {
  const { setEmail, setPassword, Button, Email } = useContext(useApp);
  return (
    <div>
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="email"
          id="email"
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          id="password"
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ Button }
          onClick={ () => {
            localStorage.setItem('user', JSON.stringify({ email: Email }));
            localStorage.setItem('mealsToken', JSON.stringify(1));
            localStorage.setItem('cocktailsToken', JSON.stringify(1));
          } }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
