import React from "react";

import "./Jumbotron.css";


function Jumbotron({ children }) {
  return (
    <div className="jumbotron my-3" >
      {children}
    </div>
  );
}

export default Jumbotron;
