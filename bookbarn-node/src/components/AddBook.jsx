import React, { Component } from "react";
import "./AddBook.css";
import axios from "axios";
import { setAuthenticationToken } from "../utils";
const ADD_BOOK_URL = "http://localhost:3001/api/books/add";

class AddBook extends Component {
  constructor(props) {
    super(props);

    console.log("addbook", this.props);

    this.state = {
      book: {}
    };
  }

  handleTextBoxOnChange = e => {
    this.setState({
      book: {
        ...this.state.book,
        [e.target.name]: e.target.value
      }
    });
  };

  handleAddBookButtonClick = () => {
    // console.log("button", this);
    // console.log(this.state.book);

    let book = this.state.book;
    // console.log(book);

    const token = localStorage.getItem("jsonwebtoken");
    // console.log("From LocalStorage:", token);
    // put the token in the request header
    setAuthenticationToken(token);

    axios
      .post(ADD_BOOK_URL, book)
      .then(response => {
        // console.log(response);
        console.log("Book added: ", response.data);
        this.props.history.push("/");
      })
      .catch(rejected => {
        console.log("Add book connection error: ", rejected);
      });
  };

  render() {
    return (
      <div>
        <div className="div-addbooks div-container-all">
          <h5>Add Book</h5>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={this.handleTextBoxOnChange}
          />
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={this.handleTextBoxOnChange}
          />
          <button onClick={this.handleAddBookButtonClick}>Add Book</button>
        </div>
      </div>
    );
  }
}

export default AddBook;
