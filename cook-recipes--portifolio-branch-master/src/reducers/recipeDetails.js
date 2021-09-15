import {
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
  START_RECIPE,
  CHECK_PAGE,
  CHECK_INGREDIENTS,
  LINK,
} from '../action';

const INITIAL_STATE = {
  // details: [],
  foodDatails: {},
  drinkDatails: {},
  details: {},
  isStart: false,
  isDrink: false,
  ingredients: [],
  link: false,
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_DETAILS_FOOD:
    return {
      ...state,
      details: action.mealsDetails,
    };
  case RECIPE_DETAILS_DRINK:
    return {
      ...state,
      details: action.drinksDetails,
    };
  case START_RECIPE:
    return {
      ...state,
      isStart: action.isStart,
    };
  case CHECK_PAGE:
    return {
      ...state,
      isDrink: action.isDrink,
    };
  case CHECK_INGREDIENTS:
    return {
      ...state,
      ingredients: action.ingredients,
    };
  case LINK:
    return {
      ...state,
      link: action.link,
    };
  default:
    return state;
  }
};

export default recipeDetails;
