import React from "react";
import classes from "./TableHeader.module.css";

const TableHeader = (props) => {
  return (
    <div className={`${classes.header} row`}>
      {props.headerData.map((row, i) => {
        return (
          <div key={i} className={`col-${props.rowLength[i]} ${classes.text} `}>
            {row.name}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
