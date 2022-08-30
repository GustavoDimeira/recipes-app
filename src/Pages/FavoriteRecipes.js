import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [favoriteLocal, setFavoriteLocal] = useState([]);

  useEffect(() => {
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    setFavoriteLocal(favoriteParse);
  }, []);

  console.log(favoriteLocal);
  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      {
        favoriteLocal
        && favoriteLocal?.map((favorite, index) => (
          <div
          key={ index }
          >
            <img
             data-testid={ `${index}-horizontal-image` }
             src={ favorite.image }
             alt="Favorite"
             />
            <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
            <p data-testid={ `${index}-horizontal-top-text` }>{favorite.category}</p>
            <p>
              {(favorite.type === 'food') ? favorite.nationality : (
                favorite.alcoholicOrNot)}
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              >
              Share
            </button>
            <button
               data-testid={ `${index}-horizontal-favorite-btn` }
              type="button"
              >
              Deslike
            </button>
          </div>
        ))
      }
    </div>
  );
}
