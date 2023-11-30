import React, { Component } from 'react';
import { Notify } from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { getImages, PER_PAGE } from './services/getImages';

import css from './App.module.css';

export class App extends Component {
  state = {
    imageList: null,
    qwerty: '',
    page: 1,
    isModalShow: false,
    isLoaderShow: false,
    isLoadMoreShow: false,
  };

  onSubmit = event => {
    const qwerty = event.target.elements.input.value;
    if (qwerty === '') {
      Notify.info(
        `It seems you didn't write anything, please specify what exactly you are looking for`
      );
    } else {
      if (this.state.qwerty === qwerty) {
        Notify.info(
          `It seems your qwerty duplicate previous, please write another one`
        );
      } else {
        this.setState({
          qwerty: qwerty.toLowerCase(),
          isLoadMoreShow: false,
          imageList: [],
          page: 1,
        });
      }
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({ isModalShow: false });
  };

  onClick = (src, alt) => {
    this.setState({
      largeImage: {
        src,
        alt,
      },
      isModalShow: true,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.qwerty !== this.state.qwerty ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoaderShow: true });

      try {
        const response = await getImages(this.state.qwerty, this.state.page);
        const lastPage = Math.ceil(response.totalHits / PER_PAGE);

        if (response.totalHits === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ isLoadMoreShow: false, imageList: [] });
          console.log('check # 1');
        } else {
          const newImageList = response.hits;
          if (this.state.page > 1) {
            newImageList = [...this.state.imageList, ...response.hits];
          }

          this.setState(prevState => ({
            imageList: newImageList,
            isLoadMoreShow: response.hits.length === PER_PAGE,
          }));
        }
      } catch (error) {
        console.log(error);
      }

      this.setState({ isLoaderShow: false });
    }
  }

  render() {
    const { imageList, isLoadMoreShow, isModalShow, largeImage } = this.state;

    const { onClick, loadMore, onSubmit, closeModal } = this;

    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={onSubmit} />
          {imageList && (
            <ImageGallery imageList={imageList} onClick={onClick} />
          )}
          {this.state.isLoaderShow && <Loader />}
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
      </>
    );
  }
}
