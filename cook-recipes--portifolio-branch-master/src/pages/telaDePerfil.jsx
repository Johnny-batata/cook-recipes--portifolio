import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationScreen, transition } from '../animations';
import Header from '../components/header';
import Footer from '../components/footer';
import { getSearchBarResponse } from '../action/action';
import '../css/telaDePerfil.css';

export class TelaDePerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.updateState = this.updateState.bind(this);
    this.buttonsRender = this.buttonsRender.bind(this);
  }

  componentDidMount() {
    const { hasSearchBar } = this.props;
    hasSearchBar(false);
    const info = JSON.parse(localStorage.getItem('user'));
    console.log(info);
    if (info !== null) { return this.updateState(info.email); }
    this.updateState('email@email.com');
  }

  updateState(email) {
    this.setState({ email });
  }

  buttonsRender() {
    return (
      <section className="perfil-btn">
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="buttons-perfil"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="buttons-perfil"

          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.cleanLocalStorage }
            className="buttons-perfil"
          >
            Sair
          </button>
        </Link>
      </section>
    );
  }

  cleanLocalStorage() {
    localStorage.clear();
  }

  render() {
    const { location } = this.props;
    const { email } = this.state;

    return (
      <motion.section
        className="profile-screen-btn"
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <Header location={ location } />
        <section className="profile-main">
          <section className="perfil-avatar">
            <img className="profile-img" src="https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" alt="icon" />
            <h1 data-testid="profile-email" className="email">{email}</h1>
          </section>
          {this.buttonsRender()}
        </section>
        <Footer />
      </motion.section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaDePerfil.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaDePerfil);
