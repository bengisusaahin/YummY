import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Login.module.css";
import Input from "../../components/UI/Inputs/Input";
import { RiErrorWarningFill } from "react-icons/ri";

const Login = (props) => {
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isidEmpty, setIsidEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredId = idInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (idInputRef.current.value === "") {
      setIsidEmpty(true);
      idInputRef.current.focus();
      return;
    } else {
      setIsidEmpty(false);
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
      body: JSON.stringify({
        user_id: enteredId,
        user_action: "Login",
        user_password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);

      if (res.status === 200) {
        res.json().then((item) => {
          const expirationTime = new Date(new Date().getTime() + 36000 * 1000);
          authCtx.login(item.accessToken, expirationTime.toISOString());
          localStorage.setItem("user_id", enteredId);
          localStorage.setItem("user_name", item.user_name);
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
          src="https://tirsan.imgix.net/media/images/toDelete/logo.png"
          width="100%"
        />
        <h1>{"Tırsan Logistic Library"}</h1>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            label="Username"
            onChange={() => {
              setIsidEmpty(false);
            }}
            Icolor={isidEmpty ? "red" : ""}
            Iref={idInputRef}
            height="8.2"
          />
          {isidEmpty && (
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
