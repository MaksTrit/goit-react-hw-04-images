import { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'servises/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Notify } from 'notiflix';
import { Message } from './Loader/Loader.styled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [value, setValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortCtrl = useRef();

  useEffect(() => {
    if (page !== 1) {
      window.scrollBy({
        top: 250 * 2,
        behavior: 'smooth',
      });
    }
  }, [pictures, page]);

  useEffect(() => {
    if (!value.trim()) {
      return;
    }
    async function onSearchPictures(query, page) {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();

      setIsLoading(true);
      try {
        const pictures = await getImages(query, page, abortCtrl.current.signal);
        setPictures(prev => [...prev, ...pictures.hits]);
        setIsShowButton(page < Math.ceil(pictures.totalHits / 12));
        setTotal(pictures.totalHits);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError('Something went wrong! Try reloading the page!');
        }
      } finally {
        setIsLoading(false);
      }
    }
    onSearchPictures(value, page);
  }, [page, value]);

  const handleSearch = searchValue => {
    if (value === searchValue) {
      Notify.info('Please enter another value or click "Load more"!');
      return;
    }
    setValue(searchValue);
    setPictures([]);
    setPage(1);
    setTotal(null);
    setIsShowButton(false);
    setIsLoading(false);
    setError(null);
  };
  const loadingMore = () => setPage(prev => prev + 1);

  return (
    <Layout>
      <GlobalStyle />
      <SearchBar onSubmit={handleSearch} />
      {!!total && (
        <Message>
          Found {total} images for "{value}"
        </Message>
      )}
      {error && <Message>{error}</Message>}
      {!!pictures.length && <ImageGallery pictures={pictures} />}
      {isLoading && <Loader />}
      {total === 0 && <Message>There are no images for your request!</Message>}
      {isShowButton && <LoadMore onClick={loadingMore} />}
    </Layout>
  );
};
