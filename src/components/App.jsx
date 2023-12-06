import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { getImages, PER_PAGE } from './services/getImages';

import css from './App.module.css';

export const App = () => {
  const [imageList, setImageList] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const [isLoadMoreShow, setIsLoadMoreShow] = useState(false);
  const [largeImage, setLargeImage] = useState({ src: '', alt: '' });

  const onSubmit = event => {
    event.preventDefault();
    const newQuery = event.target.elements.input.value;
    if (newQuery === '') {
      Notify.info(
        `It seems you didn't write anything, please specify what exactly you are looking for`
      );
    } else {
      if (query === newQuery) {
        Notify.info(
          `It seems your query duplicate previous, please write another one`
        );
      } else {
        setQuery(newQuery.toLowerCase());
        setIsLoadMoreShow(false);
        setImageList([]);
        setPage(1);
      }
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setIsModalShow(false);
  };

  const onClick = (src, alt) => {
    setLargeImage({ src, alt });
    setIsModalShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query === '' || page < 1) return;

      setIsLoaderShow(true);

      try {
        const response = await getImages(query, page);

        if (response.totalHits === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setIsLoadMoreShow(false);
        } else {
          if (page > 1) {
            setImageList(prevState => [...prevState, ...response.hits]);
          } else {
            setImageList(response.hits);
          }

          setIsLoadMoreShow(response.hits.length === PER_PAGE);
        }
      } catch (error) {
        console.log(error);
      }

      setIsLoaderShow(false);
    };

    fetchData();
  }, [query, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {imageList && <ImageGallery imageList={imageList} onClick={onClick} />}
      {isLoaderShow && <Loader />}
      {imageList && isLoadMoreShow && <Button onClick={loadMore} />}
      {isModalShow && (
        <Modal
          src={largeImage.src}
          alt={largeImage.alt}
          isModalShow={isModalShow}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
