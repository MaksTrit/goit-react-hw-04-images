import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMore = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more...
    </StyledButton>
  );
};

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
