import {useEffect, useState} from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import './confirmAccount.scss'
import {useNavigate, useSearchParams} from "react-router-dom";

export const ConfirmAccount = () => {
    const [searchParam] = useSearchParams()
    const token = searchParam.get('token')
    const [active, setActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.get(`http://localhost:8080/users/api/auth/register/confirm?token=${token}`);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetch().then(() => {
                setActive(true);
            });
        }
    }, [token]);

    useEffect(() => {
        let timer;
        if (active && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }if (countdown === 0) {
            navigate("/login");
        }
        return () => {
            clearTimeout(timer);
        };
    }, [active, countdown]);
    return (
        <>
            {active ? (
                <h1 className="info-confirm success">
                    <h1>Xác thực thành công! 🎉</h1>
                    <p>Chuyển hướng về trang chủ trong {countdown} giây <span className="loading"></span></p>
                </h1>
            ) : (
                <h1 className="info-confirm failure">
                    <h1>Xác thực không thành công. 😕</h1>
                    <p>Bạn hãy kiểm tra lại tài khoản của mình.</p>
                </h1>
            )}
        </>
    )

}