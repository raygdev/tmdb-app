const express = require('express')
const motionPicture = require("../controllers/controllers")

const router = express.Router()

router.get("/api/movie/:id", motionPicture.getMovieInfo);

router.get("/api/motionpicture", motionPicture.getMotionPicture);

router.get("/api/tvshow/:show_id", motionPicture.getShowInfo);
router.get("/api/genres/", motionPicture.getTitlesWithGenre);
router.get("/api/people/:id", motionPicture.getPersonById)

module.exports = router