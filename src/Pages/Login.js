import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            placeholder="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            placeholder="password"
            id="password"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ () => {} }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
