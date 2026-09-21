const movieInput = document.querySelector('.js-movie');
const searchBtn = document.querySelector('.js-search');
const resultsContainer = document.querySelector('.js-results');
async function getsInput(){
const inputValue = movieInput.value.trim();
if(inputValue === ''){
  return;
}
const url = `https://www.omdbapi.com/?apikey=d5dfca2f&s=${inputValue}`;
const response = await fetch(url)
const results = await response.json();
if(results.response){
  console.log('fine')
}

 let html = '';
const promises = results.Search.map(async(movie)=>{
const dataUrl = `https://www.omdbapi.com/?apikey=d5dfca2f&i=${movie.imdbID}`;
const dataResponse = await fetch(dataUrl);
const movieDetails = await dataResponse.json();
return movieDetails
})  
const movies = await Promise.all(promises)
console.log(movies)
movies.forEach((movie)=>{
  html += `
 <div>
  ${movie.Title} 
  <img src="${movie.Poster}">
  <p>${movie.Year}</p>
  <p>${movie.Type}</p>
  <p>⭐${movie.imdbRating}</p>
  <p>${movie.Plot}</p>
 </div>
 `
})

resultsContainer.innerHTML = html;
}
searchBtn.addEventListener('click', getsInput);
movieInput.addEventListener('keydown', (event) =>{
  if(event.key === 'Enter'){getsInput()}
})


