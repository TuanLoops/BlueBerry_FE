import { useRef, useState } from "react";
import "./searchModal.scss";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

export const SearchModal = ({
  onClose,
  handleSearch,
  user,
  keyword,
  setKeyword,
}) => {
  const modalSearchRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState("");
  const handleClose = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (keyword !== null && keyword.trim() !== "") {
        handleSearch();
        onClose();
      }
    }
  };

  return (
    <div className="search-modal" ref={modalSearchRef}>
      <div className="overlay" onMouseDown={handleClose}></div>
      <div className="modal-content">
        <div className="div">
          <div className="search-input">
            <SearchIcon className="icon-search" />
            <input
              type="text"
              placeholder={`Search status of ${user.fullName}`}
              spellCheck={false}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <ClearIcon className="remove-icon" onClick={onClose} />
        </div>
        <div className="div">
          <div className="user">
            <img src={user.avatarImage} alt="user" width={80} height={80} />
            <span className="a">What are you looking for?</span>
            <span className="b">
              Search {user.fullName}'s personal page to see posts, photos and
              other display activities.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
