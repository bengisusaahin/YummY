import React from "react";
import classes from "./Card.module.css";

function Card(props) {
  return (
    <div onClick={props.onClick} className={`${classes.card} ${props.cName}`}>
      {props.children}
    </div>
  );
}

export default Card;
