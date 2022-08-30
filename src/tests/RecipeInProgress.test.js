import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DrinksProvider from "../context/DrinksProvider";
import FoodsProvider from "../context/FoodsProvider";

describe('Componente RecipeInProgress', () => {
  it('/foods/:id/in-progress', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <FoodsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </FoodsProvider>
      </Router>
    );
    history.push('/foods/52977/in-progress');

    const photo = screen.queryByTestId("recipe-photo");
    const title = screen.queryByTestId("recipe-title");
    const category = screen.queryByTestId("recipe-category");
    const favorite = screen.queryByTestId("favorite-btn");
    const share = screen.queryByTestId("share-btn");
    const instructions = screen.queryByTestId("instructions");
    const button = screen.queryByTestId("btn-start-recipe-area");
    expect(photo).toBeDefined();
    expect(title).toBeDefined();
    expect(category).toBeDefined();
    expect(favorite).toBeDefined();
    expect(share).toBeDefined();
    expect(instructions).toBeDefined();
    expect(button).toBeDefined();
  });
});