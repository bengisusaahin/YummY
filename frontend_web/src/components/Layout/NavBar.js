import { React, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";
import Button from "./../UI/Button/Button";
import { IoIosLogOut } from "react-icons/io";
import AuthContext from "./../../store/auth-context";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const signoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <div className={classes.navBar}>
        <Link to="/">
          <img
            className={classes.logo}
            src="https://media.istockphoto.com/vectors/yummy-smile-emoticon-with-tongue-lick-mouth-tasty-food-eating-emoji-vector-id1152863150"
          />
        </Link>
        <a>YummY</a>
      </div>
      <div className={classes.signoutbar}>
        <div className={classes.signout}>
          <Button onClick={signoutHandler} buttonName="Sign Out" />
          <IoIosLogOut
            onClick={signoutHandler}
            style={{
              fontSize: "1.3rem",
              margin: "0.4rem",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
