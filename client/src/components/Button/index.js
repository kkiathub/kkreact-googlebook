import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function ViewBtn(props) {
  return (
    <button type="button" className="btn btn-primary mr-3" {...props} >View</button>
  );
}

export function SaveBtn(props) {
  return (
    <button type="button" className="btn btn-primary" {...props} >Save</button>
  );
}