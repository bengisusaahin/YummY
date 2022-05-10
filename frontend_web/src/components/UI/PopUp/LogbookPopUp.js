import React from "react";
import Popup from "./Popup";
import classes from "./LogbookPopUp.module.css";
const LogbookPopUp = (props) => {
  return (
    <Popup
      title={props.data.manager_action}
      message={
        <div className={classes.container}>
          <div className={classes.information}>
            {Object.keys(props.data).map((item, id) => {
              if (id < 7) {
                return (
                  <div>
                    <div className={classes.header}>
                      {item.replace("_", " ").toUpperCase()}
                    </div>
                    <div className={classes.items}>{props.data[item]}</div>
                  </div>
                );
              }
            })}
          </div>
          {props.data.user_old_role !== null && (
            <div className={classes.itemContainer}>
              <div className={classes.item}>
                <div className={classes.beforeP}>Before</div>
                <div className={classes.before}>{props.data.user_old_role}</div>
              </div>

              <div className={classes.item}>
                <div className={classes.afterP}>After</div>
                <div className={classes.after}>{props.data.user_role}</div>
              </div>
            </div>
          )}
        </div>
      }
      onConfirm={() => props.cancelOnClick()}
    />
  );
};

export default LogbookPopUp;
