import {Link, useNavigate} from "react-router-dom";
import "./register.scss";
import {register} from "../../redux/service/userService.jsx";
import {Field, Form, Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                            // validationSchema={Yup.object({
                            //     email: Yup.string()
                            //         .required('Required')
                            //         .matches(
                            //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|example\.com\.vn|microsoft\.com\.vn)$/,
                            //             'Invalid email format. Should end with @gmail.com, @example.com.vn, or @microsoft.com.vn'
                            //         ),
                            //     password: Yup.string()
                            //         .required('Required')
                            //         .min(8, 'Password should be at least 8 characters long')
                            //         .matches(
                            //             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                            //             'Password must meet the following criteria:\n- Requires at least one lowercase letter.\n- Requires at least one capital letter.\n- Requires at least one digit.\n- Requires at least one special character from the list.\n- Requires a minimum length of 8 characters and can contain letters, numbers, and special characters from the list'
                            //         ),
                            //     confirmPassword: Yup.string()
                            //         .required('Required')
                            //         .oneOf([Yup.ref("password")], 'Passwords must match'),
                            // })}
                            onSubmit={(values, {setSubmitting}) => {
                                handleRegister(values)
                                setSubmitting(false);
                            }}>
                            <Form>
                                <Field type="text" name="firstName" placeholder="FirstName"/>
                                <Field type="text" name="lastName" placeholder="LastName"/>
                                <Field type="email" name="email" placeholder="Email"/>
                                <Field type="password" name="password" placeholder="Password"/>
                                <Field type="password" name="confirmPassword" placeholder="confirmPasswor"/>
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
