import React, { Component } from "react";
import "./BaseLayout.css";
import Menu from "./Menu";
import Footer from "./Footer";

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const token = localStorage.getItem("jsonwebtoken");
    console.log("BaseLayout token:", typeof token);

    let isAuthenticated;

    if (!token || token === "undefined") {
      isAuthenticated = false;
      console.log(isAuthenticated);
    } else {
      isAuthenticated = true;
    }

    return (
      <div>
        <Menu isAuthenticated={isAuthenticated} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default BaseLayout;
