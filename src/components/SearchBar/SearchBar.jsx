import { useState } from 'react';
import {
  StyledSearchBar,
  StyledSearchBtn,
  StyledSearchForm,
  StyledSearchInput,
} from './SearchBar.styled';
import { TbSearch } from 'react-icons/tb';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!value.trim()) {
      Notify.info('Please enter valid value');
      setValue('');
      return;
    }
    const normalizedValue = value.trim().toLowerCase();
    onSubmit(normalizedValue);
    setValue('');
  };
  return (
    <StyledSearchBar>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchBtn type="submit">
          <TbSearch />
          <span>Search</span>
        </StyledSearchBtn>

        <StyledSearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </StyledSearchForm>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
