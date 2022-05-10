import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div
      className={`${classes.button} ${props.buttonCss} `}
      style={{
        width: props.width,
        height: props.height,
      }}
      type={props.buttonType}
      onClick={props.onClick}
    >
      {props.buttonName}
    </div>
  );
};

export default Button;
