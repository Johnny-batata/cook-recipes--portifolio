import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import IngredientCards from '../components/ingredientCards';
import { fetchByIngredient, getSearchBarResponse } from '../action/action';
import { fetchFoodRecipes,
  fetchDrinksRecipesByIngredient,
  fetchFoodRecipesByIngredients } from '../action/index';
import Footer from '../components/footer';
import Header from '../components/header';
import { container } from '../animations';

class explorarIngredientes extends Component {
  componentDidMount() {
    const { fetchApi, location, hasSearchBar } = this.props;
    hasSearchBar(false);

    if (location.pathname.includes('comida')) {
      console.log('sou comida');
      return fetchApi('meal');
    }
    console.log('sou bebida');
    return fetchApi('cocktail');
  }

  renderElements(param) {
    const { location,
      fetchApiByIngredient, fetchApiDrinksByingredient, meals, drinks } = this.props;

    if (location.pathname.includes('comida')) {
      return param.map((el, index) => (
        <IngredientCards
          url="/comidas"
          id={ el.idIngredient }
          key={ index }
          img={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
          title={ el.strIngredient }
          index={ index }
          details={ fetchApiByIngredient }
          items={ meals }
        />
      ));
    }
    return param.map((el, index) => (
      <IngredientCards
        url="/bebidas"
        key={ index }
        img={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
        title={ el.strIngredient1 }
        index={ index }
        details={ fetchApiDrinksByingredient }
        items={ drinks }
      />
    ));
  }

  render() {
    const { getApiIngredient, location } = this.props;
    console.log(getApiIngredient);
    return (
      <div>
        <Header location={ location } />
        <motion.section
          className="ingredient-container"
          variants={ container }
          initial="hidden"
          animate="visible"
        >
          { getApiIngredient.length !== 0 && this.renderElements(getApiIngredient)}
        </motion.section>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: (e) => dispatch(fetchByIngredient(e)),
  fetchApiByIngredient: (e) => dispatch(fetchFoodRecipesByIngredients(e)),
  fetchApiDrinksByingredient: (e) => dispatch(fetchDrinksRecipesByIngredient(e)),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),

});

const mapStateToProps = (state) => ({
  getApiIngredient: state.exploreIngredient.recipe,
  getDetailsRecipe: state.foodCategories.recipeDetails,
  drinks: state.drinkCategories.drinks,
  meals: state.foodCategories.meals,

});

explorarIngredientes.propTypes = {
  fetchApiDrinksByingredient: PropTypes.func.isRequired,
  meals: PropTypes.func.isRequired,
  drinks: PropTypes.func.isRequired,
  fetchApiByIngredient: PropTypes.func.isRequired,
  getApiIngredient: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
  fetchApi: PropTypes.func.isRequired,
  hasSearchBar: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(explorarIngredientes);
