const { MongoClient } = require('mongodb');
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

    const query = { _id: 's1' };
    const result = await movie.find(query).toArray();

    // console.log("movie", result[0].metadata.title);
    // console.log('done');
    
    await client.close();
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run();
