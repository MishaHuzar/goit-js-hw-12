import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import './css/spinner.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
let totalHits = 0;

hideLoadMoreButton();
hideLoader();

form.addEventListener('submit', async event => {
  event.preventDefault();
  clearGallery();

  const query = event.target.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search term before submitting.',
      position: 'topCenter',
      timeout: 3000,
      backgroundColor: '#FFA000',
      messageColor: 'white',
      close: false,
    });
    return;
  }

  currentQuery = query;
  page = 1;
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
        timeout: 3000,
        backgroundColor: '#EF4040',
        messageColor: 'white',
        close: false,
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: error.message || 'An unexpected error occurred.',
      position: 'topCenter',
      timeout: 3000,
      backgroundColor: '#EF4040',
      messageColor: 'white',
      close: false,
    });
  } finally {
    event.target.elements['search-text'].value = '';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    if (!data.hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
      return;
    }

    createGallery(data.hits);

    // Плавне прокручування сторінки
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    const shownSoFar = page * 15;
    if (shownSoFar >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: error.message || 'An unexpected error occurred.',
      position: 'topCenter',
      timeout: 3000,
      backgroundColor: '#EF4040',
      messageColor: 'white',
      close: false,
    });
  }
});
