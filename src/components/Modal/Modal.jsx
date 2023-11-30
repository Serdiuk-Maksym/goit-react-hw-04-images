import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends Component {
  onClose = () => {
    this.props.closeModal();
  };

  EscapeClick = event => {
    if (event.code === 'Escape') this.onClose();
  };

  BackdropClick = event => {
    if (event.target === event.currentTarget) this.onClose();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.EscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.EscapeClick);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.BackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalShow: PropTypes.bool.isRequired,
};
