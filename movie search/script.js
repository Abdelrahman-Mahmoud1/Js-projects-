const movieInput = document.querySelector('.js-movie');
const searchBtn = document.querySelector('.js-search');
const resultsContainer = document.querySelector('.js-results');
const favoriteContainer = document.querySelector('.js-favorites')
const showResultBtn = document.querySelector('.js-show-search');
const showFavoriteBtn = document.querySelector('.js-show-favorites')
let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
async function getsInput(){
const inputValue = movieInput.value.trim();
if(inputValue === ''){
  return;
}
resultsContainer.textContent = 'Loading...';
const url = `https://www.omdbapi.com/?apikey=d5dfca2f&s=${inputValue}`;
const response = await fetch(url)
const results = await response.json();
if(results.Response === 'False'){
  resultsContainer.textContent = 'movie not found'
 return;
}
let html = '';
const promises = results.Search.map(async(movie)=>{
const dataUrl = `https://www.omdbapi.com/?apikey=d5dfca2f&i=${movie.imdbID}`;
const dataResponse = await fetch(dataUrl);
const movieDetails = await dataResponse.json();
return movieDetails
})  
const movies = await Promise.all(promises)

movies.forEach((movie)=>{
  const poster = movie.Poster !== 'N/A'? `<img src="${movie.Poster}">`: '';
 const add = favorite.includes(movie.imdbID) ? ' ❤️ Added to  Favorites' : ' ❤️ Add To Favorites'

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
  if(favorite.includes(id)){
    
     return
  }else{
    favorite.push(id);
    button.innerHTML = ' ❤️Added to  Favorites';
  }
  saveToStorage();
  getFavorites();
 
  });
});
}
searchBtn.addEventListener('click', getsInput);
movieInput.addEventListener('keydown', (event) =>{
  if(event.key === 'Enter'){getsInput()}
})

async function getFavorites(){
  if (favorite.length === 0) {
  favoriteContainer.innerHTML = '❤️ No favorite movies yet.';
  return;
}
  const promises =  favorite.map(async(id)=>{
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
      favorite = favorite.filter((p =>{return p !== id}))
      saveToStorage();
      getFavorites();
    });
  });
      return favorite;
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
  localStorage.setItem('favorite' , JSON.stringify(favorite))
}

