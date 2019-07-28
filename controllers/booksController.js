const db = require("../models");
var axios = require("axios");

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
const APIKEY = "&key=" + process.env.GOOGLEAPI_KEY;
const FILTER = "&filter=partial"

// Defining methods for the booksController
module.exports = {
  search: function (req, res) {
    // axios.get(BASEURL + req.params.id + APIKEY + FILTER)
    //   .then(sData => {
    //     console.log(sData.data);
    //      res.json(sData.data)
    //   })
    //   .catch(err => res.status(422).json(err));
    var searchData = {};
    axios.get(BASEURL + req.params.id + APIKEY + FILTER)
      .then(sRes => {
        searchData.totalItems = sRes.data.totalItems;
        searchData.items = [];
        var itemArr = sRes.data.items;
        for (var i = 0; i < itemArr.length; i++) {
          var book = {
            id: itemArr[i].id,
            title: itemArr[i].volumeInfo.title,
            author: itemArr[i].volumeInfo.authors,
            description: itemArr[i].volumeInfo.description,
            link: itemArr[i].volumeInfo.infoLink,
            saved: false
          };
          if (itemArr[i].volumeInfo.imageLinks)
            book.image = itemArr[i].volumeInfo.imageLinks.thumbnail;
          else
            book.image = "";
          searchData.items.push(book);
        }
        return db.Book.find({});
      })
      .then(qRes => {
        // console.log(searchData.items);
        // console.log(qRes);
        // check if any search result book is already saved
        for(var i=0; i<qRes.length; i++) {
          for(var j=0; j<searchData.items.length; j++) {
            if (qRes[i].bookId==searchData.items[j].id) {
              searchData.items[j].saved = true;
              break;
            }
          }
        }
        // console.log(searchData.items);

        res.json(searchData)
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};