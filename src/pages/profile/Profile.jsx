import "./profile.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import MoreOptions from "./moreoptions/MoreOptions";
import {useState} from "react";
import NewPost from "../../components/newpost/NewPost.jsx";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import SearchIcon from '@mui/icons-material/Search';

const Profile = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [body, setBody] = useState("");
    const [index, setIndex] = useState(-1);

    const posts = [
        {
            "id": 9,
            "body": "adasdasdasdadasd\n",
            "createdAt": "2024-01-11T16:14:30.718753",
            "author": {
                "id": 1,
                "firstName": "huu",
                "lastName": "sy",
                "fullName": "huu sy",
                "avatarImage": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                "bannerImage": null,
                "online": false
            },
            "imageList": [
                {
                    "id": 1,
                    "imageLink": "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2Fa0bff564-7698-43aa-9cff-f33896ad8dd2?alt=media&token=63c164e5-1987-4219-8cf6-7fcaf5845c42"
                }
            ],
            "comment": 0,
            "like": 0,
            "updated": false
        },
        {
            "id": 8,
            "body": "asdfffffffffffffffff\nfdfgdgfdgfdgfgdg\n\n\n\n\n\nl",
            "createdAt": "2024-01-11T13:29:45.118529",
            "author": {
                "id": 1,
                "firstName": "huu",
                "lastName": "sy",
                "fullName": "huu sy",
                "avatarImage": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                "bannerImage": null,
                "online": false
            },
            "imageList": [
                {
                    "id": 1,
                    "imageLink": "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2Fa0bff564-7698-43aa-9cff-f33896ad8dd2?alt=media&token=63c164e5-1987-4219-8cf6-7fcaf5845c42"
                }
            ],
            "comment": 0,
            "like": 0,
            "updated": false
        },
        {
            "id": 7,
            "body": "asdasdasdasdasda",
            "createdAt": "2024-01-11T11:59:56.583813",
            "author": {
                "id": 1,
                "firstName": "huu",
                "lastName": "sy",
                "fullName": "huu sy",
                "avatarImage": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                "bannerImage": null,
                "online": false
            },
            "imageList": [
                {
                    "id": 1,
                    "imageLink": "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2Fa0bff564-7698-43aa-9cff-f33896ad8dd2?alt=media&token=63c164e5-1987-4219-8cf6-7fcaf5845c42"
                }
            ],
            "comment": 0,
            "like": 0,
            "updated": false
        },
        {
            "id": 7,
            "body": "asdasdasdasdasda",
            "createdAt": "2024-01-11T11:59:56.583813",
            "author": {
                "id": 1,
                "firstName": "huu",
                "lastName": "sy",
                "fullName": "huu sy",
                "avatarImage": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                "bannerImage": null,
                "online": false
            },
            "imageList": [
                {
                    "id": 1,
                    "imageLink": "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2Fa0bff564-7698-43aa-9cff-f33896ad8dd2?alt=media&token=63c164e5-1987-4219-8cf6-7fcaf5845c42"
                }
            ],
            "comment": 0,
            "like": 0,
            "updated": false
        },
        {
            "id": 7,
            "body": "asdasdasdasdasda",
            "createdAt": "2024-01-11T11:59:56.583813",
            "author": {
                "id": 1,
                "firstName": "huu",
                "lastName": "sy",
                "fullName": "huu sy",
                "avatarImage": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                "bannerImage": null,
                "online": false
            },
            "imageList": [
                {
                    "id": 1,
                    "imageLink": "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2Fa0bff564-7698-43aa-9cff-f33896ad8dd2?alt=media&token=63c164e5-1987-4219-8cf6-7fcaf5845c42"
                }
            ],
            "comment": 0,
            "like": 0,
            "updated": false
        }
    ];


    return (
        <div className="profile">
            <div className="x54ghk">
                <div className="profile-images">
                    <div className="images">
                        <img
                            src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt=""
                            className="cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                            alt=""
                            className="profilePic"
                        />
                        <div className="wrappers">
                            <div
                                className="dots"
                                onClick={() => setShowMoreOptions(!showMoreOptions)}
                            >
                                <MoreVertIcon/>
                            </div>
                        </div>
                        {showMoreOptions && <MoreOptions/>}
                    </div>
                    <div className="profileContainer">
                        <div className="uInfo">
                            <div className="center">
                                <span>Jane Doe</span>
                            </div>

                        </div>
                        <div className="uInfo">
                            <div className="right">
                                <button>Add Friends</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-container">
                    <div className="content-profile-container">
                        <div className="profile-left-sidebar">
                            <div className="left-profile-sidebar-top">
                                <div className="intro-bio">
                                    <h4>Intro</h4>
                                </div>
                                <div className="background-details">

                                </div>
                            </div>

                            <div className="gallery">
                                <div className="heading-link profile-heading-link">
                                    <h4>Photos</h4>
                                    <a href="">All Photos</a>
                                </div>

                                <div className="gallery-photos">
                                    <div className="gallery-photos-rowFirst">
                                        {/*{posts.map((posts)=>(*/}
                                        {/*    <Link to="" className="first-friend">*/}
                                        {/*        <img*/}
                                        {/*            src={posts.imageList.imageLink}*/}
                                        {/*            alt=""/>*/}
                                        {/*    </Link>*/}
                                        {/*))}*/}
                                        <Lightbox
                                            index={index}
                                            open={index >= 0}
                                            close={() => setIndex(-1)}
                                            plugins={[Thumbnails, Counter, Zoom]}
                                            carousel={3}
                                            thumbnails={{
                                                position: "bottom",
                                                width: 50,
                                                height: 80,
                                                border: 0,
                                                borderRadius: 0,
                                                padding: 0,
                                                gap: 16,
                                                showToggle: false,
                                            }}
                                            // slides={posts.imageList.map((item) => {
                                            //     return { src: item.imageLink };
                                            // })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="gallery">
                                <div className="heading-link profile-heading-link">
                                    <h4>Friends</h4>
                                    <a href="">All Friends</a>
                                </div>

                                <div className="gallery-photos">
                                    <div className="gallery-photos-rowFirst">
                                        {/*{posts.map((posts)=>(*/}
                                        {/*    <Link to="" className="first-friend">*/}
                                        {/*        <img*/}
                                        {/*            src={posts.imageList.imageLink}*/}
                                        {/*            alt=""/>*/}
                                        {/*    </Link>*/}
                                        {/*))}*/}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="content-area">
                            <NewPost></NewPost>
                            <Posts posts={posts}/>
                            <Posts posts={posts}/>
                            <Posts posts={posts}/>
                            <Posts posts={posts}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Profile;
