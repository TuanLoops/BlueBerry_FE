import {Link, useNavigate} from "react-router-dom";
import "./login.scss";
import {useDispatch} from "react-redux";
import {login} from "../../redux/service/userService.jsx";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        dispatch(login(values)).then(()=>{
            navigate("/")
        })
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
                                    'Invalid email format. Should end with @gmail.com, @example.com.vn, or @microsoft.com.vn'
                                ),
                            password: Yup.string()
                                .required('Required')
                                .min(8, 'Password should be at least 8 characters long')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                                    'Password must meet the following criteria:\n- Requires at least one lowercase letter.\n- Requires at least one capital letter.\n- Requires at least one digit.\n- Requires at least one special character from the list.\n- Requires a minimum length of 8 characters and can contain letters, numbers, and special characters from the list'
                                )
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            handleLogin(values)
                            setSubmitting(false)
                        }}
                    >
                        <Form>
                            <Field type="email" name="email"  autoComplete="email" placeholder="Email" />
                            <Field type="password" name="password" autoComplete="password" placeholder="Password"/>
                            <button type="submit">SignIn</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
