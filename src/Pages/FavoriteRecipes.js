import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteLocal, setFavoriteLocal] = useState([]);
  const [msgCopy, setmsgCopy] = useState(false);
  useEffect(() => {
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    setFavoriteLocal(favoriteParse);
  }, []);
  const localStorageFiltered = (idx) => {
    const localUpdated = [...favoriteLocal];
    localUpdated.splice(idx, 1);
    setFavoriteLocal(localUpdated);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localUpdated));
  };
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
        && favoriteLocal.map((favorite, index) => (
          <div
            key={ index }
            className="card-recipes-favorites"
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt="Favorite"
              className="foto-foods"
            />
            <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {(favorite.type === 'food')
                ? `${favorite.nationality} - ${favorite.category}` : (
                  favorite.alcoholicOrNot)}
            </p>
            <div className="butons-favorite">
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ Share }
                onClick={ () => {
                  setmsgCopy(!msgCopy);
                  navigator.clipboard.writeText(
                    `http://localhost:3000/${favorite.type}s/${favorite.id}`,
                  );
                } }
              >
                <img
                  src={ Share }
                  alt="Share"
                />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                src={ blackHeartIcon }
                onClick={ () => localStorageFiltered(index) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>
            {msgCopy && <p>Link copied!</p>}
          </div>
        ))
      }
    </div>
  );
}
