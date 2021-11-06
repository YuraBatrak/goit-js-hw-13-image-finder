import ImagesApiService from './apiService';
import imageCardTpl from '../partials/imageCard.hbs';
import { loadMoreBtn } from './apiService';
import getRefs from './refs';
const refs = getRefs();

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice } from '@pnotify/core';

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;
    
    if (imagesApiService.query === '') {
        return notice({
            text: 'Please enter your search query😉',
            delay: 2000,
        });
    }
    loadMoreBtn.show();
    imagesApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(hits => {
    appendArticlesMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(hits) {
    refs.galleryRef.insertAdjacentHTML('beforeend', imageCardTpl(hits));
    if (hits.length > 0) {
       const elem = document.querySelector(`#id${hits[0].id}`);
       elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
    } 
}

function clearArticlesContainer() {
  refs.galleryRef.innerHTML = '';
}