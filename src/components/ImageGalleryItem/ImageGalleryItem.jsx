import React from 'react';
import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
  return (
    <>
      <li
        className={css.ImageGalleryItem}
        onClick={() => onClick(largeImageURL, alt)}
      >
        <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
