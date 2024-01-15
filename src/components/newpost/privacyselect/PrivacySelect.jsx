import "./privacyselect.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useEffect, useRef, useState } from "react";

function PrivacyOptions({ optionsRef, handleSelect, setShowOptions }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className="options" ref={optionsRef}>
      <div className="option" onClick={() => handleSelect("PUBLIC")}>
        Public
        <PublicOutlinedIcon />
      </div>
      <div className="option" onClick={() => handleSelect("FRIENDS")}>
        Friends
        <PeopleAltIcon />
      </div>
      <div className="option" onClick={() => handleSelect("PRIVATE")}>
        Private
        <LockIcon />
      </div>
    </div>
  );
}

function PrivacySelect({ privacyLevel, setPrivacyLevel }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleSelect = (level) => {
    setPrivacyLevel(level);
    setShowOptions(false);
  };

  return (
    <div className="select">
      <div
        className="select-wrapper"
        onClick={() => setShowOptions(!showOptions)}
      >
        {privacyLevel === "PUBLIC" ? (
          <>
            Public
            <PublicOutlinedIcon />
          </>
        ) : privacyLevel === "FRIENDS" ? (
          <>
            Friends
            <PeopleAltIcon />
          </>
        ) : (
          <>
            Private
            <LockIcon />
          </>
        )}
      </div>
      {showOptions && (
        <PrivacyOptions
          handleSelect={handleSelect}
          optionsRef={optionsRef}
          setShowOptions={setShowOptions}
        />
      )}
    </div>
  );
}
export default PrivacySelect;
