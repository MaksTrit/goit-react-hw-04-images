import { useState } from 'react';
import { ImgGalleryItemStyled } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImg, tags, largeImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toogleModal = () => setIsModalOpen(prev => !prev);
  return (
    <>
      <ImgGalleryItemStyled>
        <img src={smallImg} alt={tags} onClick={toogleModal} />
      </ImgGalleryItemStyled>
      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          tags={tags}
          img={largeImg}
          onClose={toogleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
