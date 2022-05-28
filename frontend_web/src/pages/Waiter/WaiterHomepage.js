import React, { useState, useEffect, useCallback } from "react";
import classes from "./WaiterHomepage.module.css";
import Popup from "../../components/UI/PopUp/Popup";

const WaiterHomepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

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

  const isMenuOpenable = (tableState) => {
    if (tableState === "empty") {
      return true;
    }
    return false;
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

  const popUpCloseHandler = useCallback((e) => {
    e.preventDefault();
    setIsMenuOpened(false);
  });

  return (
    <>
      <div className={classes.tablesKnowledge}>
        <div className={classes.empty}></div>
        <div>Empty Tables</div>
        <div className={classes.nonEmpty}></div>
        <div>Non-Empty Tables</div>
        <div className={classes.serve}></div>
        <div>Ready to Serve Tables</div>
      </div>
      <br />
      <div className={classes.tables}>
        {tables.map((item) => {
          return (
            <div className={classes.tableOuterDiv}>
              <div
                className={classes.tableItem}
                style={{ backgroundColor: getTableColor(item.tablestate) }}
                onClick={() => {
                  if (isMenuOpenable(item.tablestate)) {
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
      <div>
        {isMenuOpened &&
          (console.log("jhaslkdjhaskjdh"),
          (
            <Popup
              title="Add User"
              message={
                <>
                  <p>denemeeee</p>
                </>
              }
              onConfirm={popUpCloseHandler}
            ></Popup>
          ))}
      </div>
    </>
  );
};

export default WaiterHomepage;
