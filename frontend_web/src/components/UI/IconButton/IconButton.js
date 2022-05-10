import React from "react";
import classes from "./IconButton.module.css";

const IconButton = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.iconButton} ${props.iconCss}`}
    >
      {props.iconButton}
    </div>
  );
};

export default IconButton;
