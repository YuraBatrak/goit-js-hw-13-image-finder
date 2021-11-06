export default function getRefs() {
    return {
        searchForm: document.querySelector('#search-form'),
        galleryRef: document.querySelector('.gallery'),
        inputRef: document.querySelector('#input-js'),
        body: document.querySelector('body'),
        checkbox: document.querySelector('#theme-switch-toggle')
    }
}