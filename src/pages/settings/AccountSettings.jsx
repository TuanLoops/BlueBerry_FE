import { useState } from 'react';
import './accountsettings.scss';
import ChangePassword from '../../components/changepassword/ChangePassword';
import PersonalInformation from '../../components/personalinformation/PersonalInformation';

const AccountSettings = () => {
  const [selectedSettings, setSelectedSettings] = useState('');



  return (
    <>
      <div className='main-container'>
        <div className='left-container'>
          <div className="account-settings">
            <div className="account-settings__section">
              <h3 className="account-settings__section-title">Account Settings</h3>
              <ul className="account-settings__section-list">
                <li className="account-settings__section-item" onClick={() => setSelectedSettings(1)}>
                  <span className="account-settings__section-link">Personal Information</span>
                </li>
                <li className="account-settings__section-item" onClick={() => setSelectedSettings(2)}>
                  <span className="account-settings__section-link">Password & Security</span>
                </li>
                <li className="account-settings__section-item" onClick={() => setSelectedSettings(3)}>
                  <span className="account-settings__section-link">Info & Permissions</span>
                </li>
                <li className="account-settings__section-item" onClick={() => setSelectedSettings(4)}>
                  <span className="account-settings__section-link">Ad Preferences</span>
                </li>
                <li className="account-settings__section-item" onClick={() => setSelectedSettings(5)}>
                  <span className="account-settings__section-link">Payment Settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <div className='right-content'>
            {
              selectedSettings == 0
                ? <h1>TEST</h1>
                :
                selectedSettings == 1
                  ? <PersonalInformation />
                  :
                  selectedSettings == 2
                  ? <ChangePassword />
                  :
                  ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;