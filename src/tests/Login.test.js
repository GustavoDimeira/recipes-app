import React from "react";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";

import renderWithContext from './helpers/renderWithContext'


describe('Testes para a página de login', () => {
  test('Se os campos de email e senha aparecem na tela', async () => {
    
    await waitFor(() => {
      renderWithContext(<App />);
    })
   
    const emailInput = screen.getByTestId('email-input')
    expect(emailInput).toBeInTheDocument();
   
    const passwordInput = screen.getByTestId('password-input')
    expect(passwordInput).toBeInTheDocument();

    const buttonLogin = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '123ds6')
    userEvent.click(buttonLogin)
    
  });

  test('Se tem um botão com o texto Enter', () => {
    
    renderWithContext(<App />);

    const buttonLogin = screen.getByRole('button', { name: /Enter/i });
    
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Se tem o botão Enter está inicialmente desabilitado', () => {
    
    renderWithContext(<App />);

    const buttonLogin = screen.getByRole('button', { name: /Enter/i });
    expect(buttonLogin).toBeDisabled();

  });

})