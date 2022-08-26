import React, { useEffect, useState } from 'react';

export default function RecipeDetails({ match }) {
  const [dataApi, setDataApi] = useState([]);
  // const [filterIngredient, setfilterIngredient] = useState([]);
  // const [filterMeasure, setfilterMeasure] = useState([]);

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const fetchIdDetailsFoods = async () => {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setDataApi(result.meals);
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

  return (
    <div>
      { dataApi.map((element, index) => (
        <div key={ index }>
          <img
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
          <p data-testid="{index}-ingredient-name-and-measure">
            { element.strIngredient1 }
          </p>
        </div>))}
    </div>
  );
}
