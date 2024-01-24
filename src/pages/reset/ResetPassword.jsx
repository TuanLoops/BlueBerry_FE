import { Link, useNavigate } from "react-router-dom";
import "./resetpassword.scss";
// import { resetPasswordRequest } from "../../redux/service/userService";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo-blueberry.png";
import { useState } from "react";
import { updatePassword } from "../../redux/service/userService";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const token = searchParams.get("token");

  const handleSubmit = async (values, setFieldError) => {
    updatePassword(token, values)
      .then((res) => {
        setMessage("");
        setMessageSuccess(
          "Password updated successfully, will automatically redirect to the login page after a few seconds");
          setTimeout(() =>{
            navigate("/login");
          },2000)
      })
      .catch((err) => {
          if (err.response.data) {
            if (err.response.data.message === "Confirm password not match!") {
              setFieldError(
                "confirmPassword",
                "Confirm password do not match!"
              );
            }
          } else {
            setMessage("Session has expired, please create a new request");
          }
      });
  };
  return (
    <>
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
            <h1>New Password</h1>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required("Required")
                  .min(8, "Password should be at least 8 characters long!")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Requires a minimum length of 8 characters and can contain at least one lowercase letter, at least one uppercase letter, at least one digit of special characters from the list (@, $, !, %, *, ?, &)!"
                  ),
                  confirmPassword: Yup.string()
                  .required("Required")
                  .oneOf(
                    [Yup.ref("password")],
                    "Confirm passwords do not match!"
                  ),
              })}
              onSubmit={(values, { setSubmitting, setFieldError }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <span>Create a new password for your account</span>
                <Field
                  type="password"
                  name="password"
                  placeholder="New password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
                {message && <div className="error-message">{message}</div>}
                {messageSuccess && <span className="success">{messageSuccess}</span>}
                <button type="submit">Save Password</button>
                <span
                  className="text-forgot-password"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back to Login
                </span>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
