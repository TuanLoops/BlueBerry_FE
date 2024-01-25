import { useNavigate } from "react-router-dom"

export const AllFriend = ({friend, handleUnFriend}) => {
    const navigate= useNavigate();
    const handleClickName = (id)=>{
        navigate("/profile/"+id);
    }

    return (
        <div className="list-friend">
            <div className="title">
                <span>All Friends</span>
            </div>
            <div className="grip">
                {friend.map((friend, index) => (
                    <div className="oneGrip" key={friend.id}>
                        <div className="image">
                            <img
                                src={friend.avatarImage}
                                alt=""/>
                        </div>
                        <div className="info">
                            <div className="info-user">
                                <div className="name" onClick={()=>handleClickName(friend.id)}>
                                    {friend.fullName}
                                </div>
                            </div>
                            <div className="action-user">
                                <div className="unfriend" onClick={() => handleUnFriend(friend.id)}>
                                    <button>UnFriend</button>
                                </div>
                                <div className="messages">
                                    <button>Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}