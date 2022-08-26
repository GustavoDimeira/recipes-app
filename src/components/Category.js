import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from '../context/useApp';
import useFoods from '../context/useFoods';

const five = 5;
export default function Category() {
  const [categoryCopy, setCategoryCopy] = useState([]);
  const { category } = useContext(useApp);
  const [categoryFoodCopy, setCategoryFoodCopy] = useState([]);
  const { categoryFood } = useContext(useFoods);
  const history = useHistory();

  useEffect(() => {
    if (category.drinks) {
      setCategoryCopy(category.drinks.slice(0, five));
    }
    if (categoryFood.meals) {
      setCategoryFoodCopy(categoryFood.meals.slice(0, five));
    }
  }, [category, categoryFood]);

  return (
    <div className="Category">
      {history.location.pathname === '/drinks'
        && categoryCopy.map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            className="button-category"
          >
            {e.strCategory}
          </button>
        ))}

      {history.location.pathname === '/foods'
        && categoryFoodCopy.map((el, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${el.strCategory}-category-filter` }
            className="button-category"
          >
            {el.strCategory}
          </button>
        ))}
    </div>
  );
}
Category.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
