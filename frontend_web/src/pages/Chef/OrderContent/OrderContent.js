import React, { useState, useEffect } from "react";
import classes from "./OrderContent.module.css";
import Toast, { success, error } from "../../../components/UI/Toast/Toaster";

const OrderContent = (props) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getOrderDetails();
    const interval = setInterval(() => {
      getOrderDetails();
    }, 20000);
    return () => clearInterval(interval);
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
  const readyButtonHandler = async (tableid) => {
    try {
      await fetch(`http://localhost:3002/tableOrderReady`, {
        method: "POST",
        body: JSON.stringify({
          tableid: tableid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsVisible(false);
      success(
        "Ready order info sent to waiters for table " +
          tableid +
          " successfully."
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Toast />
      {!loading && isVisible && (
        <div className={classes.billDiv}>
          <h2>
            Table {props.tableid} <hr></hr>{" "}
          </h2>
          {orderData.map((item) => {
            return (
              <>
                <div className={classes.orderDetails}>
                  <div className={classes.orderName}>{item.ordercontent}</div>
                  <div className={classes.orderAmount}>x{item.amount}</div>
                </div>
                <hr />
              </>
            );
          })}

          <button
            onClick={() => readyButtonHandler(props.tableid)}
            className={classes.readyButton}
          >
            {" "}
            Ready !
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderContent;
