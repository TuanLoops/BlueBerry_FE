import {Link} from "react-router-dom";
import "./login.scss";
import {useDispatch} from "react-redux";
import {login} from "../../redux/service/userService.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const Login = () => {
    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        await dispatch(login(values));
        window.location.href="/"
    }
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
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
                                    'Yêu cầu độ dài tối thiểu 8 ký tự và có thể chứa ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một chữ số ký tự đặc biệt từ danh sách (@, $, !, %, *, ?, &)')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            handleLogin(values)
                            setSubmitting(false)
                        }}
                    >
                        <Form>
                            <Field type="email" name="email" autoComplete="email" placeholder="Email"/>
                            <ErrorMessage name="email" component="div" className="error-message"/>
                            <Field type="password" name="password" autoComplete="password" placeholder="Password"/>
                            <ErrorMessage name="password" component="div" className="error-message"/>
                            <button type="submit">SignIn</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
