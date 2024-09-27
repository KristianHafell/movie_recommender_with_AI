const fetch = require('node-fetch');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGM0ZTE3NzZiOTFkNzMxNDkwMWVkMTA5MzJjMjJkNyIsIm5iZiI6MTcyNDM5MzgxOS4wNjk1ODQsInN1YiI6IjY2YmRjYzY2NDZlMTk1NTlmOTgyODkwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59rk3xdXNniKPI8V2hglTOWGRKbp8TfCGpjnWEFoXkE'
  }
};

async function getMovieData(num) {
    let movieData = [];
    for (let i = 0; i <= Math.floor(num/20); i++) {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i+1}&sort_by=popularity.desc`, options);
        const json = await response.json();
        for (let j = 0; j < json.results.length; j++) {
            const genreList = json.results[j].genre_ids;
            const genre = await getMovieGenre(genreList);
            json.results[j].genre_ids = genre;

            const movie = json.results[j];
            movieData.push(movie);
        }
    }
    return movieData;
} module.exports = { getMovieData };

async function getMovieGenre(idList) {
  let movieGenre = [];
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, options);
  const json = await response.json();
  for (let j = 0; j < idList.length; j++) {
      const genre = json.genres.find(genre => genre.id === idList[j]).name;
      movieGenre.push(genre)
  }
  return movieGenre;
}