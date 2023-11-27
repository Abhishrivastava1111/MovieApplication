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
                  alt="${tv.name}"
                />`
                    : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${tv.name}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${tv.name}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${tv.first_air_date}</small>
                </p>
              </div>
            `;
    
        document.querySelector('#popular-shows').appendChild(div);
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

async function displayMovieDetail(){
    const id = window.location.search.split('=')[1];


    const movie = await fetchAPIData(`movie/${id}`)

    displayBackgroundImage('movie', movie.backdrop_path);

    document.querySelector('.details-top').innerHTML=`<div>
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
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
    ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}
  </div>
</div>
  `;

}

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
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
                displayPopularTvShows();
                console.log("shows")
                break;
                case '/movie-details.html':
                    displayMovieDetail();
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

function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\id(3))+(?!\d))/g, ',')
}
init();