const BASE_URL = 'https://pixabay.com/api/';
const KEY=24211699-fe52f20aaf965cfae8cea3f33;


export default class ImagesApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.perPage = 12;
    }
    fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${KEY}`;
    
        return fetch(url)
          .then(response => response.json())
          .then(({ hits }) => {
            this.incrementPage();
            if (hits.length === 0) {
            error({
              text: 'Didn`t find anything😑',
              delay: 2000,
            });
            loadMoreBtn.hide() 
              return []  
          }
            return hits;
          });
      }
    
      incrementPage() {
        this.page += 1;
      }
    
      resetPage() {
        this.page = 1;
      }
    
      get query() {
        return this.searchQuery;
      }
    
      set query(newQuery) {
        this.searchQuery = newQuery;
      }
    }