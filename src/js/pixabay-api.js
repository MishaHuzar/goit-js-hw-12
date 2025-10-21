import axios from 'axios';

function getImagesByQuery(query) {
  const API_KEY = '52843742-4f121a35691e2fc0b8477dddd';
  const urlAdress = 'https://pixabay.com/api/';

  return axios(urlAdress, {
    params: {
      key: API_KEY,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    },
  }).then(({ data }) => {
    return data;
  });
}

export default getImagesByQuery;