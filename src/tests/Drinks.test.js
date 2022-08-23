import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DrinksProvider from "../context/DrinksProvider";
import FoodsProvider from "../context/FoodsProvider";

describe("Testa tela Drinks", () => {
  it("Deve renderizar a tela e seus componetes corretamente", () => {
    const history = createMemoryHistory();
    render(
      <FoodsProvider>
        <DrinksProvider>
          <Router history={history}>
            <App />
          </Router>
        </DrinksProvider>
      </FoodsProvider>
    );
    history.push("/drinks");
    const title = screen.getByTestId("page-title");
    const buttonIcon = screen.getByTestId("button-icon");
    const iconProfile = screen.getByTestId("profile-top-btn");
    const iconSearch = screen.getByTestId("search-top-btn");

    expect(title).toBeDefined();
    expect(iconProfile).toBeDefined();
    expect(iconSearch).toBeDefined();

    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId("search-input");
    const ingredient1 = screen.getByTestId("ingredient-search-radio");
    const ingredient2 = screen.getByTestId("name-search-radio");
    const ingredient3 = screen.getByTestId("first-letter-search-radio");
    const but = screen.getByTestId("exec-search-btn");

  
    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);
    
    expect(ingredient1).toBeDefined();
    userEvent.click(ingredient1);
    userEvent.type(inputSearch, "xablau do tubiru");
    userEvent.click(but);

    expect(ingredient2).toBeDefined();
    userEvent.click(ingredient2);
    userEvent.click(but);

    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);

    expect(inputSearch).toBeDefined();
    userEvent.type(inputSearch, "xablau do tubiru");
    expect(inputSearch).toBeDefined();

    userEvent.click(buttonIcon);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/profile");
    history.push("/drinks/cervejinha");
  });
});

