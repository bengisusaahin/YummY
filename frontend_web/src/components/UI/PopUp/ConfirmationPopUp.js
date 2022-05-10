import React, { useState } from "react";
import Popup from "./Popup";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import classes from "./ConfirmationPopUp.module.css";
import Button from "../../../components/UI/Button/Button";

const ConfirmationPopUp = (props) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const checkBoxHandler = () => {
    setIsConfirm(!isConfirm);
  };

  return (
    <Popup
      title={props.title}
      popUpPadding="40px 60px 40px 60px"
      message={
        <>
          <div>
            <AiOutlineQuestionCircle
              style={{
                color: "#dc3545",
                fontSize: "4rem",
              }}
            />
          </div>
          <div>
            <h3>Do you apply?</h3>
          </div>
          <div
            style={{
              marginTop: "15px",
              padding: "5px",
            }}
          >
            {props.text}
          </div>
          <div className={classes.checkBoxDiv} onClick={checkBoxHandler}>
            <input
              type="checkbox"
              className={classes.checkBox}
              checked={isConfirm}
            />
            {props.confirmationBoxText}
          </div>
          <div className={classes.deletePopUpButtons}>
            {isConfirm && (
              <Button
                buttonName="Apply"
                width="90px"
                height="35px"
                buttonCss={classes.deleteButtonCss}
                onClick={(e) => {
                  props.approveOnClick();
                }}
              />
            )}
            <Button
              buttonName="Cancel"
              width="90px"
              height="35px"
              buttonCss={classes.cancelButtonCss}
              onClick={(e) => {
                props.cancelOnClick();
              }}
            />
          </div>
        </>
      }
      onConfirm={() => props.cancelOnClick()}
    />
  );
};

export default ConfirmationPopUp;
