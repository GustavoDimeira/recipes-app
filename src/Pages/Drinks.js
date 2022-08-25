import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useApp from '../context/useApp';

const magic = 12;
const five = 5;
export default function Drinks() {
  const [resultsDrinksCopy, setresultsDrinksCopy] = useState([]);
  const [categoryCopy, setCategoryCopy] = useState([]);
  const { results, category } = useContext(useApp);
  const history = useHistory();
  useEffect(() => {
    if (results?.drinks) {
      setresultsDrinksCopy(results.drinks.slice(0, magic));
    }
    if (category.drinks) {
      setCategoryCopy(category.drinks.slice(0, five));
    }
  }, [results, category]);
  return (
    <div>
      {history.location.pathname === '/drinks'
        && <Header title="Drinks" iconSearch />}
      {categoryCopy
        && categoryCopy.map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={`${e.strCategory}-category-filter`}
            className="button-category"
          >
            {e.strCategory}
          </button>
        ))}
      {resultsDrinksCopy
        && resultsDrinksCopy.map((el, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ el.idDrink }>
            <button
              type="button"
              onClick={ () => { history.push(`/drinks/${el.idDrink}`); } }
            >
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
            </button>
          </div>
        ))}
      {history.location.pathname === '/drinks' && <Footer /> }
    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
