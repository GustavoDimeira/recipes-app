import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFoods from '../context/useFoods';

const magic = 12;
export default function Foods() {
  const history = useHistory();
  const [resultsFoodCopy, setresultsFoodCopy] = useState([]);
  const { resultsFood } = useContext(useFoods);
  useEffect(() => {
    if (resultsFood.meals) {
      setresultsFoodCopy(resultsFood.meals.slice(0, magic));
    }
  }, [resultsFood]);
  return (
    <div>
      {history.location.pathname === '/foods' ? (
        <Header title="Foods" iconSearch />
      ) : (
        <p> foods</p>
      )}

      {resultsFoodCopy
        && resultsFoodCopy.map((el, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              className="foto-foods"
              src={ el.strMealThumb }
              alt="FoodsIcon"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>
              {' '}
              {el.strMeal}
            </h1>
          </div>
        ))}
      {history.location.pathname === '/foods' ? <Footer /> : <p> foods</p>}
    </div>
  );
}
Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
