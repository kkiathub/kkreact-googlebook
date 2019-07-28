import React from "react";


import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">

      <a className="navbar-brand" href="/">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
      </a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/books">Saved</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
