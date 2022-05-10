import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import classes from "./Popup.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card cName={classes.modal}>
      <div className={classes.header}>
        <div style={{ fontWeight: "bold" }}>{props.title}</div>
        <div className={classes.closeButton}>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={props.onConfirm}
          ></button>
        </div>
      </div>
      <div
        className={classes.content}
        //if the PopUp takes "popUpPadding" prop from its child padding will be that value otherwise it will be 1 rem.
        style={{ padding: props.popUpPadding || "1rem" }}
      >
        {props.message}
      </div>
    </Card>
  );
};

const Popup = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          popUpPadding={props.popUpPadding}
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Popup;
