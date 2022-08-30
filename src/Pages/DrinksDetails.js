import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import initialFoods from '../service/initialFoods';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinksDetails({ match }) {
  const [dataApi, setDataApi] = useState([]);
  const [msgCopy, setmsgCopy] = useState(false);
  const [cloneIngredients, setCloneIngredients] = useState([]);
  const [recomendationFoods, setRecomendationFoods] = useState([]);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [labelCheck, setLabelCheck] = useState(false);
  const history = useHistory();

  const handleChecked = (target, element) => {
    console.log(element);
    setLabelCheck(!labelCheck);
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    if (target.checked) {
      setIsFavorite(blackHeartIcon);
      if (favoriteParse === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: element.idDrink,
          type: 'drink',
          nationality: '',
          category: element.strCategory,
          alcoholicOrNot: element.strAlcoholic,
          name: element.strDrink,
          image: element.strDrinkThumb }]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          [...favoriteParse, { id: element.idDrink,
            type: 'drink',
            nationality: '',
            category: element.strCategory,
            alcoholicOrNot: element.strAlcoholic,
            name: element.strDrink,
            image: element.strDrinkThumb }],
        ));
      }
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  };

  useEffect(() => {
    if (match.path === '/drinks/:id') {
      const favorite = localStorage.getItem('favoriteRecipes');
      const favoriteParse = JSON.parse(favorite);
      const favorited = favoriteParse?.filter((id) => id.id === match.params.id);
      console.log(favorited);
      if (favorited?.length > 0) {
        setIsFavorite(blackHeartIcon);
        setLabelCheck(true);
      }
      const fetchIdDetailsDrinks = async () => {
        const result = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`,
        ).then((data) => data.json());
        setDataApi(result.drinks);

        const keysIngredients = Object.keys(result.drinks[0]).filter(
          (filtered) => filtered.includes('Ingredient') && result.drinks[0][filtered],
        );
        setCloneIngredients(
          keysIngredients.filter((filtered) => filtered !== ''),
        );

        const getRecomendationFoods = await initialFoods();
        setRecomendationFoods(getRecomendationFoods.meals.slice(+'0', +'6'));
      };
      fetchIdDetailsDrinks();
    }
  }, []);
  return (
    <div>
      {dataApi.map((element, index) => (
        <div key={ index }>
          <img
            className="foto-foods"
            data-testid="recipe-photo"
            src={ element.strDrinkThumb }
            alt={ element.strDrinkThumb }
          />
          <h1 data-testid="recipe-title">{element.strDrink}</h1>
          <h4 data-testid="recipe-category">
            {element.strCategory}
            {element.strAlcoholic}
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
            <img src={ Share } alt="Share" />
          </button>

          {msgCopy && <p>Link copied!</p>}
          <h2>Ingredients</h2>
          <div>
            {cloneIngredients
              && cloneIngredients.map((ingredientKey, key) => (
                <div key={ key }>
                  <p data-testid={ `${key}-ingredient-name-and-measure` }>
                    {`${element[ingredientKey]} - ${
                      element[`strMeasure${key + 1}`]
                    }`}
                  </p>
                </div>
              ))}
          </div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{element.strInstructions}</p>
          {element?.strVideo === null ? (
            <div />
          ) : (
            <iframe
              src={ `https://www.youtube.com/embed/${
                element.strVideo.split('=')[1]
              }` }
              title={ `{${element.strDrink}}` }
              data-testid="video"
            />
          )}
          {/*  */}
          <h2>Recommended</h2>
          <div className="recomendation-foods">
            {recomendationFoods.map((rec, idx) => (
              <button
                className="card-recommended"
                type="button"
                key={ idx }
                onClick={ () => {
                  history.push(`/foods/${rec.idMeal}`);
                } }
              >
                <img
                  className="foto-foods"
                  data-testid={ `${idx}-recomendation-card` }
                  src={ rec.strMealThumb }
                  alt={ rec.strMealThumb }
                />
                <h4 data-testid={ `${idx}-recomendation-title` }>
                  {rec.strMeal}
                </h4>
                <h4 data-testid="recipe-category">{rec.strCategory}</h4>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="btn-start-recipe-area">
        <button
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          type="button"
          onClick={ () => {
            history.push(`/drinks/${match.params.id}/in-progress`);
          } }
        >
          Start Recipes
        </button>
      </div>
    </div>
  );
}
DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;
