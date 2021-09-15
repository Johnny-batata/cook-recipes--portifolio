import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { fetchRamdomRecipe, getSearchBarResponse } from '../../action/action';

import '../../css/TelaDeExplorar.css';

export class ExplorarComidasBebidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      id: '',
      isRedirect: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.verifyToRedirect = this.verifyToRedirect.bind(this);
  }

  componentDidMount() {
    const { hasSearchBar } = this.props;
    hasSearchBar(false);
  }

  componentWillUnmount() {
    console.log('entrei em unmount');
    this.setState({ id: '', type: '', isRedirect: false });
  }

  async handleApi() {
    const { location, fetchApi } = this.props;

    if (location.pathname.includes('comida')) {
      fetchApi('mealdb', 'meals');
      return this.setState({ type: 'comidas' });
    }
    await fetchApi('cocktaildb', 'drinks');
    return this.setState({ type: 'bebidas' });
  }

  updateState(param) {
    const { getDetailsRecipe } = this.props;
    const { id, should } = this.state;
    console.log(should);

    if (!id && getDetailsRecipe.idMeal !== undefined && param === 'comidas') {
      console.log('entrei');

      return this.setState({ id: getDetailsRecipe.idMeal },
        () => this.verifyToRedirect('comidas'));
    }
    if (!id && getDetailsRecipe.idDrink !== undefined && param === 'bebidas') {
      console.log('bebidas');
      return this.setState({ id: getDetailsRecipe.idDrink },
        () => this.verifyToRedirect('bebidas'));
    }
  }

  verifyToRedirect(param) {
    const { id } = this.state;
    const { getDetailsRecipe } = this.props;

    if (getDetailsRecipe.idMeal === id && param === 'comidas') {
      console.log('entrei no redirect');
      console.log(id);
      console.log(getDetailsRecipe.idMeal);
      return this.setState({ isRedirect: true });
    }
    if (getDetailsRecipe.idDrink === id && param === 'bebidas') {
      console.log('bebidas');
      return this.setState({ isRedirect: true });
    }
  }

  renderButtons(param) {
    const { location } = this.props;
    return (
      <section className="explorer-filter">
        <Link to={ `/explorar/${param}/ingredientes` }>
          <button
            className="btn-filters"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        { location.pathname.includes('comida')
        && (
          <Link to="/explorar/comidas/area">
            <button
              className="btn-filters"
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem
            </button>
          </Link>)}
        <button
          className="btn-filters"
          data-testid="explore-surprise"
          onClick={ this.handleApi }
          type="button"
        >
          Me Surpreenda!
        </button>
      </section>);
  }

  render() {
    const { location } = this.props;
    const { isRedirect, type, id } = this.state;
    const PAGE_LOCATION = location.pathname.includes('comida');

    return (
      <section>
        <Header location={ location } />
        <section className="explorer-content">
          { PAGE_LOCATION === true ? this.renderButtons('comidas')
            : this.renderButtons('bebidas') }
          { type !== undefined && this.updateState(type)}
          { isRedirect && <Redirect to={ `/${type}/${id}` } />}
        </section>
        <Footer />
      </section>
    );
  }
}

ExplorarComidasBebidas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  sendRamdomRecipe: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  getDetailsRecipe: state.recipeDetails.details,

});
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
  fetchApi: (e, a) => dispatch(fetchRamdomRecipe(e, a)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasBebidas);
