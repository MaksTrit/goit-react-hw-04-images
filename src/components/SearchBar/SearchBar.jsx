import { Component } from 'react';
import {
  StyledSearchBar,
  StyledSearchBtn,
  StyledSearchForm,
  StyledSearchInput,
} from './SearchBar.styled';
import { TbSearch } from 'react-icons/tb';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = this.state;
    if (!value.trim()) {
      Notify.info('Please enter valid value');
      this.setState({ value: '' });
      return;
    }
    const normalizedValue = value.trim().toLowerCase();
    this.setState({ value: '' }, this.props.onSubmit(normalizedValue));
  };

  render() {
    return (
      <StyledSearchBar>
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <StyledSearchBtn type="submit">
            <TbSearch />
            <span>Search</span>
          </StyledSearchBtn>

          <StyledSearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </StyledSearchForm>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
