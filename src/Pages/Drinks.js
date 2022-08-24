import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useApp from '../context/useApp';

const magic = 12;
export default function Drinks() {
  const [resultsDrinksCopy, setresultsDrinksCopy] = useState([]);
  const { results } = useContext(useApp);
  const history = useHistory();
  useEffect(() => {
    if (results.drinks) {
      setresultsDrinksCopy(results.drinks.slice(0, magic));
    }
  }, [results]);
  return (
    <div>
      {history.location.pathname === '/drinks' ? (
        <Header title="Drinks" iconSearch />
      ) : (
        <p> Drinks </p>
      )}
      {resultsDrinksCopy
        && resultsDrinksCopy.map((el, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ el.idDrink }>
            <img
              className="foto-foods"
              src={ el.strDrinkThumb }
              alt="FoodsIcon"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>
              {' '}
              {el.strDrink}
            </h1>
          </div>
        ))}
      {history.location.pathname === '/drinks' ? <Footer /> : <p> Drinks </p>}
    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
