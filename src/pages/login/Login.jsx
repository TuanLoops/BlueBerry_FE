import { Link } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import { login, forgotPassword } from "../../redux/service/userService.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../../assets/logo-blueberry.png";
import { set } from "date-fns";

const Login = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  let [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modelForgot,setModelForgot] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await dispatch(login(values)).unwrap();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response.request.status === 403) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Sai tài khoản hoặc mật khẩu");
      }
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleForgotPassword = async(values) => {
    setLoading(true);
    forgotPassword(values.email)
      .then((result) => {
        setMessage("")
        setMessageSuccess("Your request has been sent successfully, please check your email");
      })
      .catch((err) => {
        setMessage(err.response.data ? err.response.data.message: "Server error");
      });
      setLoading(false)
  };
  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%", display: loading ? "block" : "none" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ) : (
        ""
      )}
      <div className="login">
        <div className="card">
          <div className="left">
            <h2>Welcome to</h2>
            <div className="brand-container">
              <img src={logo}></img>
              <span>BlueBerry</span>
            </div>

            <h2>Crafting Connections</h2>
            <h2>Creating Conversations</h2>
            <span>Don't you have an account?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
          <div className="right">
            {modelForgot ? (
              <>
                <h1>Forgot Password</h1>
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .required("Required!")
                      .matches(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "Invalid email format!"
                      ),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleForgotPassword(values);
                    setSubmitting(false);
                  }}
                >
                  <Form>
                    <span>Please enter the email of the account whose password was forgotten</span>
                    <Field
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                    {message && <div className="error-message">{message}</div>}
                    {messageSuccess && <span>{messageSuccess}</span>}
                    <button type="submit">Recover Password</button>
                    <span
                      className="text-forgot-password"
                      onClick={() => {
                      setModelForgot(false);
                        setMessage("");
                      }}
                    >
                      Back to Login
                    </span>
                  </Form>
                </Formik>
              </>
            ) : (
              <>
                <h1>Login</h1>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .required("Required!")
                      .matches(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "Invalid email format!"
                      ),
                    password: Yup.string()
                      .required("Required")
                      .min(8, "Password should be at least 8 characters long!"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleLogin(values);
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  <Form>
                    <Field
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                    <Field
                      type="password"
                      name="password"
                      autoComplete="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                    {message && <div className="error-message">{message}</div>}
                    <span
                      className="text-forgot-password"
                      onClick={() => {
                      setModelForgot(true);
                        setMessage("");
                        setMessageSuccess("")
                      }}
                    >
                      Forgot Password
                    </span>
                    <button type="submit">SignIn</button>
                  </Form>
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
