
export const AllFriend = ({friend, handleUnFriend}) => {

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
                                <div className="name">
                                    {friend.fullName}
                                </div>
                                <div className="friend">
                                    <div className="img-friend">
                                        <img
                                            src="https://th.bing.com/th/id/OIP.HicU2ITeTeFEHIv-NTUGegHaEK?w=261&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                                            alt=""/>
                                    </div>
                                    <div className="info-more">
                                        <span>ban be chung</span>
                                    </div>
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