import React from "react";
import classes from "./TableRow.module.css";

const TableRow = (props) => {
  const indexMinus = props.indexMinus || 0;
  const clickedHandler = (e) => {
    e.stopPropagation();
    props.clickedIdHandler(props.rowData.id);
  };

  return (
    <>
      <div
        className={`${classes.item}  ${props.tableCss} row `}
        onClick={clickedHandler}
        style={
          props.clickedId === props.rowData.id && props.clickedId !== undefined
            ? { backgroundColor: "rgb(210, 210, 210)" }
            : {}
        }
      >
        {Object.keys(props.rowData).map((id, index) => {
          if (!(id === "id" || id === "subId" || id === "hasSubRow")) {
            return (
              <div
                key={Math.random()}
                className={`col-${props.rowLength[index - indexMinus]} p-0 ${
                  classes.text
                }`}
              >
                {props.rowData[id]}
              </div>
            );
          }
        })}
      </div>
      {props.rowData.hasSubRow && props.clickedId === props.rowData.id && (
        <>
          {props.subRowData.map((subrow) => (
            <>
              {props.rowData["id"] === subrow.id && (
                <TableRow
                  indexMinus={props.indexMinus}
                  key={Math.random()}
                  rowData={subrow}
                  rowLength={props.rowLength}
                  clickedId={props.clickedId}
                  tableCss={classes.subRow}
                />
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default TableRow;
