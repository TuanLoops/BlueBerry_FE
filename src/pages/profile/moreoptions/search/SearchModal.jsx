import { useRef, useState} from "react";
import './searchModal.scss'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {useSelector} from "react-redux";

export const SearchModal = ({onClose, onSearchChange}) => {
    const modalSearchRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const  user = useSelector(({user})=>user.currentUser)
    const handleClose = (e) => {
        if (e.target.classList.contains("overlay")) {
            onClose();
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearchChange(searchTerm);
            onClose();
        }
    };

    return (
        <div className="search-modal" ref={modalSearchRef} >
            <div className="overlay" onMouseDown={handleClose}></div>
            <div className="modal-content">
                <div className="div">
                    <div className="search-input">
                        <SearchIcon className="icon-search"/>
                        <input type="text" placeholder={`Tìm kiếm trong bài viết, ảnh và thẻ của ${user.fullName}`} spellCheck={false}
                               onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    </div>
                    <ClearIcon className="remove-icon" onClick={onClose}/>
                </div>
                <div className="div">
                    <div className="user">
                        <img src={user.avatarImage} alt="user" width={80} height={80}/>
                        <span className="a">Bạn đang tìm gì à ?</span>
                        <span className="b">Tìm kiếm trên trang cá nhân của Hữu Sỹ để xem bài viết, ảnh và các hoạt động hiển thị khác.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}