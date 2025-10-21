import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const lightbox = new SimpleLightbox(`.gallery a`, {
  caption: true,
  // captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  nav: true,
  showCounter: true,
  loop: true,
});

export const gallery = document.querySelector('.gallery');
export const loader = document.querySelector('.loading');
export const spinner = document.querySelector('.loader');
export const spinnerBtn = document.querySelector('#searchBtn');

export function createGallery(images = []) {
  gallery.innerHTML = images
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
                <img  class="gallery-image" src="${previewURL}" alt="${tags}" loading="lazy" 
                title="Title: ${tags.split(',')[0].trim()}  |  
                Likes: ${likes.toLocaleString()}  |  
                View: ${views.toLocaleString()}  |  
                Comments: ${comments.toLocaleString()}  |  
                Downloads: ${downloads.toLocaleString()}"/>
            </a>
            <ul class="info-container">
                <li class="info-box">
                    <p class="info-title">Likes</p>
                    <p class="info-value">${likes.toLocaleString()}</p>
                </li>
                <li class="info-box">
                    <p class="info-title">View</p>
                    <p class="info-value">${views.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Comments</p>
                    <p class="info-value">${comments.toLocaleString()}</p>
                </li>
                <li class="info-box">
                    <p class="info-title">Downloads</p>
                    <p class="info-value">${downloads.toLocaleString()}</p>
                </li>
            </ul>
        </li>
    `
    )
    .join('');

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}

export function showSpinner() {
  spinner.hidden = false;
  spinnerBtn.hidden = false;
}

export function hideSpinner() {
  spinner.hidden = true;
  spinnerBtn.hidden = true;
}