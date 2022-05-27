import React from "react";
import OrderContent from "./OrderContent/OrderContent";
import classes from "./ChefHomepage.module.css";
const ChefHomepage = () => {
  return (
    <div className={classes.orders}>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="1" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="2" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="3" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="4" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="5" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="6" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="7" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="1" />
      </div>
      <div className={classes.ordersOuterDiv}>
        {" "}
        <OrderContent tableNo="1" />
      </div>
    </div>
  );
};

export default ChefHomepage;
