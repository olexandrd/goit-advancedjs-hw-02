// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const galleryPreviewContainer = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery-item">
				<a class="gallery-link" href="${original}">
					<img
					class="gallery-image"
					src="${preview}"
					data-source="${original}"
					alt="${description}"
					/>
				</a>
			</li>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', galleryPreviewContainer);

const lightbox = new SimpleLightbox('.gallery li a', {});
