import React, { Component } from "react";
import { DeleteBtn, ViewBtn } from "../components/Button";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";

import "./Search.css";


class Books extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        // console.log(res.data);
        var bookArr = [];
        for(var i=0; i<res.data.length; i++) {
          var book = {
            id : res.data[i]._id,
            title : res.data[i].title,
            link : res.data[i].link,
            image : res.data[i].image
          }
          book.description = ( res.data[i].description)?res.data[i].description:"No description available."
          if (res.data[i].author)
            book.author = JSON.parse(res.data[i].author);
          bookArr.push(book);
        }

        this.setState({ books: bookArr });
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    var resultStr = "";
    if (this.state.books.length===0) {
      resultStr = "No book saved."
    } else {
      resultStr = this.state.books.length + (this.state.books.length>1?" books saved.":" book saved.");
    }
    return (
      <Container fluid>
        <div className="container-fluid saved-result py-3 mt-3">
          <h5>{resultStr}</h5>
          {this.state.books.map(book => (
            <div className="row px-3" key={book.id}>
              <div className="col-md-12 search-book my-2 py-2">
                <Row>
                  <Col size="md-9">
                    <h4>🕮 {book.title}</h4>
                    <h5>{book.author?("Written By "+book.author):"No author available"}</h5>
                  </Col>
                  <Col size="md-3">
                    <div className="group-button">
                      <ViewBtn onClick={() => window.open(book.link, "_blank")} />
                      <DeleteBtn onClick={() => this.deleteBook(book.id)} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-2">
                    <img src={book.image} className="book-img" alt="..." />
                  </Col>
                  <Col size="md-10">
                    <p>{book.description?book.description:"No discription available."}</p>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default Books;
