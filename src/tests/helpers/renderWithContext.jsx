import { render } from "@testing-library/react";
import { Router } from 'react-router-dom';
import React from "react";
import { createMemoryHistory } from 'history';
import Provider from "../../context/Provider";


function renderWithContext(component) {
  const history = createMemoryHistory();

  console.log(history);

  return (
    render(<Provider>{component}</Provider>)
  );
}
export default renderWithContext;

