import React, { useState, useEffect } from "react";
import classes from "./CashierHomepage.module.css";
import SearchBox from "./../../components/UI/Search/SearchBox";
import OrderContent from "../Chef/OrderContent/OrderContent";

const CashierHomepage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTables();
  }, []);

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

  const getTableColor = (tableState) => {
    if (tableState === "empty") {
      return "#0f9d58";
    }
    if (tableState === "full") {
      return "#babcbe";
    }
    if (tableState === "ready to serve") {
      return "#db4437";
    }
  };

  const isMenuOpenable = (tableState) => {
    if (tableState === "empty") {
      return true;
    }
    return false;
  };

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
    <>
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
        {tables.map((item) => {
          return (
            <div className={classes.tableOuterDiv}>
              <div
                className={classes.tableItem}
                style={{ backgroundColor: getTableColor(item.tablestate) }}
                onClick={() => {
                  if (isMenuOpenable(item.tablestate)) {
                    //isOrderOpenable olcak
                    setIsMenuOpened(true);
                  }
                }}
              >
                {item.tableid}
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes.billDiv}>
        <h2>
          Selected Table {props.tableid} <hr></hr>{" "}
        </h2>
        {orderData.map((item) => {
          return (
            <div>
              {item.ordercontent}
              <hr />
            </div>
          );
        })}
        <button className={classes.confirmOrder}> Confirm Order</button>
      </div>
    </>
  );
};

export default CashierHomepage;
