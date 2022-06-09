import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Input from "../../components/UI/Inputs/Input";
import { RiErrorWarningFill } from "react-icons/ri";
import Toast, { success, error } from "../../components/UI/Toast/Toaster";

const Login = (props) => {
  let navigate = useNavigate();
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
        useremail: nameInputRef.current.value,
        encryptedPassword: passwordInputRef.current.value,
      }),
    }).then((res) => {
      setIsLoading(false);

      if (res.status === 200) {
        res.text().then((item) => {
          success("Login success");
          navigate("/", { replace: true });
          //error fixed res.json to res.text but I don't think this is true.
          const expirationTime = new Date(new Date().getTime() + 36000 * 1000);
          authCtx.login(item.accessToken, expirationTime.toISOString());
          //localStorage.setItem("useremail", enteredName);
          localStorage.setItem("useremail", nameInputRef.current.value);
        });
      } else {
        error("Login failed");
        return Promise.reject("server");
      }
    });
  };

  return (
    <>
      <Toast />
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
              label="E-mail"
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
                <span>Please enter your e-mail</span>
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
                <span>Please enter your e-mail</span>
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
    </>
  );
};

export default Login;
