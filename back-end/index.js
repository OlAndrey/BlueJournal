
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");

const express = require('express')
const cors = require('cors')
var admin = require("firebase-admin");

const getNews = async (req, res) => {
  try {
    res.status(200).json({
      message: "I'm working!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error'
    })
  }
}

const app = express();
app.use(
  cors()
)
const port = process.env.PORT || 3500

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/api/test', getNews)
app.get('/*', (req, res) => res.json({message: 'error url'}))

exports.app = functions.https.onRequest(app)