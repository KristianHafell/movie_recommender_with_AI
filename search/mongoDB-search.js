const { MongoClient } = require('mongodb');
const { config } = require('dotenv');
const { getEmbedding } = require('../embedding/embedding');
const { makeMovie } = require('../make-movie/make-movie');
config();

const uri = process.env.MONGODB_URI;

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function getMovies(query) {
  try {

    // console.log("query:", query);
    const embedding = await getEmbedding(query);

    const database = client.db("movie-index");
    const movie = database.collection("movies");

    const queryResponse = await movie.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                queryVector: embedding,
                path: "values",
                numCandidates: 4,
                limit: 4
            }
        },
        {
            $project: {
                _id: 0, 
                metadata: 1,
                score: {
                  $meta: 'vectorSearchScore'
                }
              }
        }
    ]).toArray();


    for (let i = 0; i < queryResponse.length; i++) {
        queryResponse[i].metadata.poster_path =  `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${queryResponse[i].metadata.poster_path}`;
    }


    for (let i = 0; i < 1; i++) {
      queryResponse.splice(0, 0, await makeMovie(query));
    }


    // console.log("queryResponse", queryResponse);
    return queryResponse;
    
  } finally {
     // Close the MongoDB client connection
    
  }
} module.exports = { getMovies };

// getMovies("Under the sea");
