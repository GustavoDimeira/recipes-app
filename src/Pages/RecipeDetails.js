import { useEffect, useState } from 'react';

export default function RecipeDetails({ match }) {
  const [resultApi, setresultApi] = useState({});
  console.log(resultApi);

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const fetchIdDetailsFoods = async () => {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setresultApi(api);
      };
      fetchIdDetailsFoods();
    }
    if (match.path === '/drinks/:id') {
      const fetchIdDetailsDrinks = async () => {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`).then((data) => data.json());
        setresultApi(api);
      };
      fetchIdDetailsDrinks();
    }
  });
}
