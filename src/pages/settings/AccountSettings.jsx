import { useState } from 'react';
import './accountsettings.scss';
import ChangePassword from '../../components/changepassword/ChangePassword';
import PersonalInformation from '../../components/personalinformation/PersonalInformation';
import { useLocation } from 'react-router-dom';

const AccountSettings = () => {
  const [selectedSettings, setSelectedSettings] = useState(1);
  const location = useLocation();
  

  return (
    <>
      <div className='main-container'>
        <div className='left-container'>
          <div className="account-settings">
            <div className="account-settings__section">
              <h3 className="account-settings__section-title">Account Settings</h3>
              <ul className="account-settings__section-list">
                <li className={`account-settings__section-item ${selectedSettings === 1 ? "active" : ""}`} onClick={() => setSelectedSettings(1)}>
                  <span className="account-settings__section-link">Personal Information</span>
                </li>
                <li className={`account-settings__section-item ${selectedSettings === 2 ? "active" : ""}`} onClick={() => setSelectedSettings(2)}>
                  <span className="account-settings__section-link">Password & Security</span>
                </li>
                <li className={`account-settings__section-item ${selectedSettings === 3 ? "active" : ""}`} onClick={() => setSelectedSettings(3)}>
                  <span className="account-settings__section-link">Info & Permissions</span>
                </li>
                <li className={`account-settings__section-item ${selectedSettings === 4 ? "active" : ""}`} onClick={() => setSelectedSettings(4)}>
                  <span className="account-settings__section-link">Ad Preferences</span>
                </li>
                <li className={`account-settings__section-item ${selectedSettings === 5 ? "active" : ""}`} onClick={() => setSelectedSettings(5)}>
                  <span className="account-settings__section-link">Payment Settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <div className='right-content'>
            {
              selectedSettings === 1 ? <PersonalInformation /> :
                selectedSettings === 2 ? <ChangePassword /> : ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;