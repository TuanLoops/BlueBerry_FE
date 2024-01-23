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

  const [selected, setSelected] = useState(true);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const infoUser = useSelector((state) => state.user.infoUser);
  useEffect(() => {
    dispatch(getInfoUser(currentUser.id))
  }, [])

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
    setSelected(true);
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
        {selected
          ?
          (
            <form className='current-information'>
              <div className='current-information-container'>
                <table>
                  <tr>
                    <th>First Name:</th>
                    <th>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        disabled
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
                        disabled
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>Date Of Birth:</th>
                    <th>
                      <input
                        type="date"
                        disabled
                        id="dob"
                        value={dob}
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
                        disabled
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
                        disabled
                        onChange={(e) => setHobbies(e.target.value)}
                      >
                      </textarea>
                    </th>
                  </tr>

                  <tr>
                    <th>Address:</th>
                    <th>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        disabled
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </th>
                  </tr>
                </table>

                <div className='update-button'>
                  <div className='update-button-container' onClick={() => setSelected(false)}>
                    <div className='title'>
                      <span>Edit</span>
                    </div>
                    <div className='icon'>
                      <AiFillEdit />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
          :
          (
            <></>
          )
        }
      </div>
    </div>
  );
};

export default PersonalInformation;
