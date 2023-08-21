import axios from 'axios';

const API_KEY = '36077112-43cb229e78c8e7c13f4644e0f';
const BASE_URL = 'https://pixabay.com/api/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export async function getImages(searchQuery, page, signal) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 12,
  });
  const response = await instance.get(`?${searchParams}`, { signal });
  return response.data;
}
