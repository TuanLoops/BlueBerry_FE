import './notification.scss'
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Avatar} from "@mui/material";
import { useDispatch } from 'react-redux';
import { getFriendList, getIncomingFriendRequests } from '../../redux/service/friendService';

export const Notification = ({notifor, onClose}) => {
    console.log(notifor)
    const dispatch=useDispatch();
    const fetchFriendRequest = ()=>{
        dispatch(getIncomingFriendRequests());
    }
    const fetchListFriend=()=>{
        dispatch(getFriendList())
    }
    const notificationMessage = () => {
        switch (notifor.type) {
            case "COMMENT_ON_OWN_POST":
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName}  commented on {notifor.statusAuthorName} 's post </span>
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>

                );
            case "COMMENT_ON_FOLLOWED_POST":
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName} commented on 's post</span>
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
            case "LIKE_ON_POST":
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName} liked your post</span>
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
            case "LIKE_ON_COMMENT":
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName} liked your comment</span>
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
            case "FRIEND_REQUEST_INCOMING":
                fetchFriendRequest()
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName} sent you a friend request</span>
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
            case "FRIEND_REQUEST_ACCEPT":
                fetchListFriend()
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName}</span>ccepted your friend request
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
            case "FRIEND_REQUEST_DECLINE":
                fetchFriendRequest()
                return (
                    <>
                        <div className="user">
                            <Avatar sx={{width:35, height:35}} src={notifor.sender.avatarImage} alt=""/>
                        </div>
                        <div className="message">
                            <span className="name">{notifor.sender.fullName}</span>{" "}
                            declined your friend request
                            <HighlightOffIcon className="remove" onClick={() => onClose()}/>
                        </div>
                    </>
                );
        }
    }
    return (
        <div className="notification-intro">
            {notificationMessage()}
        </div>
    )
}