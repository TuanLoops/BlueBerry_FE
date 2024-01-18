import React, { useEffect, useState } from 'react';
import './personalinformation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoCurrentUser, updateProfile } from '../../redux/service/userService';
import { AiFillEdit } from "react-icons/ai";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const infoCurrentUser = useSelector((state) => state.user.infoCurrentUser);

  useEffect(() => {
    dispatch(getInfoCurrentUser(currentUser.id))
  }, [])

  const handleUpdate = () => {
    dispatch(updateProfile({
      id: currentUser?.id,
      firstName,
      lastName,
      dob,
      phoneNumber,
      hobbies,
      address,
    }))
  };

  useEffect(() => {
    setFirstName(infoCurrentUser?.firstName);
    setLastName(infoCurrentUser?.lastName);
    setDob(infoCurrentUser?.dob);
    setPhoneNumber(infoCurrentUser?.phoneNumber);
    setHobbies(infoCurrentUser?.hobbies);
    setAddress(infoCurrentUser?.address);
  }, [currentUser, infoCurrentUser]);

  return (
    <div className="update-personal-info-container">
      <div className='title-container'>
        <div>
          <h1>Personal Information</h1>
        </div>
        <div>
          <p>Manage information on your personal page and share information on Blue Berry, CodeGym and more.</p>
        </div>
      </div>
      <div className='current-information'>
        <div>
          <table>
            <tr>
              <th>First Name:</th>
              <th>{firstName}</th>
            </tr>

            <tr>
              <th>Last Name:</th>
              <th>{lastName}</th>
            </tr>

            <tr>
              <th>Date Of Birth:</th>
              <th>{dob}</th>
            </tr>

            <tr>
              <th>Phone Number:</th>
              <th>{phoneNumber}</th>
            </tr>

            <tr>
              <th>Hobbies:</th>
              <th>{hobbies}</th>
            </tr>

            <tr>
              <th>Address:</th>
              <th>{address}</th>
            </tr>
          </table>
        </div>
        <div className='update-button'>
          <div className='update-button-container'>
            <div className='title'>
              <span>Edit</span>
            </div>
            <div className='icon'>
              <AiFillEdit />
            </div>
          </div>
        </div>
      </div>
      <div className='form-update-container'>
        {/* <form>
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

          <div className='button-container'>
            <button type="button" onClick={handleUpdate}>
              Save change
            </button>
          </div>
        </div>

      </form> */}
      </div>
    </div>
  );
};

export default PersonalInformation;
