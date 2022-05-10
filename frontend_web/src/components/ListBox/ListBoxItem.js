import React, { useState } from "react";
import classes from "./ListBoxItem.module.css";
import IconButton from "../../components/UI/IconButton/IconButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationPopUp from "../UI/PopUp/ConfirmationPopUp";
import { AiOutlineArrowRight } from "react-icons/ai";

const ListBoxItem = (props) => {
  const [isDeletePopUpOpened, setIsDeletePopUpOpened] = useState(false);

  return (
    <>
      {isDeletePopUpOpened && (
        <ConfirmationPopUp
          cancelOnClick={() => {
            setIsDeletePopUpOpened(false);
          }}
          approveOnClick={() => {
            // deleteUserHandler(toBeDeletedItem);
          }}
          text={
            <div className={classes.deleteSystemPopUp}>
              <p>
                Do you approve deleting the System that name is{" "}
                <b>{props.item.name}</b>. Lorem ipsum dolor sit amet,
                consectetur adipiscing Lorem ipsum dolor sit amet, consectetur
                adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
                Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
                amet, consectetur adipiscing Lorem ipsum dolor sit amet,
                consectetur adipiscing Lorem ipsum dolor sit amet, consectetur
                adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
                Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
                amet, consectetur adipiscing Lorem ipsum dolor sit amet,
                consectetur adipiscing Lorem ipsum dolor sit amet, consectetur
                adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
            </div>
          }
          confirmationBoxText={"I read and agree the responsible"}
          title={"Delete System"}
        />
      )}
      {props.item.id !== undefined ? (
        <div
          className={classes.item}
          onClick={(e) => {
            e.stopPropagation();
            props.clickedItemHandler(props.item);
          }}
          style={
            props.clickedItem.id === props.item.id &&
            props.clickedItem.id !== undefined
              ? { backgroundColor: "rgb(210, 210, 210)" }
              : {}
          }
        >
          {props.item.name}
          {props.category === "System" ? (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsDeletePopUpOpened(true);
              }}
              iconCss={classes.deleteIcon}
              iconButton={<RiDeleteBin6Line />}
            />
          ) : (
            <AiOutlineArrowRight />
          )}
        </div>
      ) : (
        props.item
      )}
    </>
  );
};

export default ListBoxItem;
