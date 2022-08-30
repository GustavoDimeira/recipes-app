import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Share from '../images/shareIcon.svg';

export default function RecipeInProgress({ match }) {
  const [msgCopy, setmsgCopy] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  const [cloneIngredients, setCloneIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [labelCheck, setLabelCheck] = useState(false);

  const handleChecked = (target, element) => {
    setLabelCheck(!labelCheck);
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    if (target.checked) {
      setIsFavorite(blackHeartIcon);
      if (favoriteParse === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: element.idMeal,
          type: 'food',
          nationality: element.strArea,
          category: element.strCategory,
          alcoholicOrNot: '',
          name: element.strMeal,
          image: element.strMealThumb }]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          [...favoriteParse, { id: element.idMeal,
            type: 'food',
            nationality: element.strArea,
            category: element.strCategory,
            alcoholicOrNot: '',
            name: element.strMeal,
            image: element.strMealThumb }],
        ));
      }
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  };

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const favorite = localStorage.getItem('favoriteRecipes');
      const favoriteParse = JSON.parse(favorite);
      const favorited = favoriteParse?.filter((id) => id.id === match.params.id);
      if (favorited?.length > 0) {
        setIsFavorite(blackHeartIcon);
        setLabelCheck(true);
      }
    }
    const fetchIdDetailsFoods = async () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((data) => data.json())
        .then((result) => setDataApi(result.meals));
    };
    fetchIdDetailsFoods();
  }, []);

  useEffect(() => {
    if (dataApi.length > 0) {
      const ingredients = async () => {
        const keysIngredients = Object
          .keys(dataApi[0]).filter((filtered) => filtered
            .includes('Ingredient') && dataApi[0][filtered]);
        setCloneIngredients(keysIngredients);
      };
      ingredients();
    }
  }, [dataApi]);

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
          <label htmlFor="favorite" className="container">
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
          {msgCopy && <p>Link copied!</p>}
          <h2>Ingredients</h2>
          <div>
            {cloneIngredients
              && cloneIngredients.map((ingredientKey, key) => (
                <div key={ key }>
                  <label htmlFor={ key }>
                    <span data-testid={ `data-testid=${key}-ingredient-step` }>
                      <input type="checkbox" id={ key } />
                      {`${element[ingredientKey]} - ${element[`strMeasure${key + 1}`]}`}
                    </span>
                  </label>
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
          data-testid="finish-recipe-btn"
          className="btn-start-recipe"
          type="button"
          onClick={ () => {} }
        >
          Finish Recipe
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