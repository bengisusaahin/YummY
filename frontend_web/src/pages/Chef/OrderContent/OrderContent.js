import React, { useState, useEffect } from "react";
import classes from "./OrderContent.module.css";
const OrderContent = (props) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3002/getSpecificOrder/${props.tableid}`
      );
      const data = await response.json();

      setOrderData(data);

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {!loading && (
        <div className={classes.billDiv}>
          <h2>
            Table {props.tableid} <hr></hr>{" "}
          </h2>
          {orderData.map((item) => {
            return (
              <div className={classes.orderData}>
                {item.ordercontent}
                <hr />
              </div>
            );
          })}

          <button className={classes.readyButton}> Ready !</button>
        </div>
      )}
    </div>
  );
};

export default OrderContent;
