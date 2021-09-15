import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosArrowBack, IoMdHome } from 'react-icons/io';

import '../css/DetailsHeader.css';
import identification from '../helper/dictionaryApi';
import SharedFavorites from './SharedFavorites';

class DetailsHeader extends Component {
  headerContainer() {
    const { data, isDrink, page, id } = this.props;
    const keyName = identification(data);
    return (
      <section className="header-container">
        <div className="title-container">
          <h2 className="recipe-title" data-testid="recipe-title">
            {data[keyName.Name]}
          </h2>
          <span
            className="recipe-category"
            data-testid="recipe-category"
          >
            { isDrink ? data[keyName.Alcoholic] : data[keyName.Category] }
          </span>
        </div>
        <div className="shared-favorite-content">
          <SharedFavorites id={ id } page={ page } />
        </div>
      </section>
    );
  }

  render() {
    const { data, history } = this.props;
    const keyName = identification(data);
    return (
      <section>
        <section className="recipe-details">
          <img
            className="recipe-img"
            data-testid="recipe-photo"
            src={ data[keyName.Thumb] }
            alt={ data[keyName.Name] }
          />
          <section className="recipe-header-content">
            {this.headerContainer()}
          </section>
        </section>
        <button
          type="button"
          className="goBack"
          onClick={ () => history.goBack() }
        >
          <IoIosArrowBack />
        </button>
        <button
          type="button"
          className="goHome"
          onClick={ () => history.push('/comidas') }
        >
          <IoMdHome />
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrink: state.recipeDetails.isDrink,
});

DetailsHeader.propTypes = {
  data: PropTypes.shape.isRequired,
  isDrink: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DetailsHeader);
