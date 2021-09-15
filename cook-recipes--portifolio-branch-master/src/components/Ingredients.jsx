import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import identification from '../helper/dictionaryApi';
import '../css/Ingredients.css';

class Ingredients extends Component {
  checkIngredient(param, index) {
    const { func, state, isStart } = this.props;
    const ourState = state || [];
    const element = document.getElementById(`input-${index}`);
    if (ourState.includes(param)) {
      return (
        // <label htmlFor={ `checkbox-${index}` }>
        <input
          className="ingredients-check"
          checked
          id={ `checkbox-${index}` }
          onChange={ () => func(param, element, 'checked') }
          type="checkbox"
        />
        // </label>
      );
    }
    return (
      <label htmlFor={ `checkbox-${index}` }>
        <input
          className="ingredients-check"
          onChange={ () => func(param, element, '') }
          type="checkbox"
          id={ `checkbox-${index}` }
          disabled={ !isStart }
        />
      </label>
    );
  }

  render() {
    const { data, isStart } = this.props;
    const dictionary = identification(data);
    return (
      <section className="ingredients-content">
        {
          dictionary.Ingredients.map((ingredient, index) => (
            (data[ingredient[0]] !== null && data[ingredient[0]] !== '') ? (
              <div
                className="ingredients-row"
                id={ `input-${index}` }
                key={ index }
                data-testid={
                  isStart === true
                    ? `${index}-ingredient-step`
                    : `${index}-ingredient-name-and-measure`
                }
              >
                {this.checkIngredient(data[ingredient[0]], index)}
                <label className="checkbox" htmlFor={ `checkbox-${index}` }>
                  <span>
                    <svg width="12px" height="9px" viewbox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1" />
                    </svg>
                  </span>
                  <div className="ingredients-measures">{data[ingredient[1]]}</div>
                  <div className="ingredients-name" id={ `ingredient-${index}` }>
                    {data[ingredient[0]]}
                  </div>
                </label>
              </div>
            ) : null
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isStart: state.recipeDetails.isStart,
});

Ingredients.propTypes = {
  data: PropTypes.shape.isRequired,
  isStart: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired,
  state: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Ingredients);
