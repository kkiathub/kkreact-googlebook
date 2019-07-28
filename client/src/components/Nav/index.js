import React from "react";


import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">

      <a className="navbar-brand" href="/">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
      </a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Search</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/books">Save</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
