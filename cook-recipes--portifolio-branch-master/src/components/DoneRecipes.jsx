import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import copy from 'clipboard-copy';
import { CgPentagonRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Group26 from '../images/Group26.svg';
import { isLink } from '../action/action';
import '../css/doneRecipes.css';

class DoneRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
    };
    this.handleFilterFoods = this.handleFilterFoods.bind(this);
    this.handleFilterDrinks = this.handleFilterDrinks.bind(this);
    this.handleFilterAll = this.handleFilterAll.bind(this);
  }

  componentDidMount() {
    this.handleFilterAll();
  }

  handleFilterAll() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    this.setState({
      doneRecipes: allRecipes,
    });
  }

  handleFilterFoods() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'comida'),
    });
  }

  handleFilterDrinks() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'bebida'),
    });
  }

  render() {
    const { doneRecipes } = this.state;
    const { islink } = this.props;
    return (
      <section className="done-recipes-main">
        <section className="list-btn">
          <button
            className="filter-btn"
            type="button"
            onClick={ this.handleFilterAll }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            className="filter-btn"
            type="button"
            onClick={ this.handleFilterFoods }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            className="filter-btn"
            type="button"
            onClick={ this.handleFilterDrinks }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </section>
        <section className="cards-content">
          {
            doneRecipes.map(({
              type, name, id, image, area, category, alcoholicOrNot, doneDate, tags,
            }, index) => (
              <Card key={ name } className="done-card">
                <Link to={ `${type}s/${id}` }>
                  <div className="image-content">
                    <img className="group-26" src={ Group26 } alt={ Group26 } />
                    <di className="done-shadow">
                      <Card.Img
                        className="done-card-img"
                        data-testid={ `${index}-horizontal-image` }
                        src={ image }
                      />
                    </di>
                  </div>
                </Link>
                <Card.Body className="done-card-body">
                  <Link to={ `${type}s/${id}` }>
                    <Card.Subtitle
                      data-testid={ `${index}-horizontal-top-text` }
                      className="done-card-subtitle"
                    >
                      {
                        (type === 'comida') ? `${area} - ${category}`
                          : alcoholicOrNot
                      }
                    </Card.Subtitle>
                    <Card.Title
                      className="done-card-title"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </Card.Title>
                  </Link>
                  <section className="done-buttons">
                    <button
                      type="button"
                      className="done-btn-share"
                      onClick={ () => copy(`http://localhost:3000/${type}s/${id}`)
                        .then(() => islink(true)) }
                    >
                      <img
                        className="img-share"
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt={ shareIcon }
                      />
                    </button>
                  </section>
                  <div className="tag-content">
                    {
                      tags !== '' && tags.map((el) => (
                        <Card.Text
                          key={ el }
                          data-testid={ `${index}-${el}-horizontal-tag` }
                        >
                          <div className="done-tag">
                            <CgPentagonRight />
                            {el}
                          </div>
                        </Card.Text>))
                    }
                  </div>
                  <div className="date-content">
                    <Card.Text
                      className="done-date"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {doneDate}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))
          }
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  islink: (bool) => dispatch(isLink(bool)),
});

DoneRecipes.propTypes = {
  islink: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DoneRecipes);
