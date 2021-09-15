import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router';
import Group26 from '../images/Group26.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/IngredientCards.css';
import { item } from '../animations';

class IngredientCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      id: '',
      isRedirect: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.imgContainer = this.imgContainer.bind(this);
  }

  componentWillUnmount() {
    console.log('a');
    this.setState({ id: undefined });
    this.setState({ isRedirect: false });
  }

  async handleApi() {
    const { details, title } = this.props;

    await details(title);
    console.log('bah');
    return this.setState({ type: 'fetching', id: 'should' });
  }

  updateState() {
    const { items } = this.props;
    const { id } = this.state;

    if (items.length !== 0 && id.length !== 0) {
      console.log('pão');
      return this.setState({ isRedirect: true });
    }
  }

  imgContainer(img, index) {
    return (
      <div className="img-container">
        <Card.Img
          className="ingredient-img"
          variant="top"
          src={ img }
          data-testid={ `${index}-card-img` }
        />
      </div>
    );
  }

  render() {
    const { img, title, index, url } = this.props;
    const { isRedirect, type } = this.state;
    return (
      <section>
        <motion.div
          className="ingredient-card"
          data-testid={ `${index}-ingredient-card` }
          variants={ item }
          onClick={ this.handleApi }
        >
          <div className="img-content">
            <img className="group-26" src={ Group26 } alt={ Group26 } />
            <div className="img-wrap">
              {this.imgContainer(img, index)}
            </div>
          </div>
          <Card.Title className="card-name" data-testid={ `${index}-card-name` }>
            { title }
          </Card.Title>
        </motion.div>
        { type !== undefined && this.updateState()}
        { isRedirect && <Redirect to={ url } />}
      </section>
    );
  }
}

IngredientCards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  details: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default IngredientCards;
