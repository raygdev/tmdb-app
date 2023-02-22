const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const motionPicture = require('./controllers/controllers')
const motionPictureRouter = require('./router/routes')


const port = process.env.MY_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(motionPicture.logger);

app.use(motionPictureRouter)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

