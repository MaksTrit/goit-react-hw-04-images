import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'servises/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Notify } from 'notiflix';
import { Message } from './Loader/Loader.styled';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    value: '',
    pictures: [],
    page: 1,
    total: null,
    isShowButton: false,
    isLoading: false,
    error: null,
  };

  abortCtrl;

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.onSearchPictures(value, page);
    }
    if (page !== 1) {
      window.scrollBy({
        top: 250 * 2,
        behavior: 'smooth',
      });
    }
  }

  handleSearch = searchValue => {
    if (this.state.value === searchValue) {
      Notify.info('Please enter another value or click "Load more"!');
      return;
    }
    this.setState({
      value: searchValue,
      pictures: [],
      page: 1,
      total: null,
      isShowButton: false,
      isLoading: false,
      error: null,
    });
  };

  loadingMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearchPictures = async (query, page) => {
    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }

    this.abortCtrl = new AbortController();

    this.setState({ isLoading: true });
    try {
      const pictures = await getImages(query, page, this.abortCtrl.signal);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        isShowButton: page < Math.ceil(pictures.totalHits / 12),
        total: pictures.totalHits,
      }));
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        this.setState({
          error: 'Something went wrong! Try reloading the page!',
        });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { value, pictures, total, isLoading, isShowButton, error } =
      this.state;

    return (
      <Layout>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleSearch} />
        {total !== 0 && total && (
          <Message>
            Found {total} images for "{value}"
          </Message>
        )}
        {error && <Message>{error}</Message>}
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        {isLoading && <Loader />}
        {total === 0 && (
          <Message>There are no images for your request!</Message>
        )}
        {isShowButton && <LoadMore onClick={this.loadingMore} />}
      </Layout>
    );
  }
}
