import './sass/main.scss';
import cards from './partials/cards.hbs';
import ImagesApiService from './js/api.js';
import { loadMoreBtn } from './js/api.js';




import getRefs from './/js/refs';
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
    refs.galleryRef.insertAdjacentHTML('beforeend', cards(hits));
    if (hits.length > 0) {
       const elem = document.querySelector(`#id${hits[0].id}`);
       elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
    } 
}

function clearArticlesContainer() {
  refs.galleryRef.innerHTML = '';
}