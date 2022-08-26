import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import initialFoods from '../service/initialFoods';

export default function RecipeDetails({ match }) {
  const [dataApi, setDataApi] = useState([]);
  const [cloneIngredients, setCloneIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();
  // console.log('resultado da api:', data);

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const fetchIdDetailsFoods = async () => {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setDataApi(result.meals);

        const keysIngredients = Object.keys(result.meals[0])
          .filter((e) => e.includes('Ingredient'));
        setCloneIngredients(keysIngredients.filter((filtered) => filtered !== ''));

        const getRecomendation = await initialFoods();
        setRecomendation(getRecomendation.meals.slice(+'0', +'6'));
      };
      fetchIdDetailsFoods();
    }
    if (match.path === '/drinks/:id') {
      const fetchIdDetailsDrinks = async () => {
        const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setDataApi(result.meals);
      };
      fetchIdDetailsDrinks();
    }
  }, []);
  // console.log('entries:', obj);
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
            { recomendation.map((rec, idx) => (
              <button
                className="card-recommended"
                type="button"
                key={ idx }
                onClick={ () => { history.push(`/foods/${rec.idMeal}`); } }
              >
                <img
                  className="foto-foods"
                  data-testid={ `${idx}-recomendation-card` }
                  src={ rec.strMealThumb }
                  alt={ rec.strMealThumb }
                />
                <h4 data-testid="recipe-title">
                  { rec.strMeal }
                </h4>
                <h4 data-testid="recipe-category">
                  { rec.strCategory }
                </h4>
              </button>
            ))}
          </div>
        </div>))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;
