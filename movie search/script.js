const movieInput = document.querySelector('.js-movie');
const searchBtn = document.querySelector('.js-search');
const resultsContainer = document.querySelector('.js-results');
const favoriteContainer = document.querySelector('.js-favorites');
const showResultBtn = document.querySelector('.js-show-search');
const showFavoriteBtn = document.querySelector('.js-show-favorites');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
async function getInput(){
const inputValue = movieInput.value.trim();
if(inputValue === ''){
  resultsContainer.innerHTML ='<p class="enter"> Please Enter a Movie</p>'
  return;
}
resultsContainer.innerHTML = '<p class="loading">Loading...</p>';
try {
  const url = `https://www.omdbapi.com/?apikey=d5dfca2f&s=${inputValue}`;
  const response = await fetch(url);
  const results = await response.json();
  if(results.Response === 'False'){
    resultsContainer.innerHTML = '<p class="found">Movie not found</p> ' ;
  return;
  }
  let html = '';
  const promises = results.Search.map(async(movie)=>{
  const dataUrl = `https://www.omdbapi.com/?apikey=d5dfca2f&i=${movie.imdbID}`;
  const dataResponse = await fetch(dataUrl);
  const movieDetails = await dataResponse.json();
  return movieDetails;
  })  
  const movies = await Promise.all(promises)

  movies.forEach((movie)=>{
    const poster = movie.Poster !== 'N/A'? `<img src="${movie.Poster}">`: '';
  const add = favorites.includes(movie.imdbID) ? ' ❤️ Added to  Favorites' : ' ❤️ Add To Favorites'

    html += `
  <div class="movie-card">
    ${movie.Title} 
    ${poster}
    <p>${movie.Year}</p>
    <p>${movie.Type}</p>
    <p>⭐${movie.imdbRating}</p>
    <p>${movie.Plot}</p>
    <button class="js-favorite" data-id="${movie.imdbID}">${add}</button>
  </div>
  `
  })
  resultsContainer.innerHTML = html;
  document.querySelectorAll('.js-favorite').
  forEach((button)=>{
    button.addEventListener('click' , ()=>{
    const id = button.dataset.id
    if(favorites.includes(id)){
      
      return
    }else{
      favorites.push(id);
      button.innerHTML = ' ❤️Added to  Favorites';
    }
    saveToStorage();
    getFavorites();
  
    });
  });
  movieInput.value = '';
    
} catch (error) {
  resultsContainer.textContent = 'Something went wrong , please try again later';
}
}
searchBtn.addEventListener('click', getInput);
movieInput.addEventListener('keydown', (event) =>{
  if(event.key === 'Enter'){getInput()}
  
})

async function getFavorites(){
  if (favorites.length === 0) {
  favoriteContainer.innerHTML = '❤️ No favorite movies yet.';
  return;
}
try {
   const promises =  favorites.map(async(id)=>{
  const response = await fetch(`https://www.omdbapi.com/?apikey=d5dfca2f&i=${id}`);
  const data = await response.json();
  return data;
  })
  const moviedata = await Promise.all(promises);
  let favoriteHTML = '';
  moviedata.forEach((movie)=>{
  const poster = movie.Poster !== 'N/A'? `<img src="${movie.Poster}">`: '';
  favoriteHTML += `
  <div class="favorite-card">
  <p>${movie.Title}</p>
  ${poster}
  <p>${movie.Year}</p>
  <p>${movie.imdbRating}</p>
  <p>${movie.Plot}</p>
  <button class="js-remove" data-id="${movie.imdbID}">Remove from Favorites</button>
  </div>
  `;
  })
  favoriteContainer.innerHTML = favoriteHTML;
  document.querySelectorAll('.js-remove').
  forEach((button)=>{
    button.addEventListener('click' , ()=>{
      const id = button.dataset.id
      favorites = favorites.filter((p =>{return p !== id}))
      saveToStorage();
      getFavorites();
    });
  });
} catch (error) {
  favoriteContainer.textContent = 'Something went wrong , please try again later';
}
  
}
getFavorites();
showResultBtn.addEventListener('click' , ()=>{
  resultsContainer.style.display = 'grid' ;
  favoriteContainer.style.display = 'none';
  showResultBtn.classList.add('active');
  showFavoriteBtn.classList.remove('active');
})
showFavoriteBtn.addEventListener('click' , ()=>{
  resultsContainer.style.display = 'none' ;
  favoriteContainer.style.display = 'grid';
  showFavoriteBtn.classList.add('active');
  showResultBtn.classList.remove('active');
})
function saveToStorage(){
  localStorage.setItem('favorites' , JSON.stringify(favorites))
}

