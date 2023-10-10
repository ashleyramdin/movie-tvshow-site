// API configuration
const apiToken = 'API Read Access Token'; // Replace with your actual Token

// Fetch data from the API
const fetchData = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  }).then((response) => response.json());
};

// Fetch data from different API endpoints
Promise.all([
  fetchData('https://api.themoviedb.org/3/trending/all/day?language=en-US'),
  fetchData(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  ),
  fetchData(
    'https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'
  ),
  fetchData('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'),
  fetchData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'),
])
  .then((responses) => {
    const trendingResponse = responses[0];
    const moviesResponse = responses[1];
    const tvShowsResponse = responses[2];
    const upcomingMoviesResponse = responses[3];
    const topRatedMoviesResponse = responses[4];

    // Call functions to populate each section with data
    populateBanner(trendingResponse);
    populateMovies(moviesResponse);
    populateTVShows(tvShowsResponse);
    populateUpcomingMovies(upcomingMoviesResponse);
    populateTopRatedMovies(topRatedMoviesResponse);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Function to populate the banner section with trending content
const populateBanner = (data) => {
    const carouselExampleDark = $('#carouselExampleDark');
  
    for (const item of data.results) {
      const index = data.results.indexOf(item);
      let indexActive = '';
  
      if (index === 0) {
        indexActive = 'active';
      }
  
      const indicator = $('<button>')
        .attr('type', 'button')
        .attr('data-bs-target', '#carouselExampleDark')
        .attr('data-bs-slide-to', index)
        .addClass(indexActive)
        .attr('aria-current', index === 0)
        .attr('aria-label', `Slide ${index + 1}`);
  
      $('.carousel-indicators').append(indicator);
  
      const carouselItem = $('<div>').addClass('carousel-item');
      if (index === 0) {
        carouselItem.addClass('active');
      }
      carouselItem.attr('data-bs-interval', 3000);
  
      $('.carousel-inner').append(carouselItem);
  
      const carouselImg = $('<img>')
        .attr('alt', `Image of ${item.name}`)
        .addClass('d-block w-100');
  
      if ($(window).width() > 600) {
        carouselImg.attr('src', `http://image.tmdb.org/t/p/w500${item.backdrop_path}`);
      } else if ($(window).width() < 600) {
        carouselImg.attr('src', `http://image.tmdb.org/t/p/w500${item.poster_path}`);
      }
  
      const carouselCaption = $('<div>').addClass('carousel-caption d-none d-md-block text-start col col-lg-4');
      let h5Caption;
  
      if (item.name) {
        h5Caption = $('<h1>').text(`${item.name}`);
      } else {
        h5Caption = $('<h1>').text(`${item.title}`);
      }
  
      const pCaption = $('<h4>').text(item.overview);
      carouselCaption.append(h5Caption, pCaption);
  
      carouselItem.append(carouselImg, carouselCaption);
    }
  };

// Function to populate the trending movies section
const populateMovies = (data) => {
    for (const movie of data.results) {
      const card = $('<div>').addClass('card');
      const img = $('<img>')
        .addClass('card-img-top')
        .attr('alt', `Image of ${movie.name}`)
        .attr('src', `http://image.tmdb.org/t/p/w500${movie.poster_path}`);
  
      const cardBody = $('<div>').addClass('card-body');
      const cardTitle = $('<h5>').addClass('card-title').text(movie.title);
  
      cardBody.append(cardTitle);
      card.append(img, cardBody);
      $('.movieGroup').append(card);
    }
  };

// Function to populate the trending TV shows section
const populateTVShows = (data) => {
    for (const tvShow of data.results) {
      const card = $('<div>').addClass('card');
      const img = $('<img>')
        .addClass('card-img-top')
        .attr('alt', `Image of ${tvShow.name}`)
        .attr('src', `http://image.tmdb.org/t/p/w500${tvShow.poster_path}`);
  
      const cardBody = $('<div>').addClass('card-body');
      const cardTitle = $('<h5>').addClass('card-title').text(tvShow.name);
  
      cardBody.append(cardTitle);
      card.append(img, cardBody);
      $('.tvGroup').append(card);
    }
  };

// Function to populate the upcoming movies section
const populateUpcomingMovies = (data) => {
  // Add code to populate the upcoming movies section with data
};

// Function to populate the top rated movies section
const populateTopRatedMovies = (data) => {
  // Add code to populate the top rated movies section with data
};
