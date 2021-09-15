import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationScreen, transition } from '../animations';
import Header from '../components/header';
import { getSearchBarResponse, isLink } from '../action/action';

import '../css/TelaDeFavoritas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Group26 from '../images/Group26.svg';
import Modal from '../components/Modal';

class TelaReceitasFavoritas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIconColor: blackHeartIcon,
      favoriteList: [],
    };

    this.isFavorite = this.isFavorite.bind(this);
    this.getFavoriteRecipes = this.getFavoriteRecipes.bind(this);
  }

  componentDidMount() {
    const { hasSearchBar } = this.props;

    this.getFavoriteRecipes();
    hasSearchBar(false);
  }

  getFavoriteRecipes() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    this.setState({ favoriteList: favoriteRecipes });
    console.log(favoriteRecipes);
  }

  isFavorite(id) {
    const { favoriteList } = this.state;
    const filterFavorite = favoriteList.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));

    this.setState({ favoriteList: filterFavorite });
  }

  render() {
    const { location, link, history, islink } = this.props;
    const { favIconColor, favoriteList } = this.state;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return (
      <motion.section
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <Header location={ location } />
        {link && <Modal history={ history }><p>Link copiado!</p></Modal>}
        <section className="favorite-recipes-main">
          <section className="list-filter-btn">
            <button
              className="favorite-filters"
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => this.setState({ favoriteList: favoriteRecipes }) }
            >
              All
            </button>
            <button
              className="favorite-filters"
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ () => {
                this.setState({ favoriteList: favoriteRecipes
                  .filter((recipe) => recipe.type === 'comida') });
              } }
            >
              Food
            </button>
            <button
              className="favorite-filters"
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => {
                this.setState({ favoriteList: favoriteRecipes
                  .filter((recipe) => recipe.type === 'bebida') });
              } }
            >
              Drinks
            </button>
          </section>
          <section className="cards-content">
            {
              favoriteList.map(({
                type, name, id, image, area, category, alcoholicOrNot,
              }, index) => (
                <Card key={ name } className="favorite-card">
                  <Link to={ `${type}s/${id}` }>
                    <div className="image-content">
                      <img className="group-26" src={ Group26 } alt={ Group26 } />
                      <div className="img-shadow">
                        <Card.Img
                          className="favorite-card-img"
                          data-testid={ `${index}-horizontal-image` }
                          src={ image }
                        />
                      </div>
                    </div>
                  </Link>
                  <section className="favorite-buttons">
                    <button
                      type="button"
                      className="details-btn favorite-btn-share"
                      onClick={ () => copy(`http://localhost:3000/${type}s/${id}`)
                        .then(() => islink(true)) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt={ shareIcon }
                      />
                    </button>
                    <button
                      type="button"
                      className="details-btn favorite-btn"
                      onClick={ () => this.isFavorite(id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ favIconColor }
                        alt={ favIconColor }
                      />
                    </button>
                  </section>
                  <Card.Body className="favorite-card-body">
                    <Link to={ `${type}s/${id}` }>
                      <Card.Title
                        className="favorite-card-title"
                        data-testid={ `${index}-horizontal-name` }
                      >
                        { name }
                      </Card.Title>
                      <Card.Subtitle
                        data-testid={ `${index}-horizontal-top-text` }
                        className="favorite-card-subtitle"
                      >
                        {
                          (type === 'comida') ? `${area} - ${category}`
                            : alcoholicOrNot
                        }
                      </Card.Subtitle>
                    </Link>
                  </Card.Body>
                </Card>
              ))
            }
          </section>
        </section>
      </motion.section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
  islink: (bool) => dispatch(isLink(bool)),
});

const mapStateToProps = (state) => ({
  link: state.recipeDetails.link,
});

TelaReceitasFavoritas.propTypes = {
  hasSearchBar: PropTypes.func,
  islink: PropTypes.func,
  location: PropTypes.shape,
  link: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TelaReceitasFavoritas);
