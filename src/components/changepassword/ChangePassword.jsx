import React, { useState } from 'react';
import './changepassword.scss'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangepassword = (e) => {
        e.preventDefault();
        // TO DO
    };

    return (
        <div className='main-changepassword-container'>
            <form onSubmit={handleChangepassword} className='form'>
            <h1>Change Password</h1>
            <p className='note'>Your password must have at least 6 characters, including numbers, letters and special characters (!$@%).</p>
                <div className="form-container">
                    <label htmlFor="current-password">Old Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='button-container'>
                    <button type="submit" className="button-change">
                        Change password
                    </button>
                </div>
            </form>
        </div>

    );
};

export default ChangePassword;