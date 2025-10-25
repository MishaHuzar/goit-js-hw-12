import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  nav: true,
  showCounter: true,
  loop: true,
});

export function createGallery(images = []) {
  const markup = images
    .map(
      ({
        previewURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${previewURL}"
            alt="${tags}"
            loading="lazy"
          />
        </a>
        <ul class="info-container">
          <li class="info-box"><p>Likes</p><p>${likes}</p></li>
          <li class="info-box"><p>Views</p><p>${views}</p></li>
          <li class="info-box"><p>Comments</p><p>${comments}</p></li>
          <li class="info-box"><p>Downloads</p><p>${downloads}</p></li>
        </ul>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
