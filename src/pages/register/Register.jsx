import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { register } from "../../redux/service/userService.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useState } from "react";
import logo from "../../assets/logo-blueberry.png";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleRegister = (values, setFieldError) => {
    register(values)
      .then(() => {
        toast.success(
          "Please check your email account and activate to start using!"
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        if (err.response.data.message === "Email has been used !!") {
          setFieldError("email", err.response.data.message);
        } else if (
          err.response.data.message === "Confirm password is wrong !!"
        ) {
          setFieldError("confirmPassword", err.response.data.message);
        }
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="register">
        <div className="card">
          <div className="left">
            <div className="logo">
              <img style={{ width: "150px" }} src={logo} />
            </div>
            <h1>BlueBerry</h1>
            <p>
              <h2>Inspire, Interact, Impact</h2>
            </p>
            <span>Do you have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Required")
                  .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Invalid email format!"
                  ),
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
                handleRegister(values, setFieldError);

                setSubmitting(false);
              }}
            >
              <Form>
                <Field type="text" name="firstName" placeholder="First Name" />

                <Field type="text" name="lastName" placeholder="Last Name" />

                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />

                <Field type="password" name="password" placeholder="Password" />
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
                <button type="submit">Register</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
