import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImgGalleryStyled } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures }) => {
  return (
    <ImgGalleryStyled>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            tags={tags}
            largeImg={largeImageURL}
          />
        );
      })}
    </ImgGalleryStyled>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};
