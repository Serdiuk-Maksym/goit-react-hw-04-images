import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ imageList, onClick }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {imageList.map(elem => (
          <ImageGalleryItem
            key={elem.id}
            src={elem.webformatURL}
            alt={elem.tags}
            largeImageURL={elem.largeImageURL}
            onClick={onClick}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
