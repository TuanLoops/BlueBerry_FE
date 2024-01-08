import {Link, useNavigate} from "react-router-dom";
import "./register.scss";
import {register} from "../../redux/service/userService.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const Register = () => {
    const navigate = useNavigate();
    const handleRegister = (values) => {

        register(values).then(() => {
            navigate("/login")
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
                        <h1>Lama Social.</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                            alias totam numquam ipsa exercitationem dignissimos, error nam,
                            consequatur.
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
                            onSubmit={(values, {setSubmitting}) => {
                                handleRegister(values)
                                setSubmitting(false);
                            }}>
                            <Form>
                                <Field type="text" name="firstName" placeholder="FirstName"/>

                                <Field type="text" name="lastName" placeholder="LastName"/>

                                <Field type="email" name="email" placeholder="Email"/>
                                <ErrorMessage name="email" component="div" className="error-message"/>

                                <Field type="password" name="password" placeholder="Password"/>
                                <ErrorMessage name="password" component="div" className="error-message"/>

                                <Field type="password" name="confirmPassword" placeholder="confirmPasswor"/>
                                <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
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
