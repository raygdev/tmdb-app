const express = require('express')
const motionPicture = require("../controllers/controllers")

const router = express.Router()

router.post("/api/movie/:id", motionPicture.getMovieInfo);

router.post("/api/motionpicture", motionPicture.getMotionPicture);

router.post("/api/tvshow/:show_id", motionPicture.getShowInfo);
router.post("/api/genres/", motionPicture.getTitlesWithGenre);

module.exports = router