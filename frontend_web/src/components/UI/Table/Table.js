import React, { useState, useCallback } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import classes from "./Table.module.css";
import { BeatLoader } from "react-spinners";

const Table = (props) => {
  const [clickedId, setclickedId] = useState("-1");
  const clickedIdHandler = (id) => {
    if (clickedId === id) {
      setclickedId("-1");
    } else {
      setclickedId(id);
    }
  };
  return (
    <div className={classes.container} style={{ width: props.size.width }}>
      <TableHeader headerData={props.headerData} rowLength={props.rowLength} />
      <div
        className={classes.rowContainer}
        style={{
          transition: "box-shadow 0.3s",
          height: props.size.height,
          width: props.size.width,
        }}
      >
        {props.isLoading ? (
          <div className={classes.loading}>
            <BeatLoader size={20} color={"rgba(150, 150, 150, 1)"} />
          </div>
        ) : (
          props.rowData.map((row) => (
            <div key={Math.random()}>
              <TableRow
                indexMinus={props.indexMinus}
                key={Math.random()}
                rowData={row}
                clickedId={clickedId}
                clickedIdHandler={clickedIdHandler}
                subRowData={props.subRowData}
                rowLength={props.rowLength}
                tableCss={props.tableCss}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
