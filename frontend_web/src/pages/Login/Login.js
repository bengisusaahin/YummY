import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Login.module.css";
import Input from "../../components/UI/Inputs/Input";
import { RiErrorWarningFill } from "react-icons/ri";

const Login = (props) => {
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (nameInputRef.current.value === "") {
      setIsNameEmpty(true);
      nameInputRef.current.focus();
      return;
    } else {
      setIsNameEmpty(false);
    }
    if (passwordInputRef.current.value === "") {
      setIsPasswordEmpty(true);
      passwordInputRef.current.focus();
      return;
    } else {
      setIsPasswordEmpty(false);
    }

    setIsLoading(true);

    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //databasedeki isimleriyle almalisin sol tarafi
        username: nameInputRef.current.value,
        //user_action: "Login",
        encryptedPassword: passwordInputRef.current.value,
      }),
    }).then((res) => {
      setIsLoading(false);

      if (res.status === 200) {
        res.text().then((item) => {
          //error fixed res.json to res.text but I don't think this is true.
          const expirationTime = new Date(new Date().getTime() + 36000 * 1000);
          authCtx.login(item.accessToken, expirationTime.toISOString());
          //localStorage.setItem("username", enteredName);
          localStorage.setItem("username", item.username);
        });
      } else {
        return Promise.reject("server");
      }
    });
  };

  return (
    <div className={classes.body}>
      <section className={classes.auth}>
        <img
          src="https://media.istockphoto.com/vectors/yummy-smile-emoticon-with-tongue-lick-mouth-tasty-food-eating-emoji-vector-id1152863150"
          width="40%"
        />
        <h1>{"YummY"}</h1>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            label="Username"
            onChange={() => {
              setIsNameEmpty(false);
            }}
            Icolor={isNameEmpty ? "red" : ""}
            Iref={nameInputRef}
            height="8.2"
          />
          {isNameEmpty && (
            <div className={classes.error}>
              <RiErrorWarningFill style={{ marginBottom: "0.2rem" }} />
              <span>Please enter the username</span>
            </div>
          )}
          <Input
            type="password"
            label="Password"
            onChange={() => {
              setIsPasswordEmpty(false);
            }}
            //isTrue={isPasswordEmpty}
            Icolor={isPasswordEmpty ? "red" : ""}
            Iref={passwordInputRef}
            height="8.2"
          />
          {isPasswordEmpty && (
            <div className={classes.error}>
              <RiErrorWarningFill style={{ marginBottom: "0.2rem" }} />
              <span>Please enter the username</span>
            </div>
          )}
          {!isLoading && (
            <button className="btn btn-primary w-100 mt-3 shadow-none">
              Sign In
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default Login;
