const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const cors = require("cors");
const motionPicture = require('./controllers/controllers')


const port = process.env.MY_PORT || 5000;
const key = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(motionPicture.logger);

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/movie/:id", motionPicture.getMovieInfo);

app.post("/api/motionpicture", motionPicture.getMotionPicture);

app.post("/api/tvshow/:show_id", motionPicture.getShowInfo);
app.post("/api/genres/", motionPicture.getTitlesWithGenre);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

async function getMotionPictureData(url, res) {
  const response = await fetch(url);
  const data = await response.json();
  res.send(data);
}
