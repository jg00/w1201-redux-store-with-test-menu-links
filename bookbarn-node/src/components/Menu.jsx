import React, { Component } from "react";
import "./Menu.css";
import { Link, NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    const menuItemsAuthenticated = [
      { LinkTo: "/", LinkTitle: "Home" },
      { LinkTo: "/addbook", LinkTitle: "Add Book" },
      { LinkTo: "/register", LinkTitle: "Register" },
      { LinkTo: "/login", LinkTitle: "Login" }
    ];

    const menuItemsNonAuthenticated = [
      { LinkTo: "/", LinkTitle: "Home" },
      { LinkTo: "/register", LinkTitle: "Register" },
      { LinkTo: "/login", LinkTitle: "Login" }
    ];

    const menuItemsNonAuthenticatedElements = menuItemsNonAuthenticated.map(
      (menuItem, index) => {
        return (
          <li key={index}>
            <Link to={menuItem.LinkTo}>{menuItem.LinkTitle}</Link>
          </li>
        );
      }
    );

    const menuItemsAuthenticatedElements = menuItemsAuthenticated.map(
      (menuItem, index) => {
        return (
          <li key={index}>
            <Link to={menuItem.LinkTo}>{menuItem.LinkTitle}</Link>
          </li>
        );
      }
    );

    return (
      <div>
        <div className="div-menu div-container-all">
          <ul className="div-menu-ul">
            {this.props.isAuthenticated
              ? menuItemsAuthenticatedElements
              : menuItemsNonAuthenticatedElements}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
