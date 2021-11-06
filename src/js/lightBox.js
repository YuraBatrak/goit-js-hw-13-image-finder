import * as basicLightbox from 'basiclightbox';
import getRefs from './refs';
const refs = getRefs();

refs.galleryRef.addEventListener('click', onImageClick);

function onImageClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    e.preventDefault();

    const bigImgSrc = e.target.getAttribute('data-src');
    const instance = basicLightbox.create(`<img src=${bigImgSrc}/>`);
  
    instance.show();
}