import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImg from '../../assets/img/pageNotFound.png';

export default function PageNotFound() {
  return (
    <div>
      <img src={PageNotFoundImg} alt="page not found" />
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
