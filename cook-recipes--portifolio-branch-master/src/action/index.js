import invokeAlert from '../helper/alertMsg';

export const ERROR = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
export const USER_EMAIL = 'USER_EMAIL';
export const IS_LOADING = 'IS_LOADING';
export const AREA = 'AREA';
export const INGREDIENTS = 'INGREDIENTS';
export const IS_SEARCHBAR = 'IS_SEARCHBAR';
export const ALL_FOOD_RECIPES = 'ALL_FOOD_RECIPES';
export const FOOD_BY_CATEGORIES = 'FOOD_BY_CATEGORIES';
export const ALL_DRINKS_RECIPES = 'ALL_DRINKS_RECIPES';
export const DRINK_BY_CATEGORIES = 'DRINK_BY_CATEGORIES';
export const RECIPE_DETAILS_FOOD = 'RECIPE_DETAILS_FOOD';
export const RECIPE_DETAILS_DRINK = 'RECIPE_DETAILS_DRINK';
export const FAV_ICON = 'FAV_ICON';
export const FAV_ICON_COLOR = 'FAV_ICON_COLOR';
export const START_RECIPE = 'START_RECIPE';
export const CHECK_PAGE = 'CHECK_PAGE';
export const CHECK_INGREDIENTS = 'CHECK_INGREDIENTS';
export const LINK = 'LINK';

export const addFavicon = (favIcon) => ({ type: FAV_ICON, favIcon });

export const faviconColor = (color) => ({ type: FAV_ICON_COLOR, color });

export const addEmail = (email) => ({ type: USER_EMAIL, email });

export const isLoading = () => ({ type: IS_LOADING });

export const getAllDrinksRecipes = (recipes) => ({
  type: ALL_DRINKS_RECIPES, recipes });

export const getAllFoodRecipes = (recipes) => ({
  type: ALL_FOOD_RECIPES, recipes });

export const fetchFoodRecipes = (name = '') => (dispatch) => {
  dispatch(isLoading());
  const maxRecipes = 12;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((allFood) => {
      if (allFood.meals === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const recipes = allFood.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchDrinksRecipes = (name = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((allDrinksRecipes) => {
      if (allDrinksRecipes.drinks === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const drinksRecipes = allDrinksRecipes.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};

export const fetchFoodRecipesByIngredients = (ingrediente = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      if (allFoodRecipes.meals === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const recipes = allFoodRecipes.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchFoodRecipesByfirstLetter = (primeiraletra = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraletra}`)
    .then((response) => response.json())
    .then((Recipes) => {
      if (Recipes.meals === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const recipes = Recipes.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchDrinksRecipesByIngredient = (ingrediente = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((allDrinksRecipes) => {
      if (allDrinksRecipes.drinks === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const drinks = allDrinksRecipes.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinks));
    });
};

export const fetchDrinksRecipesByFirstLetter = (letter = 'a') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json())
    .then((allDrinksRecipesByFirsLetter) => {
      if (allDrinksRecipesByFirsLetter.drinks === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const drinksRecipes = allDrinksRecipesByFirsLetter.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};
