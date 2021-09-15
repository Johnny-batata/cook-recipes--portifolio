import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { animationScreen, transition } from '../animations';

import '../css/Details.css';
import Instructions from '../components/Instructions';
import Ingredients from '../components/Ingredients';
import DetailsHeader from '../components/DetailsHeader';

import { fetchDrinksRecipes, fetchFoodRecipes } from '../action/index';
import {
  startRecipe,
  fetchDrinkDetails,
  fetchFoodDetails,
  getFoodDetails,
} from '../action/action';
import CardMeals from '../components/CardsMeals';
import CardsDrinks from '../components/CardsDrinks';
import InstrutionVideo from '../components/InstrutionVideo';
import Modal from '../components/Modal';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      startedRecipe: false,
      finishedRecipe: false,
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.redirectForInProgress = this.redirectForInProgress.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
    this.btnStartRecipes = this.btnStartRecipes.bind(this);
    this.btnContinueRecipe = this.btnContinueRecipe.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
    this.checkStorage();
  }

  componentDidUpdate() {
    const { match: { params: { id } } } = this.props;
    const { currentId } = this.state;
    if (id !== currentId) return this.handleFetch();
  }

  componentWillUnmount() {
    const { reboot } = this.props;
    reboot('');
  }

  handleFetch() {
    const {
      match: { params: { page, id } },
      foodDetails,
      drinksDetails,
      dispatchFoodRecipes,
      dispatchDrinks,
    } = this.props;

    this.setState({ currentId: id });
    dispatchFoodRecipes();
    dispatchDrinks();
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  redirectForInProgress() {
    const { isStart, history, match: { params: { page, id } } } = this.props;
    history.push(`/${page}/${id}/in-progress`);
    isStart(true);
  }

  checkStorage() {
    const { match: { params: { id } } } = this.props;
    const { finishedRecipe } = this.state;

    if (localStorage.doneRecipes) {
      const checkDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

      checkDoneRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          this.setState({ finishedRecipe: !finishedRecipe });
        }
      });
    }

    if (localStorage.inProgressRecipes) {
      const checkInProgressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes'));

      const mealsKeys = Object.keys(checkInProgressRecipes.meals || {});
      const drinksKeys = Object.keys(checkInProgressRecipes.cocktails || {});

      if (mealsKeys.some((item) => item === id)) {
        this.setState({ startedRecipe: true });
      }

      if (drinksKeys.some((item) => item === id)) {
        this.setState({ startedRecipe: true });
      }
    }
  }

  btnStartRecipes() {
    return (
      <section className="details-btn-content">
        <button
          className="details-btn-startRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            this.redirectForInProgress();
          } }
        >
          Iniciar Receita
        </button>
      </section>
    );
  }

  btnContinueRecipe() {
    return (
      <section className="details-btn-content">
        <button
          className="details-btn-startRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            this.redirectForInProgress();
          } }
        >
          Continuar Receita
        </button>
      </section>
    );
  }

  render() {
    const { startedRecipe, finishedRecipe } = this.state;
    const {
      details,
      isDrink,
      match: { params: { page, id } },
      history,
      link,
    } = this.props;
    return (
      <motion.section
        id="top"
        className="page-details"
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <DetailsHeader data={ details } page={ page } id={ id } history={ history } />
        <section className="details-content">
          <section>
            <h3 className="details-title">Ingredients</h3>
            <div className="details-ingredients">
              <Ingredients data={ details } />
            </div>
          </section>
          <section className="details-instruction-content" data-testid="instructions">
            <h3 className="details-title">Instructions</h3>
            <div className="details-intructions">
              <Instructions data={ details } />
            </div>
          </section>
          {
            isDrink === false && (
              <section className="details-video">
                <h3 className="details-title">Video</h3>
                <InstrutionVideo data={ details } />
              </section>
            )
          }
          <section className="details-Recommended">
            <h3 className="details-title">Recomendadas</h3>
            {
              isDrink === false ? <CardsDrinks /> : <CardMeals />
            }
          </section>
        </section>
        { finishedRecipe ? null : this.btnStartRecipes() }
        { startedRecipe ? this.btnContinueRecipe() : null }
        {
          link && <Modal history={ history }><p>Link copiado!</p></Modal>
        }
      </motion.section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: (e) => dispatch(startRecipe(e)),
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
  reboot: (e) => dispatch(getFoodDetails(e)),
  dispatchDrinks: () => dispatch(fetchDrinksRecipes()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
});

const mapStateToProps = (state) => ({
  mealsDetails: state.foodCategories.recipeDetails,
  details: state.recipeDetails.details,
  isDrink: state.recipeDetails.isDrink,
  drinks: state.drinkCategories.drinks,
  meals: state.foodCategories.meals,
  link: state.recipeDetails.link,
});

Detalhes.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  reboot: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  isDrink: PropTypes.bool.isRequired,
  link: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
