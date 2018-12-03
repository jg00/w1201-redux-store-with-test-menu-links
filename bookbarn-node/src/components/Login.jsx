import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { setAuthenticationToken } from "../utils";
const LOGIN_URL = "http://localhost:3001/api/user/login";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  handleLoginButtonClick = e => {
    let user = this.state.user;

    axios
      .post(LOGIN_URL, user)
      .then(response => {
        console.log("login call response: ", response);

        // save the token so we can access it later on
        // local storage
        localStorage.setItem("jsonwebtoken", response.data.token);
        // put the token in the request header
        setAuthenticationToken(response.data.token);

        // console.log(response.data.token);
      })
      .catch(rejected => {
        console.log("Login user connection error: ", rejected);
      });
  };

  render() {
    return (
      <div>
        <div className="div-login div-container-all">
          <h5>Login</h5>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.handleTextBoxOnChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={this.handleTextBoxOnChange}
          />
          <button onClick={this.handleLoginButtonClick}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
