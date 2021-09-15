import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import identification from '../helper/dictionaryApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/SharedFavorites.css';
import { isLink } from '../action/action';

class SharedFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.renderState = this.renderState.bind(this);
  }

  componentDidMount() {
    this.renderState();
  }

  handleFavClick() {
    const { favIcon } = this.state;
    const { details, id, page } = this.props;
    const keyName = identification(details);
    const recovery = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });

      const recipe = [
        ...recovery, {
          id: details[keyName.Id],
          type: page.includes('comidas') ? 'comida' : 'bebida',
          area: details[keyName.Area] ? details[keyName.Area] : '',
          category: details[keyName.Category] ? details[keyName.Category] : '',
          alcoholicOrNot: details[keyName.Alcoholic] ? details[keyName.Alcoholic] : '',
          name: details[keyName.Name],
          image: details[keyName.Thumb],
        },
      ];

      return localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
    }

    if (favIcon) {
      console.log('sou verdadeiro', id, page);

      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
      const favoriteKeys = recovery.filter((el) => el.id !== id) || {};
      console.log(favoriteKeys);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteKeys));
    }
  }

  renderState() {
    const { id } = this.props;
    const recoveryFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const check = recoveryFavorite.some((el) => el.id === id);

    if (check) {
      this.setState({ favIconColor: blackHeartIcon,
        favIcon: true });
    }
  }

  render() {
    const { favIconColor, favIcon } = this.state;
    const { page, id, link } = this.props;
    return (
      <section className="sec-share-fav">
        <button
          className="details-btn btn-share"
          type="button"
          onClick={ () => copy(`http://localhost:3000/${page}/${id}`)
            .then(() => {
              window.scrollTo(0, 0);
              link(true);
            }) }
        >
          <img
            className="img-share"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ shareIcon }
          />
        </button>
        <button
          className={ favIcon ? 'details-btn btn-active' : 'details-btn' }
          type="button"
          onClick={ this.handleFavClick }
        >
          <img
            className={ favIcon ? 'img-favorite-active' : 'img-favorite' }
            data-testid="favorite-btn"
            src={ favIconColor }
            alt={ favIconColor }
          />
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});

const mapDispatchToProps = (dispatch) => ({
  link: (bool) => dispatch(isLink(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SharedFavorites);

SharedFavorites.propTypes = {
  details: PropTypes.shape.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.bool.isRequired,
};
