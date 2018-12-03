import React, { Component } from "react";
import "./Register.css";
import axios from "axios";
const REGISTER_URL = "http://localhost:3001/api/user/register";

class Register extends Component {
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
    // console.log(user);
  };

  handleRegisterButtonClick = () => {
    let user = this.state.user;
    console.log(user);

    axios
      .post(REGISTER_URL, user)
      .then(response => {
        console.log(response.data);
      })
      .catch(rejected => {
        console.log("Register user connection error: ", rejected);
      });
  };

  render() {
    return (
      <div>
        <div className="div-register div-container-all">
          <h5>Register</h5>
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
          <button onClick={this.handleRegisterButtonClick}>
            Register User
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
