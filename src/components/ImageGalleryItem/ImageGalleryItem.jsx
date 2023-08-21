import { Component } from 'react';
import { ImgGalleryItemStyled } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toogleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

 
  render() {
    const { isModalOpen } = this.state;
    const { smallImg, tags, largeImg } = this.props;

    return (
      <>
        <ImgGalleryItemStyled>
          <img src={smallImg} alt={tags} onClick={this.toogleModal} />
        </ImgGalleryItemStyled>
        {isModalOpen && (
          <ModalWindow
            isOpen={isModalOpen}
            tags={tags}
            img={largeImg}
            onClose={this.toogleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
