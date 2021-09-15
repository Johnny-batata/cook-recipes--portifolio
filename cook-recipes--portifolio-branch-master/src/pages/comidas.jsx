import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { animationScreen, container, transition } from '../animations';
import Header from '../components/header';
import { fetchFoodRecipes } from '../action';
import { fetchApiFoodCategories,
  fetchFilterFoodByCategories,
  getSearchBarResponse,
} from '../action/action';
import Cards from '../components/cards';
import Footer from '../components/footer';

import '../css/comidas.css';
import '../App.css';
import ButtonCategories from '../components/ButtonCategories';
import Loader from '../components/Loader';

class Comidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
    };

    this.categories = this.categories.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const { apiFoodCategories, dispatchFoodRecipes, hasSearchBar, meals } = this.props;
    hasSearchBar(true);
    console.log(meals);
    if (meals.length === 0) {
      dispatchFoodRecipes();
    }

    apiFoodCategories();
  }

  componentDidUpdate() {
    const { meals } = this.props;
    const check = meals.some((el) => el.idMeal === '52968');
    if (meals.length === 1 && !check) {
      this.updateState();
    }
  }

  componentWillUnmount() {
    this.setState({ isRedirect: false });
  }

  categories() {
    const { getFoodCategories } = this.props;
    return (
      <div>
        { getFoodCategories.map((elem, index) => (
          <p key={ index }>{ elem.strCategory }</p>)) }
      </div>
    );
  }

  updateState() {
    this.setState({ isRedirect: true });
  }

  render() {
    const { isRedirect } = this.state;
    const {
      location,
      meals,
      getFoodCategories,
      dispatchFoodRecipes,
      foodByCategories,
      match,
      loader,
    } = this.props;
    return (
      <motion.section
        id="top"
        className="food-wrap"
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <Header location={ location } />
        { loader
          ? <Loader />
          : (
            <main className="food-main">
              <ButtonCategories
                btnClass="btn-filterMeasls-cards"
                getCategories={ getFoodCategories }
                filter={ foodByCategories }
                filterAll={ dispatchFoodRecipes }
              />
              <motion.section
                className="cards-content"
                variants={ container }
                initial="hidden"
                animate="visible"
              >
                {
                  meals.map((measl, index) => (
                    <Cards
                      url={ match.path }
                      id={ measl.idMeal }
                      key={ measl.idMeal }
                      img={ measl.strMealThumb }
                      title={ measl.strMeal }
                      index={ index }
                    />
                  ))
                }
              </motion.section>
            </main>
          ) }
        { isRedirect === true && <Redirect to={ `/comidas/${meals[0].idMeal}` } />}
        <Footer />
      </motion.section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFoodCategories: () => dispatch(fetchApiFoodCategories()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
  foodByCategories: (category) => dispatch(fetchFilterFoodByCategories(category)),
});

const mapStateToProps = (state) => ({
  getFoodCategories: state.foodCategories.allFoodCategories,
  meals: state.foodCategories.meals,
  loader: state.foodCategories.loader,
});

Comidas.propTypes = {
  apiFoodCategories: PropTypes.func,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  getFoodCategories: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
