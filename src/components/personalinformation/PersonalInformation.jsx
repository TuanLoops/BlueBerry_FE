import React, { useState } from 'react';
import './personalinformation.scss';

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState('');

  const handleUpdate = () => {


  };

  return (
    <div className="update-personal-info-container">
      <form>
        <div className='title-container'>
          <div>
            <h1>Personal Information</h1>
          </div>
          <div>
            <p>Manage information on your personal page and share information on Blue Berry, CodeGym and more.</p>
          </div>
        </div>
        <div className='form-container'>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="dob">Date Of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label htmlFor="hobbies">Hobbies:</label>
          <textarea
            id="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          >
          </textarea>

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className='button-container'>
          <button type="button" onClick={handleUpdate}>
            Save change
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
