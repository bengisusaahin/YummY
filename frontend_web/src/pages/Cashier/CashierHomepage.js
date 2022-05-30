import React, { useState, useEffect } from "react";
import classes from "./CashierHomepage.module.css";
import SearchBox from "./../../components/UI/Search/SearchBox";
import Toast, { success, error } from "../../components/UI/Toast/Toaster";

const CashierHomepage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [clickedTable, setClickedTable] = useState();

  const getTables = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/getTables`);
      const data = await response.json();
      setTables(data);

      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTables();
    const interval = setInterval(() => {
      getTables();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const getTableColor = (tableState) => {
    if (tableState === "Empty") {
      return "#0f9d58";
    }
    if (tableState === "Full") {
      return "#babcbe";
    }
    if (tableState === "Ready to serve") {
      return "#db4437";
    }
  };

  const isTableOpenable = (tableState) => {
    if (tableState === "Full") {
      return true;
    }
    return false;
  };

  const getOrderDetails = async (clickedTable) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3002/getSpecificOrder/${clickedTable}`
      );
      const data = await response.json();

      setOrderData(data);

      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const confirmOrderHandler = async (clickedTable) => {
    try {
      await fetch(`http://localhost:3002/confirmOrder`, {
        method: "POST",
        body: JSON.stringify({
          tableid: clickedTable,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      success("Payment getted from " + clickedTable + " successfully.");
      getTables();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Toast />

      <div className={classes.mainDiv}>
        <div className={classes.leftDiv}>
          <div className={classes.tablesKnowledge}>
            <div className={classes.empty}></div>
            <div className={classes.e}>Empty Tables</div>
            <div className={classes.nonEmpty}></div>
            <div className={classes.n}>Non-Empty Tables</div>
            <div className={classes.serve}></div>
            <div className={classes.r}>Ready to Serve Tables</div>
          </div>
          <div className={classes.searchContainer}>
            <SearchBox search="Search Table" />
          </div>
          <div className={classes.tables}>
            {tables.map((item, index) => {
              return (
                <div className={classes.tableOuterDiv}>
                  <div
                    className={classes.tableItem}
                    style={{ backgroundColor: getTableColor(item.tablestate) }}
                    onClick={() => {
                      if (isTableOpenable(item.tablestate)) {
                        getOrderDetails(item.tableid);
                        setClickedTable(item.tableid);
                      }
                    }}
                  >
                    {item.tableid}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={classes.rightDiv}>
          <h2>
            Selected Table {clickedTable} <hr></hr>{" "}
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
            onClick={() => confirmOrderHandler(clickedTable)}
            className={classes.confirmOrder}
          >
            {" "}
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CashierHomepage;
