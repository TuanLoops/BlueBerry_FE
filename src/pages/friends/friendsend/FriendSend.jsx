import { useSelector } from "react-redux";
import "./friendsend.scss";
import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";
import { MdEdit } from "react-icons/md";
import UsernameLink from "../../../components/usernamelink/UsernameLink.jsx";
import FriendButton from "../../../components/friendbutton/FriendButton.jsx";
export const FriendSend = ({request})=>{
    console.log(request);
    const currentUser= useSelector(({user})=>user.currentUser);
    return(
        <div className={'people'}>
            {request?.map((item)=>
                <div key={item.receiver.id} className={'item'}>
                    <div className={'container'}>
                        <div className={'left-container'}>
                            <div className={'avatar-container'}>
                                <Link to={`profile/${item.receiver.id}`}>
                                    <Avatar
                                        sx={{ width: 70, height: 70 }}
                                        src={item.receiver.avatarImage}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className={'details'}>
                                <UsernameLink user={item.receiver} />
                            </div>
                        </div>
                        <div className={'right-container'}>
                            {
                            currentUser &&<> {currentUser.id != item.receiver.id ? (
                                    <FriendButton className={'friend-button'} userId={item.receiver.id}/>
                                ) : (
                                        <button className={'edit-profile'}>
                                            <MdEdit />
                                            <span>Edit Profile</span>
                                        </button>

                                )}</>
                        }
                        </div>
                    </div>
                </div>
            )}
        </div>)
}