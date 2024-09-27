const { MongoClient } = require('mongodb');
const { getMovieData } = require('./tmdb');
const { getEmbedding } = require('../embedding/embedding');
const { config } = require('dotenv');
config();

const uri = process.env.MONGODB_URI;

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("movie-index");
    const movie = database.collection("movies");
    movie.deleteMany();

    const movieData = await getMovieData(100);
    for (let i = 0; i < movieData.length; i++) {
        console.log(`Uploading record ${i+1} of ${movieData.length}`);
        const record = {
            _id: 's'+(i+1),
            values: await getEmbedding(`${movieData[i].title}, ${movieData[i].overview}`),
            metadata: {
                title: movieData[i].title, 
                overview: movieData[i].overview,
                release_date: movieData[i].release_date,
                vote_average: movieData[i].vote_average,
                vote_count: movieData[i].vote_count,
                popularity: movieData[i].popularity,
                original_language: movieData[i].original_language,
                original_title: movieData[i].original_title,
                genre_ids: `${movieData[i].genre_ids}`,
                id: `${movieData[i].id}`,
                backdrop_path: movieData[i].backdrop_path,
                adult: movieData[i].adult,
                poster_path: movieData[i].poster_path
            },
        };
        const result = await movie.insertOne(record);
    }
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);
