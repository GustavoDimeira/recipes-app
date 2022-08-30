import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFoods from '../context/useFoods';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeInProgress({ match }) {
  const { keysIngredients } = useContext(useFoods);
  const [dataApi, setDataApi] = useState([]);
  // const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  // const [labelCheck, setLabelCheck] = useState(false);
  useEffect(() => {
    const fetchIdDetailsFoods = async () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((data) => data.json())
        .then((result) => setDataApi(result.meals));
    };
    fetchIdDetailsFoods();
  });
  return (
    <div>
      {dataApi.map((element, index) => (
        <div key={ index }>
          <img
            className="foto-foods"
            data-testid="recipe-photo"
            src={ element.strMealThumb }
            alt={ element.strMealThumb }
          />
          <h1 data-testid="recipe-title">
            {element.strMeal}
          </h1>
          <h4 data-testid="recipe-category">
            {element.strCategory}
          </h4>
          {/* <label htmlFor="favorite" className="container">
            <input
              type="checkbox"
              name="favorite"
              id="favorite"
              value="favorite"
              onChange={ ({ target }) => handleChecked(target, element) }
              hidden
              checked={ labelCheck }
            />
            <img
              data-testid="favorite-btn"
              src={ isFavorite }
              alt="Is Favorite"
            />
          </label>
          <button
            data-testid="share-btn"
            type="button"
            name="share"
            value="share"
            onClick={ () => {
              setmsgCopy(true);
              navigator.clipboard.writeText(document.URL);
            } }
          >
            <img
              src={ Share }
              alt="Share"
            />

          </button>
          {msgCopy && <p>Link copied!</p>} */}
          <h2>Ingredients</h2>
          <div>
            {keysIngredients
              && keysIngredients.map((ingredientKey, key) => (
                <div key={ key }>
                  <p data-testid={ `${key}-ingredient-name-and-measure` }>
                    {`${element[ingredientKey]} - ${element[`strMeasure${key + 1}`]}`}
                  </p>
                </div>
              ))}
          </div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{element.strInstructions}</p>
        </div>))}
      <div
        className="btn-start-recipe-area"
      >
        <button
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          type="button"
          onClick={ () => {
            startRecipes();
          } }
        >
          Start Recipes
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;
