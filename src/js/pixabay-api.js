import axios from 'axios';

const API_KEY = '52843742-4f121a35691e2fc0b8477dddd';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export default async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch images');
  }
}
