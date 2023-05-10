const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const motionPicture = require('./controllers/controllers')
const motionPictureRouter = require('./router/routes')


const port = process.env.MY_PORT || 5000;

app.use(cors({
  origin: [
    "https://tmdb-app-8pkp.vercel.app",
    "https://tmdb-app-8pkp-raygdev.vercel.app",
    "https://tmdb-app-apkp-git-main-raygdev.vercel.app"
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(motionPicture.logger);

app.use(motionPictureRouter)

app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on port ${port}`);
});

