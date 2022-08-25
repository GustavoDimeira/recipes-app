import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFoods from '../context/useFoods';

const magic = 12;
const five = 5;
export default function Foods() {
  const history = useHistory();
  const [resultsFoodCopy, setresultsFoodCopy] = useState([]);
  const [categoryFoodCopy, setCategoryFoodCopy] = useState([]);
  const { resultsFood, categoryFood } = useContext(useFoods);
  useEffect(() => {
    if (resultsFood?.meals) {
      setresultsFoodCopy(resultsFood.meals.slice(0, magic));
    }
    if (categoryFood.meals) {
      setCategoryFoodCopy(categoryFood.meals.slice(0, five));
    }
  }, [resultsFood, categoryFood]);
  return (
    <div>
      {history.location.pathname === '/foods'
        && <Header title="Foods" iconSearch />}
      {categoryFoodCopy
        && categoryFoodCopy.map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            className="button-category"
          >
            {e.strCategory}
          </button>
        ))}
      {resultsFoodCopy
        && resultsFoodCopy.map((el, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card-title"
            key={ index }
          >
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
      {history.location.pathname === '/foods' && <Footer /> }
    </div>
  );
}
Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
