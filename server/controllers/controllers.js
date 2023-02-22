const fetch = require("node-fetch");
require('dotenv').config()

const key = process.env.API_KEY

exports.logger = (req, res, next) => {
    console.log(`${req.ip} \n ${req.method} \n ${req.headers["user-agent"]}`);
    next();
  }

exports.getMotionPicture = (req, res) => {
    let { motionPicture } = req.query;
    getMotionPictureData(
      `https://api.themoviedb.org/3/trending/${motionPicture}/week?api_key=${key}`,
      res
    ).catch((e) => console.log(e));
  }

  exports.getShowInfo = (req, res) => {
    const { show_id } = req.params;
    getMotionPictureData(
      `https://api.themoviedb.org/3/tv/${show_id}?api_key=${key}&append_to_response=videos,similar,credits`,
      res
    ).catch((e) => console.log(e));
  }

exports.getMovieInfo = (req, res) => {
    const { id } = req.params;
    getMotionPictureData(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos,similar,credits`,
      res
    ).catch((e) => console.log(e));
  }

  exports.getTitlesWithGenre = (req, res) => {
    let { with_genres, page, motion_picture } = req.query;
    getMotionPictureData(
      `https://api.themoviedb.org/3/discover/${motion_picture}?api_key=${key}&with_genres=${with_genres}&page=${page}&list`,
      res
    ).catch((e) => console.log(e));
  }


  async function getMotionPictureData(url, res) {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  }