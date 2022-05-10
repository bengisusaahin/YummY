import React, { useState, useRef } from "react";
import classes from "./ListBox.module.css";
import ListBoxItem from "./ListBoxItem.js";
import { GrAdd } from "react-icons/gr";
import { BeatLoader } from "react-spinners";

const ListBox = (props) => {
  const [clickedItem, setClickedItem] = useState("-1");

  const toBeAddedItemRef = useRef();
  const clickedItemHandler = (item) => {
    if (clickedItem === item) {
      setClickedItem("-1");
    } else {
      setClickedItem(item);

      props.clickSelectItemHandler(item, props.category);
    }
  };

  return (
    <div className={classes.box}>
      {props.isLoading ? (
        <div className={classes.loading}>
          <BeatLoader size={"1.65vw"} color={"rgba(150, 150, 150, 1)"} />
        </div>
      ) : (
        <>
          {props.category === "System" && (
            <ListBoxItem
              item={
                <div className={classes.systemAddContainer}>
                  <input
                    ref={toBeAddedItemRef}
                    placeholder="Add new system"
                  ></input>
                  <GrAdd
                    className={classes.systemAddButton}
                    onClick={() =>
                      props.addSystemClickHandler(
                        toBeAddedItemRef.current.value
                      )
                    }
                  />
                </div>
              }
            />
          )}
          {props.items.length !== 0 &&
            props.items.map((item) => (
              <ListBoxItem
                item={item}
                clickedItem={clickedItem}
                clickedItemHandler={clickedItemHandler}
                category={props.category}
              ></ListBoxItem>
            ))}
        </>
      )}
    </div>
  );
};

export default ListBox;
