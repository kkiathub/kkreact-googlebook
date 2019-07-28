import axios from "axios";

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
const APIKEY = "&key=AIzaSyANLuAaGEirdO7Uqoi3P1ITvQVLd6SNnVw";
const FILTER = "&filter=partial"

export default {
  // search books
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY + FILTER);
  },

  // Get all saved books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
