import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import initialDrinks from '../service/initialDrinks';
import Share from '../images/shareIcon.svg';

export default function RecipeDetails({ match }) {
  const [msgCopy, setmsgCopy] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  const [cloneIngredients, setCloneIngredients] = useState([]);
  const [recomendationDrinks, setRecomendationDrinks] = useState([]);
  const history = useHistory();
  const copy = require('clipboard-copy');

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const fetchIdDetailsFoods = async () => {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setDataApi(result.meals);

        const keysIngredients = Object.keys(result.meals[0])
          .filter((filtered) => filtered.includes('Ingredient')
        && result.meals[0][filtered]);
        setCloneIngredients(keysIngredients.filter((filtered) => filtered !== ''));

        const getRecomendationDrinks = await initialDrinks();
        setRecomendationDrinks(getRecomendationDrinks.drinks.slice(+'0', +'6'));
      };
      fetchIdDetailsFoods();
    }
  }, []);

  return (
    <div>
      { dataApi.map((element, index) => (
        <div key={ index }>
          <img
            className="foto-foods"
            data-testid="recipe-photo"
            src={ element.strMealThumb }
            alt={ element.strMealThumb }
          />
          <h1 data-testid="recipe-title">
            { element.strMeal }
          </h1>
          <h4 data-testid="recipe-category">
            { element.strCategory }
          </h4>
          favoritar
          <input
            data-testid="favorite-btn"
            type="checkbox"
            name="favorite"
            value="favorite"
          />

          <button
            data-testid="share-btn"
            type="button"
            name="share"
            value="share"
            onClick={ () => {
              setmsgCopy(true);
              copy(document.URL);
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
            { cloneIngredients
            && cloneIngredients.map((ingredientKey, key) => (
              <div key={ key }>
                <p data-testid={ `${key}-ingredient-name-and-measure` }>
                  {`${element[ingredientKey]} - ${element[`strMeasure${key + 1}`]}`}
                </p>
              </div>
            )) }
          </div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{ element.strInstructions }</p>
          <iframe
            src={ `https://www.youtube.com/embed/${element.strYoutube.split('=')[1]}` }
            title={ `{${element.strMeal}}` }
            data-testid="video"
          />
          <h2>Recommended</h2>
          <div className="recomendation-foods">
            { recomendationDrinks.map((rec, idx) => (
              <button
                className="card-recommended"
                type="button"
                key={ idx }
                onClick={ () => { history.push(`/drinks/${rec.idDrink}`); } }
              >
                <img
                  className="foto-foods"
                  data-testid={ `${idx}-recomendation-card` }
                  src={ rec.strDrinkThumb }
                  alt={ rec.strDrinkThumb }
                />
                <h4 data-testid={ `${idx}-recomendation-title` }>
                  { rec.strDrink }
                </h4>
                <h4 data-testid="recipe-category">
                  { rec.strCategory }
                  { rec.strAlcoholic }
                </h4>
              </button>
            ))}
          </div>
        </div>))}
      <div
        className="btn-start-recipe-area"
      >
        <button
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          type="button"
          onClick={ () => { history.push(`/foods/${match.params.id}/in-progress`); } }
        >
          Start Recipes
        </button>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;
