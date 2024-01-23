import { useEffect, useState } from 'react';
import './personalinformation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser, updateProfile } from '../../redux/service/userService';
import { AiFillEdit } from "react-icons/ai";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [showSaveCancel, setShowSaveCancel] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const infoUser = useSelector((state) => state.user.infoUser);
  useEffect(() => {
    dispatch(getInfoUser(currentUser.id))
  }, [])

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setShowSaveCancel(!showSaveCancel);
  };

  const handleCancel = () => {

    setEditMode(false);
    setShowSaveCancel(false);

    setFirstName(infoUser?.firstName || '');
    setLastName(infoUser?.lastName || '');
    setDob(infoUser?.dob || '');
    setPhoneNumber(infoUser?.phoneNumber || '');
    setHobbies(infoUser?.hobbies || '');
    setAddress(infoUser?.address || '');
  };

  const handleSave = () => {

    setEditMode(false);
    setShowSaveCancel(false);

    const user = {
      id: currentUser.id,
      firstName,
      lastName,
      dob,
      phoneNumber,
      hobbies,
      address,
    };
    dispatch(updateProfile(user));
  };

  const handleUpdate = () => {
    const user = {
      id: currentUser.id,
      firstName,
      lastName,
      dob,
      phoneNumber,
      hobbies,
      address,
    }
    dispatch(updateProfile(user))
  };

  useEffect(() => {
    setFirstName(infoUser?.firstName);
    setLastName(infoUser?.lastName);
    setDob(infoUser?.dob);
    setPhoneNumber(infoUser?.phoneNumber);
    setHobbies(infoUser?.hobbies);
    setAddress(infoUser?.address);
  }, [currentUser, infoUser]);

  return (
    <div className="update-personal-info">
      <div className="update-personal-info-container">
        <div className='title-container'>
          <div>
            <h1>Personal Information</h1>
          </div>
          <div>
            <p>Manage information on your personal page and share information on Blue Berry, CodeGym and more.</p>
          </div>
        </div>
        <form className={`current-information ${editMode ? 'edit-mode' : ''}`}>
          <div className='current-information-container'>
            <table>
              <tr>
                <th>First Name:</th>
                <th>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    disabled={!editMode}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </th>
              </tr>

              <tr>
                <th>Last Name:</th>
                <th>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    disabled={!editMode}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </th>
              </tr>

              <tr>
                <th>Date Of Birth:</th>
                <th>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    disabled={!editMode}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </th>
              </tr>

              <tr>
                <th>Phone Number:</th>
                <th>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    disabled={!editMode}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </th>
              </tr>

              <tr>
                <th>Hobbies:</th>
                <th>
                  <textarea
                    id="hobbies"
                    value={hobbies}
                    disabled={!editMode}
                    onChange={(e) => setHobbies(e.target.value)}
                  ></textarea>
                </th>
              </tr>

              <tr>
                <th>Address:</th>
                <th>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    disabled={!editMode}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </th>
              </tr>
            </table>

            {/* <div className='update-button'>
              <div className='update-button-container'>
                <div className='title-icon' onClick={toggleEditMode}>
                  <span>EDIT</span>
                  <AiFillEdit />
                </div>
              </div>
            </div> */}

            {showSaveCancel && (
              <div className='update-button'>
                <div className='update-button-container'>
                  <div className='title-icon' onClick={handleCancel}>
                    <span className='title-icon__cancel'>CANCEL</span>
                  </div>
                  <div className='title-icon' onClick={handleSave}>
                    <span className='title-icon__save'>SAVE</span>
                  </div>
                </div>
              </div>
            )}

            {!showSaveCancel && (
              <div className='update-button'>
                <div className='update-button-container'>
                  <div className='title-icon' onClick={toggleEditMode}>
                    <span className='title-icon__edit'>EDIT</span>
                    <AiFillEdit />
                  </div>
                </div>
              </div>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
