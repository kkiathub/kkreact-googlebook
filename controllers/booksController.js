const db = require("../models");
var axios = require("axios");

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
const APIKEY = "&key=" + process.env.GOOGLEAPI_KEY;
const FILTER = "&filter=partial"

// Defining methods for the booksController
module.exports = {
  search: function(req, res) {
    axios.get(BASEURL + req.params.id + APIKEY + FILTER)
      .then(sData => { 
        res.json(sData.data);
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
  //   db.Book
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // update: function(req, res) {
  //   db.Book
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
