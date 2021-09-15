import React, { Component } from 'react';
import '../css/Loader.css';

class Loader extends Component {
  render() {
    return (
      <section className="loader-container">
        <section className="loading-text">
          <h1>
            <span>L</span>
            <span>a</span>
            <span>r</span>
            <span>i</span>
            <span>c</span>
            <span>a</span>
          </h1>
        </section>
      </section>
    );
  }
}

export default Loader;
