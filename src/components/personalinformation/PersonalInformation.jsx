import React, { useEffect, useState } from 'react';
import './personalinformation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoCurrentUser, updateProfile } from '../../redux/service/userService';

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState('');

  // const [firstName, setFirstName] = useState(infoCurrentUser?.firstName || '');
  // const [lastName, setLastName] = useState(infoCurrentUser?.lastName || '');
  // const [dob, setDob] = useState(infoCurrentUser?.dob || '');
  // const [phoneNumber, setPhoneNumber] = useState(infoCurrentUser?.phoneNumber || '');
  // const [hobbies, setHobbies] = useState(infoCurrentUser?.hobbies || '');
  // const [address, setAddress] = useState(infoCurrentUser?.address || '');

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const infoCurrentUser = useSelector((state) => state.user.infoCurrentUser);

  useEffect(() => {
    dispatch(getInfoCurrentUser(currentUser.id))
  },[])

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
    setFirstName(infoCurrentUser?.firstName || '');
    setLastName(infoCurrentUser?.lastName || '');
    setDob(infoCurrentUser?.dob || '');
    setPhoneNumber(infoCurrentUser?.phoneNumber || '');
    setHobbies(infoCurrentUser?.hobbies || '');
    setAddress(infoCurrentUser?.address || '');
  }, [currentUser, infoCurrentUser]);

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
