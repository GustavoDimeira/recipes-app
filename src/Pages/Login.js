import React from 'react';

export default function Login() {
  return (
    <div>
      <form>

        <input
          data-testid="email-input"
          type="email"
          placeholder="email"
          id="email"
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          id="password"
        />

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
