import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { ViewBtn, SaveBtn } from "../components/Button";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
// import io from 'socket.io-client';

import "./Search.css";

class Books extends Component {
  state = {
    books: [],
    keyword: ""
  };

  saveBook = bookRec => {
    // var socket = io("http://localhost:3000", { forceNew: false });

    //     socket.emit('book saved', bookRec.title);
    API.saveBook({
      bookId: bookRec.id,
      title: bookRec.title,
      author: JSON.stringify(bookRec.author),
      description: bookRec.description,
      link: bookRec.link,
      image: bookRec.image
    })
      .then(res => {
        // var socket = io();
        // socket.emit('book added', bookRec.title);
        console.log(res)
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    var queryStr = this.state.keyword.replace(/ +/g, "+");

    API.search(queryStr)
      .then(res => {
        if (res.data.Error) {
          this.setState({ books: null })
        } else {
          var bookData = res.data.items;
          for (var i = 0; i < bookData.length; i++) {
            if (!bookData[i].image) {
              console.log("no image "+ i);
              bookData[i].image = process.env.PUBLIC_URL + "/images/placeholder.png"
            }
          }
          this.setState({ books: bookData, keyword: "" });
        }
      })
      .catch(err => console.log(err));
  };

  renderSaveButton(book, obj) {
    if (book.saved) {
      return <button type="button" className="btn btn-secendary" disabled >Saved</button>

    } else {
      return <SaveBtn onClick={() => obj.saveBook(book)} />
    }
  }

  render() {
    var resultStr = "";
    var numBooksFound = this.state.books.length;
    if (numBooksFound === 0)
      resultStr = "Enter you book title and start searching ...";
    else if (numBooksFound === 1)
      resultStr = numBooksFound + " book found!";
    else
      resultStr = numBooksFound + " books found!";

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>Google Book Search</h3>
              <form>

                <div className="input-group">
                  <Input
                    value={this.state.keyword}
                    onChange={this.handleInputChange}
                    name="keyword"
                    placeholder="Book Title"
                  />
                  <div className="input-group-append">

                    <FormBtn
                      disabled={!(this.state.keyword)}
                      onClick={this.handleFormSubmit}
                    >
                      Search
                    </FormBtn>
                  </div>
                </div>

              </form>
            </Jumbotron>
          </Col>
        </Row>
        <div className="container-fluid search-result py-3">
          <h5>{resultStr}</h5>
          {this.state.books.map(book => (
            <div className="row px-3" key={book.id}>
              <div className="col-md-12 search-book my-2 py-2">
                <Row>
                  <Col size="md-9">
                    <h4>🕮 {book.title}</h4>
                    <h5>{book.author ? ("Written By " + book.author) : "No author available"}</h5>
                  </Col>
                  <Col size="md-3">
                    <div className="group-button">
                      <ViewBtn onClick={() => window.open(book.link, "_blank")} />
                      {this.renderSaveButton(book, this)}
                      {/* <SaveBtn onClick={() => this.saveBook(book)} /> */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-2">
                    <img src={book.image} className="book-img" alt="..." />
                  </Col>
                  <Col size="md-10">
                    <p>{book.description ? book.description : "No discription available."}</p>
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
