import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { AiOutlineRight } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../Components";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const Signin = (props) => {
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    newpassword: "",
  };
  const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const classes = useStyles();
  const [state, setState] = useState(initialValues);
  const [getEmail, setEmail] = useState(null);
  const [isValidate, setValidate] = useState(false);
  const [showPassword, setShow] = useState(false);
  const [getPassword, setPassword] = useState(false);
  const [isUnique, setUnique] = useState(false);
  const [loginType, setLoginType] = useState("");
  // const [spinner, setSpinner] = useState(false);

  const goSignin = (login) => {
    if (login === "signin") {
      setEmail(null);
    } else if (login === "signup") {
      setValidate(false);
      setEmail(false);
    }
  };
  const checkEmail = (event) => {
    event.preventDefault();
    if (regEmail.test(state.email.trim())) {
      axios
        .get("http://localhost:9000/check-email", {
          headers: {
            email: state.email,
          },
        })
        .then((response) => {
          if (response.data) {
            if (
              response.data.loginType === "facebook" ||
              response.data.loginType === "google"
            ) {
              setLoginType(response.data.loginType);
            } else {
              console.log(response.data);
              setValidate(false);
              setEmail(true);
              setUnique(true);
              setLoginType("");
            }
          } else {
            setValidate(false);
            setEmail(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setValidate(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !regEmail.test(state.email.trim()) ||
      !state.password.trim() ||
      !state.firstName.trim() ||
      !state.lastName.trim() ||
      !regPassword.test(state.newpassword.trim())
    ) {
      setValidate(true);
    } else {
      setValidate(false);
    }
    if (getEmail === true) {
      axios
        .get("http://localhost:9000/signin", {
          headers: {
            email: state.email,
            password: state.password,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (!res.data.message) {
            setPassword(false);
            localStorage.setItem("tokens", res.data);
            props.history.push("/feeds");
          } else {
            setPassword(true);
          }
        })
        .catch((error) => {
          setPassword(true);
          console.log(error);
        });
    }
    if (
      regEmail.test(state.email.trim()) &&
      state.firstName.trim() &&
      state.lastName.trim() &&
      regPassword.test(state.newpassword.trim())
    ) {
      setUnique(false);
      const userData = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.newpassword,
        loginType: "custom",
      };
      axios
        .post("http://localhost:9000/signup", userData)
        .then((response) => {
          console.log("Data", response.data);
          if (!response.data.error) {
            localStorage.setItem("tokens", response.data.token);
            props.history.push("/feeds");
          } else {
            setUnique(true);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={getEmail === false ? "container1" : "container1-2"}>
        <img className="logo" src="Image/logo1.png" alt="img" />
        <header className="header2">
          {getEmail === false ? "Sign Up" : "Sign In"} <br />
          <span className="headerTxt">to continue to Gmail</span>
        </header>
        <TextField
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(event) =>
            setState(
              { ...state, email: event.target.value },
              setUnique(false),
              setLoginType("")
            )
          }
          error={
            (isValidate && !regEmail.test(state.email.trim()) && true) ||
            (isValidate && getEmail === false && isUnique && true) ||
            (loginType && true)
          }
          helperText={
            (isValidate &&
              !regEmail.test(state.email.trim()) &&
              "Please Enter valid email") ||
            (isValidate &&
              getEmail === false &&
              isUnique &&
              "Email Address Exist Already..!") ||
            (loginType &&
              `This user registered by ${loginType} login so use another email address. `)
          }
          disabled={getEmail === true && true}
          fullWidth={true}
        />
        {getEmail === null && (
          <button className="angularBtn" onClick={checkEmail}>
            <AiOutlineRight size="1.5rem" />
          </button>
        )}
        {getEmail === false && (
          <Fragment>
            <TextField
              name="firstName"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              error={isValidate && !state.firstName && true}
              helperText={
                isValidate && !state.firstName && "Please Enter First Name"
              }
              onChange={(event) =>
                setState({ ...state, firstName: event.target.value })
              }
              fullWidth={true}
            />
            <TextField
              name="lastName"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              error={isValidate && !state.lastName && true}
              helperText={
                isValidate && !state.lastName && "Please Enter Last Name"
              }
              onChange={(event) =>
                setState({ ...state, lastName: event.target.value })
              }
              fullWidth={true}
            />
            <TextField
              name="newpassword"
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              error={
                isValidate &&
                !regPassword.test(state.newpassword.trim()) &&
                true
              }
              helperText={
                isValidate &&
                !regPassword.test(state.newpassword.trim()) &&
                "Please Enter Password"
              }
              onChange={(event) =>
                setState({ ...state, newpassword: event.target.value })
              }
              fullWidth={true}
            />
          </Fragment>
        )}
        {getEmail === true && (
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={
              (isValidate &&
                getEmail === true &&
                state.email &&
                !state.password) ||
              (isValidate && state.email && getPassword && true)
            }
            helperText={
              (getEmail === true &&
                isValidate &&
                state.email &&
                !state.password &&
                "Please Enter Password") ||
              (getEmail === true &&
                isValidate &&
                state.email &&
                getPassword &&
                "Incorrect Password")
            }
            onChange={(event) =>
              setState(
                { ...state, password: event.target.value },
                setPassword(false)
              )
            }
            fullWidth={true}
          />
        )}
        {state.password && getEmail === true && (
          <Button
            type="button"
            className="showPassword"
            onClick={() => (showPassword ? setShow(false) : setShow(true))}
            text={showPassword ? "Hide" : "Show"}
          />
        )}
        {getEmail !== null && (
          <Button
            className="submit"
            onClick={handleSubmit}
            text="Next"
            style={
              getEmail === true && state.password.length < 5
                ? { opacity: "0.5" }
                : { opacity: "1" }
            }
          />
        )}
        {getEmail && state.email && (
          <Fragment>
            <p className="center" style={{ fontSize: "15px", color: "gray" }}>
              Don't have an account?
              <Button
                type="button"
                className="linkBtn"
                onClick={() =>
                  getEmail === false ? goSignin("signin") : goSignin("signup")
                }
                text={getEmail === false ? "Sign In" : "Sign Up"}
              />
            </p>
          </Fragment>
        )}

        {!getEmail && (
          <Fragment>
            <Button
              className="link-a"
              onClick={() => props.history.push("/")}
              text="Go to Register"
              style={{ float: "left" }}
            />
            <Button
              className="link-a"
              text="Forget Password?"
              style={{ float: "right" }}
            />
            <p style={{ marginTop: "50px" }}>
              Not your computer? Use Guest mode to sign in privately.
              <Button className="links" text="Learn more" />
            </p>
          </Fragment>
        )}
      </div>
    </form>
  );
};
export default Signin;
