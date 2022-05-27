import React from "react";
import classes from "./OrderContent.module.css";
const OrderContent = (props) => {
  return (
    <div>
      <div className={classes.billDiv}>
        <h2>
          Table {props.tableNo} <hr></hr>{" "}
        </h2>
      </div>
    </div>
  );
};

export default OrderContent;
