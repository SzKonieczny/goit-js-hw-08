import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

let galleryListArray = [];

galleryItems.forEach(galleryItem => {
  const listItem = document.createElement('li');
  //   listItem.classList.add('gallery__item');
  const innerString = `<a class="gallery__item" href="${galleryItem.original}">
<img
  class="gallery__image"
  src="${galleryItem.preview}"
  
  alt="${galleryItem.description}"
/>
</a>`;
  listItem.insertAdjacentHTML('beforeend', innerString);

  galleryListArray.push(listItem);
});
gallery.append(...galleryListArray);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(galleryItems);
