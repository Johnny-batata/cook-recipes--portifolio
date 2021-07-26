import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { animationScreen, transition } from '../animations';
import Header from '../components/header';
import { fetchApiFoodCategories,
  fetchFilterFoodByCategories,
  fetchFoodRecipes,
  getSearchBarResponse,
} from '../action/index';
import Cards from '../components/cards';
import Footer from '../components/footer';

import '../css/comidas.css';
import '../App.css';
import ButtonCategories from '../components/ButtonCategories';

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
        <main className="food-main">
          <ButtonCategories
            btnClass="btn-filterMeasls-cards"
            getCategories={ getFoodCategories }
            filter={ foodByCategories }
            filterAll={ dispatchFoodRecipes }
          />
          <section className="cards-content">
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
          </section>
        </main>
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
});

Comidas.propTypes = {
  apiFoodCategories: PropTypes.func,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  getFoodCategories: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
