const global = {
   currentPage:window.location.pathname
}

async function displayPopularMovies(){
    spinnerStart()
    const result = await fetchAPIData('movie/popular');
    console.log(result);
    result.results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
              <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                    : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
              </div>
            `;
    
        document.querySelector('#popular-movies').appendChild(div);
      });
      spinnerStop()
}


async function displayPopularTvShows(){
    spinnerStart()
    const result = await fetchAPIData('tv/popular');
    console.log(result);
    result.results.forEach((tv) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
              <a href="tv-details.html?id=${tv.id}">
                ${
                  tv.poster_path
                    ? `<img
                  src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
                  class="card-img-top"
                  alt="${tv.title}"
                />`
                    : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${tv.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${tv.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${tv.first_air_date}</small>
                </p>
              </div>
            `;
    
        document.querySelector('#popular-movies').appendChild(div);
      });
      spinnerStop()
}

//to fetch data from the database
async function fetchAPIData(endPoint){
    const apiKey = 'ec1ca2affa7b4d85c5f4a08ac9d408cf';
    const apiURL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${apiURL}${endPoint}?api_key=${apiKey}&language=en-US`)
    const data = await response.json();
    return data;
}

//init app
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            console.log("home")
            break;
            case '/shows.html':
                console.log("shows")
                break;
                case '/novie-detail.html':
                    console.log("movie")
                    break;
                    case '/tv-details.html':
                        console.log("tv")
                        break;
                            case '/search.html':
                            console.log("search")
                            break;
                        
    }
    highlightActiveLink();
}

const spinnerStart=()=>{
    document.querySelector('.spinner').classList.add('show');
}


const spinnerStop=()=>{
    document.querySelector('.spinner').classList.remove('show');
}

const highlightActiveLink=()=>{
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link)=>{
        if(link.getAttribute('href')=== global.currentPage)
        {
            link.classList.add('active');
        }
    })
   
}


init();