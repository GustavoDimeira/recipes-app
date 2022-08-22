import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a tela de login', () => {
  it('Deve renderizar a tela de login corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    history.push('/foods')
    const title = screen.getByTestId('page-title');
    const buttonIcon = screen.getByTestId('button-icon')
    const iconProfile = screen.getByTestId('profile-top-btn')
    const iconSearch = screen.getByTestId('search-top-btn')
    expect(title).toBeDefined();
    expect(iconProfile).toBeDefined();
    expect(iconSearch).toBeDefined();
    userEvent.click(buttonIcon);
    const { location: {pathname}  } = history;
    expect(pathname).toBe('/profile')

  })
})