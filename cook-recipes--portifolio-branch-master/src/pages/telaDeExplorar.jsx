import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationScreen, transition } from '../animations';
import Header from '../components/header';
import Footer from '../components/footer';
import { getSearchBarResponse } from '../action/action';

import '../css/TelaDeExplorar.css';

export class TelaDeExplorar extends Component {
  componentDidMount() {
    const { hasSearchBar } = this.props;

    hasSearchBar(false);
  }

  render() {
    const { location } = this.props;

    return (
      <motion.section
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <Header location={ location } />
        <section className="explorer-page">
          <section className="explorer-screen-main">
            <Link to="/explorar/comidas">
              <button
                className="explorer-screen-btn"
                data-testid="explore-food"
                name="comidas"
                type="button"
              >
                Explorar Comidas
              </button>
            </Link>
            <Link to="/explorar/bebidas">
              <button
                className="explorer-screen-btn"
                data-testid="explore-drinks"
                name="bebidas"
                type="button"
              >
                Explorar Bebidas
              </button>
            </Link>
          </section>
        </section>
        <Footer />
      </motion.section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaDeExplorar.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaDeExplorar);
