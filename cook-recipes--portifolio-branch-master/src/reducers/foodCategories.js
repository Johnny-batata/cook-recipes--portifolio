import {
  IS_LOADING,
  ALL_FOOD_RECIPES,
  FOOD_BY_CATEGORIES,
} from '../action';
import { ALL_FOOD_CATEGORIES } from '../action/action';

const INITIAL_STATE = {
  allFoodCategories: [],
  meals: [],
  recipeDetails: [],
  loader: false,
};

const foodCategories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
      loader: action.loader,
    };
  case ALL_FOOD_CATEGORIES:
    return {
      ...state,
      allFoodCategories: action.allFoodCategories,
    };
  case ALL_FOOD_RECIPES:
    return {
      ...state,
      meals: action.recipes,
    };
  case FOOD_BY_CATEGORIES:
    return {
      ...state,
      meals: action.meals,
    };
  default:
    return state;
  }
};

export default foodCategories;
