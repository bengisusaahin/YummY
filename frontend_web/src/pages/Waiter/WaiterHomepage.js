import React, { useState, useEffect, useCallback } from "react";
import classes from "./WaiterHomepage.module.css";
import Popup from "../../components/UI/PopUp/Popup";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Toast, { success, error } from "../../components/UI/Toast/Toaster";

const WaiterHomepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
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

  const isMenuOpenable = (tableState) => {
    if (tableState === "Empty") {
      return true;
    }
    return false;
  };
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

  const popUpCloseHandler = useCallback((e) => {
    e.preventDefault();
    setIsMenuOpened(false);
  });

  const dummyProducts = [
    {
      imgSource:
        "https://cdn.yemek.com/mnresize/940/940/uploads/2014/09/pizza-margherita-tarifi-yeni-2018.jpg",
      name: "Pizza Margarita",
      amount: 0,
      singlePrice: 58,
    },
    {
      imgSource:
        "https://www.gelgorgarisarnic.com/wp-content/uploads/2017/06/Kar%C5%9F%C4%B1k-Pizza-495x400.jpg",
      name: "Pizza Mix",
      amount: 0,
      singlePrice: 63,
    },
    {
      imgSource:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/08da4775-0745-465a-89f2-8dc457013739/Derivates/3d65af73-6d14-4a81-804f-7ef434a10275.jpg",
      name: "Pizza Chicken",
      amount: 0,
      singlePrice: 64,
    },
    {
      imgSource: "https://images.deliveryhero.io/image/fd-tr/LH/t76e-hero.jpg",
      name: "Cheeseburger",
      amount: 0,
      singlePrice: 72,
    },
    {
      imgSource:
        "https://www.livashop.com/Uploads/UrunResimleri/buyuk/fettuccine-alfredo-d78c.jpg",
      name: "Fettucini Alfredo",
      amount: 0,
      singlePrice: 57,
    },
  ];

  const [products, setProducts] = useState(dummyProducts);

  const saveOrder = async (product, tableid) => {
    try {
      await fetch("http://localhost:3002/saveOrder", {
        method: "POST",
        body: JSON.stringify({
          tableid: tableid,
          ordercontent: product.name,
          orderstate: "In Query",
          price: product.amount * product.singlePrice,
          amount: product.amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          success("You have successfully save order for table " + tableid);
          getTables();
          setIsMenuOpened(false);
        } else {
          throw new Error("Table not found!");
        }
      });
    } catch (err) {
      error(
        "An error happened when saving the order for table " +
          tableid +
          ".\nError Details: " +
          err.message
      );
    }
  };

  const setTableStateAsFull = async (tableid) => {
    try {
      await fetch("http://localhost:3002/setTableStateAsFull", {
        method: "POST",
        body: JSON.stringify({
          tableid: tableid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          success("You served to table " + tableid);
          getTables();
          setIsMenuOpened(false);
        } else {
          throw new Error("Table not found!");
        }
      });
    } catch (err) {
      error(
        "An error happened when serving the order to table " +
          tableid +
          ".\nError Details: " +
          err.message
      );
    }
  };

  return (
    <>
      <Toast />

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
        {tables.map((item, index) => {
          return (
            <div className={classes.tableOuterDiv}>
              <div
                className={classes.tableItem}
                style={{ backgroundColor: getTableColor(item.tablestate) }}
                onClick={() => {
                  setClickedTable(item.tableid);
                  if (isMenuOpenable(item.tablestate)) {
                    setIsMenuOpened(true);
                  } else if (item.tablestate === "Ready to serve") {
                    setTableStateAsFull(item.tableid);
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
        {isMenuOpened && (
          <Popup
            title={"Table " + clickedTable}
            message={
              <>
                <div className={classes.popUpContent}>
                  {products.map((product, index) => {
                    return (
                      <div className={classes.menuItem}>
                        <img src={product.imgSource} height={60} width={70} />
                        <p>{product.name}</p>
                        <div className={classes.orderDetails}>
                          <div className={classes.price}>
                            {product.amount * product.singlePrice + " TL"}
                          </div>
                          <div
                            onClick={() => {
                              let tempProducts = [...products];
                              let tempElement = product;
                              if (tempElement.amount > 0) {
                                tempElement.amount = tempElement.amount - 1;
                                tempProducts[index] = tempElement;
                                setProducts(tempProducts);
                              }
                            }}
                            className={classes.decreaseAmountButton}
                          >
                            <AiOutlineMinusCircle />
                          </div>
                          <div className={classes.productAmount}>
                            {product.amount}
                          </div>
                          <div
                            onClick={() => {
                              let tempProducts = [...products];
                              let tempElement = product;
                              tempElement.amount = tempElement.amount + 1;
                              tempProducts[index] = tempElement;
                              setProducts(tempProducts);
                            }}
                            className={classes.increaseAmountButton}
                          >
                            <AiOutlinePlusCircle />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    {
                      products.map((product, index) => {
                        if (product.amount > 0) {
                          saveOrder(product, clickedTable);
                        }
                      });
                    }
                  }}
                  className={classes.orderSaveButton}
                >
                  {" "}
                  SAVE{" "}
                </button>
              </>
            }
            onConfirm={popUpCloseHandler}
          ></Popup>
        )}
      </div>
    </>
  );
};

export default WaiterHomepage;
