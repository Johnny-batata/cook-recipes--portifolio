import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import Header from '../components/header';
import { animationScreen, transition } from '../animations';
import { getSearchBarResponse } from '../action/action';
import DoneRecipes from '../components/DoneRecipes';

class ReceitasFeitas extends Component {
  componentDidMount() {
    const { hasSearchBar } = this.props;

    hasSearchBar(false);
  }

  render() {
    const { location, history, link } = this.props;

    return (
      <motion.div
        style={ { height: '100%' } }
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        {
          link && <Modal history={ history }><p>Link copiado!</p></Modal>
        }
        <Header location={ location } />
        <DoneRecipes history={ history } />
      </motion.div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

const mapStateToProps = (state) => ({
  link: state.recipeDetails.link,
});

ReceitasFeitas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
  link: PropTypes.bool,
  history: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ReceitasFeitas);
