import React, { useState, useEffect } from "react";
import OrderContent from "./OrderContent/OrderContent";
import classes from "./ChefHomepage.module.css";
const ChefHomepage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3002/getOrderedTables");
    const data = await response.json();
    setOrders(data);
    setLoading(false);
  };

  return (
    <div className={classes.orders}>
      {orders.map((order) => {
        return (
          <div className={classes.ordersOuterDiv}>
            <OrderContent tableid={order.tableid} />
          </div>
        );
      })}
    </div>
  );
};

export default ChefHomepage;
