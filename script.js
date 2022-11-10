let subMenu = document.getElementById('subMenu');

function toggleMenu(){
    subMenu.classList.toggle('open-menu')
}

var counter = 1;
setInterval(function(){
   document.getElementById('radio' + counter).checked = true;
   counter++;
   if(counter>4){
    counter = 1;
   } 
}, 5000)


// TMDB

const API_KEY = 'api_key=900e7738800eb2e39b3194781683cc3c'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('srch')
const searchURL = BASE_URL + '/search/movie?' +API_KEY
getMovies(API_URL)





function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })

}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
          <h4>${title}</h4>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h4>Overview</h4>
          ${overview}
        </div>
        
        `

        main.appendChild(movieEl);
        
    })


}


function getColor(vote) {
    if(vote>=8){
        return 'green'
    } else if (vote >= 5){
        return 'orange'
    } else{
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();


    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL)
    }



})