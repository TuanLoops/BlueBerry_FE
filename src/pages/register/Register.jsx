import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { register } from "../../redux/service/userService.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { useState } from "react";
import logo from '../../../public/logo-blueberry.png'


const Register = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const handleRegister = (values) => {
        register(values).then(() => {
            toast.success("Vui lòng kiểm khoản email và kích hoạt để bắt đầu sử dụng")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }).catch((err) => {
            setMessage(err.response.data.message)
        })
    }

    return (
        <>
            <ToastContainer
                position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop={false}
                closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
            />
            <div className="register">
                <div className="card">
                    <div className="left">
                        <div className="logo">
                            <img style={{width: "150px"}} src={logo}/>
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
                                    .required('Required')
                                    .matches(
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|example\.com\.vn|microsoft\.com\.vn)$/,
                                        'Định dạng email không hợp lệ. Nên kết thúc bằng @gmail.com, @example.com.vn hoặc @microsoft.com.vn'
                                    ),
                                password: Yup.string()
                                    .required('Required')
                                    .min(8, 'Password should be at least 8 characters long')
                                    .matches(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                                        'Yêu cầu độ dài tối thiểu 8 ký tự và có thể chứa ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một chữ số ký tự đặc biệt từ danh sách (@, $, !, %, *, ?, &)'
                                    ),
                                confirmPassword: Yup.string()
                                    .required('Required')
                                    .oneOf([Yup.ref("password")], 'mật khẩu phải trùng khớp'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                handleRegister(values)
                                setSubmitting(false);
                            }}>
                            <Form>
                                <Field type="text" name="firstName" placeholder="First Name" />

                                <Field type="text" name="lastName" placeholder="Last Name" />

                                <Field type="email" name="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                                {message && message === "Email has been used" ? <div className="error-message">{message}</div> : ""}

                                <Field type="password" name="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error-message" />

                                <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                <button type="submit">Register</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
