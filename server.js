//BASE
require('dotenv').config();
const express = require("express");
const bcrypt = require('bcrypt');
const cors = require("cors");

//ROUTES
const apiRouter = require('./api/apiRouter');

//PORT
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

//CORS CONFIGURATION
const whitelist = ['https://bubbly-colors.netlify.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy"));
    }
  }
}

app.use(cors());

app.options('*', cors()) // include before other routes

app.use('/api', apiRouter);

app.get("/", function (req, res) {
  res.send("API is online 👍");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});