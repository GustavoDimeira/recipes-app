import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from './useApp';
import fetchDrinksApi from '../service/fetchDrinksApi';

function DrinksProvider({ children }) {
  const history = useHistory();
  // Estados iniciais;
  const [foods, setfoods] = useState({
    filter: {
      valueIngrents: '',
      inputValue: '',
    } });
  const [filtro, setfiltro] = useState(false);
  const [results, setresults] = useState('');
  const [category, setcategory] = useState([]);
  const contextValue = {
    foods,
    setfoods,
    filtro,
    setfiltro,
    results,
    category,
  };
  // userEffect e chamado ao alterar o estado "filtro", ele faz a requisição para API com os filtros aplicados, pela sideBar e salva o resultado no estado que renderiza os resultados;
  useEffect(() => {
    const fetchApi = async () => {
      const { valueIngrents, inputValue } = foods.filter;
      const request = await fetchDrinksApi(valueIngrents, inputValue, results);
      if (filtro && request?.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setresults(request);
    };
    fetchApi();
    // }
  }, [filtro]);
  // Requisição dos cards de foods iniciais;
  useEffect(() => {
    const fetchApi = async () => {
      const fet = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((data) => data.json());
      // requisição para lista de categorias;
      setresults(fet);
      const cat = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((data) => data.json());
      setcategory(cat);
    };
    fetchApi();
  }, []);
  // Se vier apenas um resultado a pagina e redirecionada para a pagina de detalhes da receita;
  useEffect(() => {
    if (results?.drinks && results?.drinks.length === 1) {
      history.push(`/drinks/${results.drinks[0].idDrink}`);
    }
    // Um alert e exido ao não retornar resultado;
    if (results?.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [history, results]);

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

DrinksProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DrinksProvider;
