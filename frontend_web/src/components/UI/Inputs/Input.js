import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  document.documentElement.style.setProperty("--height", `${props.height}vh`);

  return (
    <div className={classes.input__div}>
      <input
        type={props.type}
        id={props.label}
        className={classes.form__input}
        autoComplete="off"
        placeholder=" "
        onChange={props.onChange}
        ref={props.Iref}
        style={{ borderColor: props.Icolor }}
      />
      <label
        htmlFor={props.label}
        className={classes.form__label}
        style={{ color: props.Icolor }}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
