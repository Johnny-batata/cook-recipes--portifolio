import {
  LINK,
  START_RECIPE,
  IS_LOADING,
  AREA,
  INGREDIENTS,
  IS_SEARCHBAR,
  FOOD_BY_CATEGORIES,
  DRINK_BY_CATEGORIES,
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
  CHECK_PAGE,
  CHECK_INGREDIENTS,
} from './index';

export const ALL_FOOD_CATEGORIES = 'ALL_FOOD_CATEGORIES';
export const ALL_DRINK_CATEGORIES = 'ALL_DRINK_CATEGORIES';

export const isLoading = (bool) => ({ type: IS_LOADING, loader: bool });

export const getAllFoodCategories = (allFoodCategories) => ({
  type: ALL_FOOD_CATEGORIES, allFoodCategories });

export const getAllDrinkCategories = (allDrinkCategories) => ({
  type: ALL_DRINK_CATEGORIES, allDrinkCategories });

export const getSearchBarResponse = (searchBarOn) => ({
  type: IS_SEARCHBAR, searchBarOn });

export const getIngredients = (ingrediente) => ({
  type: INGREDIENTS, ingrediente });

export const getFoodByCategories = (meals) => ({
  type: FOOD_BY_CATEGORIES, meals });

export const getFoodDetails = (mealsDetails) => ({
  type: RECIPE_DETAILS_FOOD, mealsDetails });

export const getFoodArea = (AreaDetails) => ({
  type: AREA, AreaDetails });

export const getDrinkByCategories = (drinks) => ({
  type: DRINK_BY_CATEGORIES, drinks });

export const ingredients = (obj) => ({
  type: CHECK_INGREDIENTS, ingredients: obj });

export const isLink = (boolean) => ({
  type: LINK, link: boolean });

export const startRecipe = (boolean) => ({
  type: START_RECIPE, isStart: boolean });

export const checkPage = (bool) => ({
  type: CHECK_PAGE, isDrink: bool });

export const getDrinkDetails = (drinksDetails) => ({
  type: RECIPE_DETAILS_DRINK, drinksDetails });

export const fetchApiFoodCategories = () => (dispatch) => {
  const time = 1000;
  dispatch(isLoading(true));
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((allFoodCategories) => {
      const maxCategories = 5;
      const categories = allFoodCategories.meals.slice(0, maxCategories);
      dispatch(getAllFoodCategories(categories));
      setTimeout(() => {
        dispatch(isLoading(false));
      }, time);
    });
};

export const fetchApiDrinkCategories = () => (dispatch) => {
  const time = 1000;
  dispatch(isLoading(true));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((allDrinkCategories) => {
      const maxCategories = 5;
      const categories = allDrinkCategories.drinks.slice(0, maxCategories);
      dispatch(getAllDrinkCategories(categories));
      setTimeout(() => {
        dispatch(isLoading(false));
      }, time);
    });
};

export const fetchFilterFoodByCategories = (category) => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((foodCategories) => {
      const recipes = foodCategories.meals.slice(0, maxRecipes);
      dispatch(getFoodByCategories(recipes));
    });
};

export const fetchFilterDrinkByCategories = (category) => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((drinkCategories) => {
      const drinks = drinkCategories.drinks.slice(0, maxRecipes);
      dispatch(getDrinkByCategories(drinks));
    });
};

export const fetchRamdomRecipe = (param = 'mealdb', param2 = 'meals') => (dispatch) => {
  dispatch(isLoading());

  fetch(`https://www.the${param}.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((ramdomRecipeData) => {
      dispatch(getFoodDetails(ramdomRecipeData[param2][0]));
    });
};

export const fetchFoodDetails = (id) => (dispatch) => {
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((foodDetails) => {
      dispatch(getFoodDetails(foodDetails.meals[0]));
      dispatch(checkPage(false));
    });
};

export const fetchByIngredient = (param) => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());

  fetch(`https://www.the${param}db.com/api/json/v1/1/list.php?i=list`)
    .then((response) => response.json())
    .then((ingredientDetails) => {
      if (param === 'cocktail') {
        const type = 'drinks';
        const ingredients1 = ingredientDetails[type].slice(0, maxRecipes);
        dispatch(getIngredients(ingredients1));
      }
      if (param === 'meal') {
        const type = `${param}s`;
        const ingredients2 = ingredientDetails[type].slice(0, maxRecipes);
        dispatch(getIngredients(ingredients2));
      }
    });
};

export const fetchDrinkDetails = (id) => (dispatch) => {
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((drinkDetails) => {
      dispatch(getDrinkDetails(drinkDetails.drinks[0]));
      dispatch(checkPage(true));
    });
};

export const fetchArea = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((Area) => {
      dispatch(getFoodArea(Area));
    });
};
