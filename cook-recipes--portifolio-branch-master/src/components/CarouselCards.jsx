import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Group26 from '../images/Group26.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CarouselCards.css';

export default function CarouselCards({ id, img, title, index, url, subTitle }) {
  const [isRedirect, setIsRedirect] = useState(false);

  const redirectRecipe = () => {
    setIsRedirect(true);
  };
  return (
    <Card
      className="carousel-card-content "
      data-testid={ `${index}-recomendation-card` }
    >
      <div className="carousel-img-content">
        <img className="group-26" src={ Group26 } alt={ Group26 } />
        <div className="img-wrap">
          <Card.Img
            className="carousel-card-img"
            variant="top"
            src={ img }
            data-testid={ `${index}-card-img` }
          />
        </div>
      </div>
      <Card.Body onClick={ redirectRecipe }>
        <Card.Title
          className="carousel-title"
          data-testid={ `${index}-recomendation-title` }
        >
          { title }
        </Card.Title>
        <Card.Subtitle className="carousel-subtitle">{ subTitle }</Card.Subtitle>
      </Card.Body>
      { isRedirect && <Redirect to={ `${url}/${id}` } />}
    </Card>
  );
}

CarouselCards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
