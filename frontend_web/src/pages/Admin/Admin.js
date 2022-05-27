import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/UI/Table/Table";
import classes from "./Admin.module.css";
import Select from "../../components/UI/Inputs/Select";
import SearchBox from "../../components/UI/Search/SearchBox";
import Popup from "../../components/UI/PopUp/Popup";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "../../components/UI/IconButton/IconButton";
import Toast, { success, error } from "../../components/UI/Toast/Toaster";
import ConfirmationPopUp from "../../components/UI/PopUp/ConfirmationPopUp";
const Admin = () => {
  const roles = ["Admin", "Waiter", "Cashier", "Chef"];
  const rowLength = [1, 2, 3, 2, 3, 1];
  const rowLengthPopUp = [3, 4, 4, 1];
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [ldapUsers, setLdapUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [isDeletePopUpOpened, setIsDeletePopUpOpened] = useState(false);
  const [toBeDeletedItem, settoBeDeletedItem] = useState();
  const [isRoleChangePopUpOpened, setIsRoleChangePopUpOpened] = useState(false);
  const [userToChangeRole, setUserToChangeRole] = useState({});
  const [userRoleToBeChanged, setUserRoleToBeChanged] = useState(null);

  const [generatedPassword, setGeneratedPassword] = useState("");

  const onSearchValueChanged = (value) => {
    setSearchValue(value);
  };
  const popUpHandler = (e) => {
    e.preventDefault();
    setIsInfoOpened(true);
    fetchingPopUp();
  };
  const popUpCloseHandler = useCallback((e) => {
    e.preventDefault();
    setIsInfoOpened(false);
    setLdapUsers([]);
    setSearchValue("");
  });

  const headerData = [
    {
      name: "User ID",
      col: rowLength[0],
    },
    {
      name: "User Name",
      col: rowLength[1],
    },
    {
      name: "User Email",
      col: rowLength[2],
    },
    {
      name: "User Role",
      col: rowLength[3],
    },
    {
      name: "Encrypted Password",
      col: rowLength[4],
    },
  ];
  // const headerDataPopUp = [
  //   {
  //     name: "User ID",
  //     col: rowLength[0],
  //   },
  //   {
  //     name: "Name",
  //     col: rowLength[1],
  //   },
  //   {
  //     name: "Title",
  //     col: rowLength[2],
  //   },
  // ];

  headerData[5] = {
    name: (
      <IconButton iconButton={<AiOutlineUserAdd />} onClick={popUpHandler} />
    ),
    col: rowLength[4],
  };
  const fetchingPopUp = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3002/ldap_users");
    const data = await response.json();
    const newDatas = [];
    data.map((data) =>
      newDatas.push({
        userid: data.userid,
        name: data.userName,
        title: data.user_title,

        button: (
          <IconButton
            iconCss={classes.iconCss}
            iconButton={<AiOutlinePlusCircle />}
          />
        ),
      })
    );
    setLdapUsers(newDatas);
    setLoading(false);
  };

  const fetching = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3002/getUsers");
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetching();
  }, []);

  const deletePopUpHandler = (item) => {
    settoBeDeletedItem(item);
    setIsDeletePopUpOpened(true);
  };

  const deleteUserHandler = async (data) => {
    setIsDeletePopUpOpened(false);
    try {
      const deleteUser = await fetch(
        `http://localhost:3002/userDelete/${data.userid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: data.userid,
            userName: data.userName,
            userRole: data.userRole,
            manager_name: localStorage.getItem("userName"),
            manager_id: localStorage.getItem("userid"),
          }),
        }
      ).then((response) => {
        if (response.statusText.includes("OK")) {
          setUsers(users.filter((item) => item.userid !== data.userid));

          success("You have successfully deleted user " + data.userName);
        } else {
          throw new Error("User not found!");
        }
      });
    } catch (err) {
      setIsDeletePopUpOpened(false);
      error(
        "An error happened when deleting that user.\nError Details: " +
          err.message
      );
    }
  };

  const userUpdate = async (data) => {
    try {
      await fetch("http://localhost:3002/update_role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: data.userid,
          userName: data.userName,
          userRole: userRoleToBeChanged,
          user_old_role: data.userRole,
        }),
      });
      setIsRoleChangePopUpOpened(false);
      success(
        "You have successfully changed user " +
          data.userid +
          "'s userRole to " +
          userRoleToBeChanged
      );
      setUsers([
        ...users.slice(0, users.indexOf(data)),
        { ...data, userRole: userRoleToBeChanged },
        ...users.slice(users.indexOf(data) + 1),
      ]);
    } catch (err) {
      setIsRoleChangePopUpOpened(false);
      error(
        "An error happened when changing user " + data.userid + "'s userRole"
      );

      console.log(err.message);
    }
  };
  const changeRoleHandler = (data) => {
    if (data !== undefined) {
      userUpdate(data);
    }
  };
  const changeRoleSelectHandler = (userRole) => {
    setUserRoleToBeChanged(userRole);
  };

  const label = (labelName) => {
    return <div className={classes.label}>{labelName}</div>;
  };

  const [isGenPasswordClickable, setIsGenPasswordClickabe] = useState(true);
  const generatePasswordClickHandler = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setGeneratedPassword(password);
    setIsGenPasswordClickabe(false);
  };

  return (
    <div className={classes.container}>
      <Toast />
      <div className={classes.searchBoxContainer}>
        <SearchBox
          onSearchValueChanged={onSearchValueChanged}
          search="Search"
        />
      </div>
      <Table
        isLoading={loading}
        headerData={headerData}
        rowData={users
          .filter(
            (data) =>
              (data.userid + "").includes(searchValue) ||
              data.userName.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((data) => ({
            userid: data.userid,
            name: data.userName,
            email: data.userEmail,
            userRole: (
              <Select
                onClick={(e) => {
                  e.stopPropagation();
                }}
                selectChangeHandler={changeRoleSelectHandler}
                id={data.userid}
                data={roles}
                onChange={() => {
                  setUserToChangeRole(data);
                  setIsRoleChangePopUpOpened(true);
                }}
                dValue={
                  data.userid === userToChangeRole.userid
                    ? userRoleToBeChanged
                    : data.userRole
                }
                cSelect={classes.select}
              />
            ),
            encryptedPassword: data.encryptedPassword,
            button: (
              <IconButton
                onClick={() => deletePopUpHandler(data)}
                iconCss={classes.iconCss}
                iconButton={<RiDeleteBin6Line />}
              />
            ),
          }))}
        tableCss={classes.item}
        rowLength={rowLength}
        size={{ height: "66.8vh", width: "70vw" }}
      />

      {isDeletePopUpOpened && (
        <ConfirmationPopUp
          cancelOnClick={() => {
            setIsDeletePopUpOpened(false);
          }}
          approveOnClick={() => {
            deleteUserHandler(toBeDeletedItem);
          }}
          text={
            <p>
              {`Do you approve deleting user ${toBeDeletedItem.userName} with id ${toBeDeletedItem.userid}?`}
            </p>
          }
          confirmationBoxText={"I read and agree the responsible"}
          title={"Delete User"}
        />
      )}

      {isRoleChangePopUpOpened && (
        <ConfirmationPopUp
          cancelOnClick={() => {
            setIsRoleChangePopUpOpened(false);
            setUserToChangeRole({});
          }}
          approveOnClick={() => {
            changeRoleHandler(userToChangeRole);
          }}
          text={
            <p>
              {`Do you approve changing userRole for user ${userToChangeRole.userName}`}
              ?
            </p>
          }
          confirmationBoxText={"I read and agree the responsible"}
          title={"Update Role"}
        />
      )}

      <div>
        {isInfoOpened && (
          <Popup
            title="Add User"
            message={
              <>
                <div>
                  {label("User Name:")}
                  <input
                    className={classes.input}
                    type="text"
                    id="FeatureInput"
                    placeholder="User Name"
                  />

                  {label("User E-mail:")}
                  <input
                    className={classes.input}
                    type="text"
                    id="FeatureInput"
                    placeholder="User E-mail"
                  />

                  {label("User Role:")}
                  <input
                    className={classes.input}
                    type="text"
                    id="FeatureInput"
                    placeholder="User Role"
                  />
                  <div className={classes.passwordDivGroup}>
                    <div className={classes.passwordArea}>
                      {generatedPassword}
                    </div>
                    <button
                      onClick={
                        isGenPasswordClickable && generatePasswordClickHandler
                      }
                    >
                      {" "}
                      Generate Password
                    </button>

                    <button onClick={() => setIsInfoOpened(false)}>
                      {" "}
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            }
            onConfirm={popUpCloseHandler}
          ></Popup>
        )}
      </div>
    </div>
  );
};
export default Admin;
