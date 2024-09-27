const { getText } = require('./openai-text');
const { getImage } = require('./stable-diffusion-image');

async function makeMovie(query) {
    var movie = {
    metadata: {
        title: 'dragon',
        overview: 'dragon',
        release_date: '2024',
        vote_average: (Math.random() * (4) + 3).toFixed(3),
        vote_count: Math.floor(Math.random() * 200) + 10,
        popularity: (Math.random() * (412) + 491).toFixed(3),
        original_language: 'en',
        original_title: 'dragon',
        genre_ids: 'Action,Adventure,Fantasy',
        id: '12569845302',
        backdrop_path: '',
        adult: true,
        poster_path: ''
      },
      score: 1
    }
    movie.metadata.overview = await getText("write a shorter description of the story of a movie with the inspiration from the text of the user without the title and with max 40 words.", query);
    movie.metadata.title = await getText("write just an original title of the movie based on the description without '", movie.metadata.overview);
    movie.metadata.original_title = movie.metadata.title
    movie.metadata.release_date = await getText("make up a release date of this movie and write only the date in the format yyyy-mm-dd", movie.metadata.overview);
    movie.metadata.genre_ids = await getText("write only the genre of this movie in the format genre1,genre2,...", movie.metadata.overview);
    // movie.metadata.poster_path = await getPoster("realistic image only without typography, no text, a simple movie poster about", movie.metadata.overview);
    await getImage(movie.metadata.title);
    return movie;
} module.exports = { makeMovie };

// console.log(makeMovie());