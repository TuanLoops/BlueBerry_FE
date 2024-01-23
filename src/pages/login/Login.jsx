import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/service/userService.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from '../../../public/logo-blueberry.png'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await dispatch(login(values)).unwrap();
      navigate("/");
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.message);
      if (err.response.request.status === 403) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Sai tài khoản hoặc mật khẩu")
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
            <h1>Login</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Required")
                  .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|example\.com\.vn|microsoft\.com\.vn)$/,
                    "Định dạng email không hợp lệ. Nên kết thúc bằng @gmail.com, @example.com.vn hoặc @microsoft.com.vn"
                  ),
                password: Yup.string()
                  .required("Required")
                  .min(8, "Password should be at least 8 characters long")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Yêu cầu độ dài tối thiểu 8 ký tự và có thể chứa ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một chữ số ký tự đặc biệt từ danh sách (@, $, !, %, *, ?, &)"
                  ),
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
                {message
                  ? message && <div className="error-message">{message}</div>
                  : ""}
                <button type="submit">SignIn</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;