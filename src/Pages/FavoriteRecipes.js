import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteLocal, setFavoriteLocal] = useState([]);
  const [msgCopy, setmsgCopy] = useState(false);
  const [favoriteLocalCopy, setFavoriteLocalCopy] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    setFavoriteLocal(favoriteParse);
    setFavoriteLocalCopy(favoriteParse);
  }, []);
  const localStorageFiltered = (idx) => {
    const localUpdated = [...favoriteLocal];
    localUpdated.splice(idx, 1);
    setFavoriteLocal(localUpdated);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localUpdated));
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    setFavoriteLocalCopy(favoriteParse);
  };

  const typeFiltered = (type) => {
    if (type === 'all') {
      setFavoriteLocalCopy(favoriteLocal);
    } if (type === 'food') {
      setFavoriteLocalCopy(favoriteLocal.filter((element) => element.type === 'food'));
    } if (type === 'drink') {
      setFavoriteLocalCopy(favoriteLocal.filter((element) => element.type === 'drink'));
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div className="container-buton-recipes-favorites">
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => typeFiltered('food') }
          className="buton-recipes-favorites"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => typeFiltered('drink') }
          className="buton-recipes-favorites"
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => typeFiltered('all') }
          className="buton-recipes-favorites"
        >
          All
        </button>
      </div>
      <div className="container-map">
        {
          favoriteLocalCopy
        && favoriteLocalCopy.map((favorite, index) => (
          <div key={ index } className="container-card-recipes-favorites">
            <button
              type="button"
              className="card-recipes-favorites"
              onClick={ () => {
                history.push(`/${favorite.type}s/${favorite.id}`);
              } }
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
            </button>
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
    </div>
  );
}
