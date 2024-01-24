import "./people.scss"
import {Link} from "react-router-dom";
import UsernameLink from "../usernamelink/UsernameLink.jsx";
import {Avatar} from "@mui/material";
import FriendButton from "../friendbutton/FriendButton.jsx";
import {useSelector} from "react-redux";
import { MdEdit } from "react-icons/md";
export const People=({people})=>{
    const currentUser= useSelector(({user})=>user.currentUser);
    return(
        <div className={'people'}>
            {people?.map((item)=>
                <div key={item.id} className={'item'}>
                    <div className={'container'}>
                        <div className={'left-container'}>
                            <div className={'avatar-container'}>
                                <Link to={`profile/${item.id}`}>
                                    <Avatar
                                        sx={{ width: 70, height: 70 }}
                                        src={item.avatarImage}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className={'details'}>
                                <UsernameLink user={item} />
                            </div>
                        </div>
                        <div className={'right-container'}>
                            {
                            currentUser &&<> {currentUser.id != item.id ? (
                                    <FriendButton className={'friend-button'} userId={item.id}/>
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