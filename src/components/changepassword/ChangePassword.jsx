import React, { useState } from 'react';
import './changepassword.scss'
import {changePassword} from "../../redux/service/userService.jsx";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPassError, setNewPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    const [message,setMessage] = useState('');

    const handleChangePassword = (e) => {
        e.preventDefault();
        const password = {
            oldPassword: currentPassword,
            password: newPassword,
            confirmPassword:confirmPassword
        }
       changePassword(password).then((response) =>
           setMessage(response.data.message)
       ).catch((error) =>
           setCurrentPasswordError(error.response.data.message)
       )
    };
    const handleInputOldPassword = (e)=> {
        setCurrentPassword(e.target.value);
        if (!e.target.value){
            setCurrentPasswordError("Please enter old password");
        }else {
            setCurrentPasswordError("");
        }
    }
    const handleInputNewPassword = (e) => {
        setNewPassword(e.target.value)
        if (e.target.value.length < 7 || !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!$@%]).*$/.test(e.target.value)) {
            setNewPassError("Your password must have at least 8 characters, including numbers, letters, and special characters (!$@%).");
        } else {
            setNewPassError("");
        }
        if(e.target.value !== confirmPassword){
            setConfirmPassError("Confirm password does not match!")
        }else {
            setConfirmPassError("")
        }

    }
    const handleInputConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        if(e.target.value !== newPassword){
            setConfirmPassError("Confirm password does not match!")
        }else{
            setConfirmPassError("")
        }
    }
    const checkRequired= ()=>{
        console.log(1)
        if(!currentPassword){
            setCurrentPasswordError("Old password required!")
        }
        if(!newPassword){
            setNewPassError("New password required!")
        }
        if(!confirmPassword){
            setConfirmPassError("Confirm password required!")
        }
    }

    return (
        <div className='main-change-password-container'>
            <form onSubmit={handleChangePassword} className='form'>
            <h1>Change Password</h1>
            <p className='note'>Your password must have at least 7 characters, including numbers, letters and special characters (!$@%).</p>
                <div className="form-container">
                    <label htmlFor="current-password">Old Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="current-password"
                        required
                        value={currentPassword}
                        onChange={(e) =>  handleInputOldPassword(e)}
                    />
                    {currentPasswordError && <span className="error"> {currentPasswordError}</span>}
                </div>
                <div className="form-container">
                    <label htmlFor="new-password">New Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => handleInputNewPassword(e)}
                    />
                    {newPassError && <span className="error">{newPassError}</span>}
                </div>
                <div className="form-container">
                    <label htmlFor="confirm-password">Confirm Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => handleInputConfirmPassword(e)}
                    />
                    {confirmPassError && <span className="error">{confirmPassError}</span>}
                </div>
                <div className="message-container">
                    {message && <span className="message">{message}</span>}
                </div>
                <div className='button-container'>
                    <button type="submit" className="button-change" onMouseOver={()=>checkRequired()} disabled={ !currentPassword || newPassError || !newPassword || confirmPassError || !confirmPassword}>
                        Change password
                    </button>
                </div>
            </form>
        </div>

    );
};

export default ChangePassword;