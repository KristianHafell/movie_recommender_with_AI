const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// const { getMovies } = require('./search');
const { getMovies } = require('./search/mongoDB-search');

app.post('/search', async (req, res) => {
  try {
    // console.log("req.body", req.body.query.text);
    const response = await getMovies(req.body.query.text);

    // console.log("responce", response);
    res.json({ searchedMovie: response });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/upload', (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // If doesn't have image mime type prevent from uploading
  if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv(__dirname + '/upload/' + image.name);

  // All good
  res.sendStatus(200);
});

app.listen(3002, () => {  
  console.log('Server is running on port 3002');
});