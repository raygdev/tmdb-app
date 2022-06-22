const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { application } = require("express");

const port = process.env.MY_PORT || 5000;
const key = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.ip} \n ${req.method} \n ${req.headers["user-agent"]}`);
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/movie/:id", (req, res) => {
  const { id } = req.params;
  getMotionPictureData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos,similar,credits`,
    res
  ).catch((e) => console.log(e));
});

app.post("/api/motionpicture", (req, res) => {
  let { motionPicture } = req.query;
  getMotionPictureData(
    `https://api.themoviedb.org/3/trending/${motionPicture}/week?api_key=${key}`,
    res
  ).catch((e) => console.log(e));
});

app.post("/api/tvshow/:show_id", (req, res) => {
  const { show_id } = req.params;
  getMotionPictureData(
    `https://api.themoviedb.org/3/tv/${show_id}?api_key=${key}&append_to_response=videos,similar,credits`,
    res
  ).catch((e) => console.log(e));
});
app.post("/api/genres/", (req, res) => {
  let { with_genres, page, motion_picture } = req.query;
  getMotionPictureData(
    `https://api.themoviedb.org/3/discover/${motion_picture}?api_key=${key}&with_genres=${with_genres}&page=${page}&list`,
    res
  ).catch((e) => console.log(e));
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

async function getMotionPictureData(url, res) {
  const response = await fetch(url);
  const data = await response.json();
  res.send(data);
}
