import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { fetchDrinkDetails, fetchFoodDetails,
  startRecipe, getFoodDetails, fetchDrinksRecipes, fetchFoodRecipes } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Instructions from '../components/Instructions';
import DetailsHeader from '../components/DetailsHeader';
import identification from '../helper/dictionaryApi';
import CarouselCards from '../components/CarouselCards';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.instrutionVideo = this.instrutionVideo.bind(this);
    this.cardsMeals = this.cardsMeals.bind(this);
    this.cardsDrinks = this.cardsDrinks.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: { page, id } },
      foodDetails,
      drinksDetails,
      dispatchFoodRecipes,
      dispatchDrinks,
    } = this.props;

    dispatchFoodRecipes();
    dispatchDrinks();

    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  componentWillUnmount() {
    const { reboot } = this.props;
    reboot('');
  }

  handleFavClick() {
    const { favIcon } = this.state;
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });
    }
    if (favIcon) {
      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
    }
  }

  instrutionVideo(data) {
    const keyName = identification(data);
    return (
      <section>
        <h3>Video</h3>
        <section className="video">
          <ReactPlayer
            controls
            data-testid="video"
            url={ data[keyName.Youtube] }
            width="100%"
            height="100%"
          />
        </section>
      </section>
    );
  }

  cardsMeals() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { meals, match } = this.props;
    const max = 6;
    const sliceMeals = meals.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceMeals.map((measl, index) => (
              <CarouselCards
                url={ match.path }
                id={ measl.idMeal }
                key={ measl.idMeal }
                img={ measl.strMealThumb }
                title={ measl.strMeal }
                index={ index }
                subTitle={ measl.strCategory }
              />
            ))
          }
        </Slider>
      </section>
    );
  }

  cardsDrinks() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { drinks, match } = this.props;
    const max = 6;
    const sliceDrinks = drinks.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceDrinks.map((drink, index) => (
              <div key={ index }>
                <CarouselCards
                  url={ match.path }
                  id={ drink.idDrink }
                  key={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                  subTitle={ drink.strAlcoholic }
                />
              </div>
            ))
          }
        </Slider>
      </section>
    );
  }

  render() {
    const { isStart, details, isDrink } = this.props;
    const { favIconColor } = this.state;
    return (
      <section className="page-details">
        <DetailsHeader data={ details } />
        <button
          className="details-btn-share"
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt={ shareIcon } />
        </button>
        <button
          className="details-btn-favorite"
          type="button"
          data-testid="favorite-btn"
          onClick={ this.handleFavClick }
        >
          <img src={ favIconColor } alt={ favIconColor } />
        </button>
        <section className="details-content">
          <section>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients data={ details } />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              <Instructions data={ details } />
            </span>
          </section>
          {
            isDrink === false && this.instrutionVideo(details)
          }
          <section>
            <h3>Recomendadas</h3>
            {
              isDrink === false ? this.cardsDrinks() : this.cardsMeals()
            }
          </section>
        </section>
        <button
          className="details-btn-startRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => isStart() }
        >
          Iniciar Receita
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: () => dispatch(startRecipe()),
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
  reboot: (e) => dispatch(getFoodDetails(e)),
  dispatchDrinks: () => dispatch(fetchDrinksRecipes()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
});

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
  isDrink: state.recipeDetails.isDrink,
  drinks: state.drinkCategories.drinks,
  meals: state.foodCategories.meals,
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
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
