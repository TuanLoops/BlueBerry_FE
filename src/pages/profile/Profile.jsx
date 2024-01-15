import "./profile.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import MoreOptions from "./moreoptions/MoreOptions";
import {useEffect, useRef, useState} from "react";
import NewPost from "../../components/newpost/NewPost.jsx";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getStatusByUser, searchStatus, showStatus} from "../../redux/service/statusService.jsx";
import img from '../../Pic-banner.jpg'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import HomeIcon from '@mui/icons-material/Home';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import {EditProfile} from "./editprofile/EditProfile.jsx";

const Profile = () => {
    const {id} = useParams();
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [open, setOpen] = useState(false);
    const [openBox, setOpenBox] = useState(false);
    const [index, setIndex] = useState(-1);
    const [filteredPosts, setFilteredPosts] = useState(null);
    const [showInputHobbies, setShowInputHobbies] = useState(false);
    const [loadInputHobbies, setLoadInputHobbies] = useState(false);
    const [showEditHobbies, setShowEditHobbies] = useState(false);
    const showMoreButtonRef = useRef(null);
    const showEditButtonRef = useRef(null);
    const imagesContainerRef = useRef(null);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.status.list);
    const user = useSelector(({user}) => user.currentUser)
    const infoCurrentUser = useSelector(({user: user2})=>user2.infoCurrentUser);

    useEffect(() => {
        dispatch(getStatusByUser(id));
    }, []);

    const handleSearchChange = async (value) => {
        const result = await dispatch(searchStatus(value));
        if (result.payload !== null) {
            setFilteredPosts(result.payload);
        } else {
            const results = await dispatch(showStatus())
            setFilteredPosts(results.payload);
        }
    };

    const handleOuterClick = (event) => {
        if (!imagesContainerRef.current.contains(event.target)) {
            setOpen(false);
            setOpenBox(false);
        }
    };
    const handleClick = () => {
        setLoadInputHobbies(true);
        setTimeout(()=>{
            setLoadInputHobbies(false)
            setShowInputHobbies(true);
        },2000);
    }
    return (
        <div className="profile" onClick={handleOuterClick}>
            <div className="x54ghk">
                <div className="profile-images">
                    <div className="images" ref={imagesContainerRef}>
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={[{src: user.banner ? user.banner : img, alt: 'Banner Image'}]}
                        />
                        <Lightbox
                            open={openBox}
                            close={() => setOpenBox(false)}
                            slides={[{src: user.avatarImage, alt: 'Avatar Image'},]}
                        />
                        <img
                            src={user.banner ? user.banner : img}
                            alt=""
                            className="cover"
                            onClick={() => setOpen(true)}
                        />
                        <img
                            src={user.avatarImage}
                            alt=""
                            className="profilePic"
                            onClick={() => setOpenBox(true)}
                        />
                        <div className="wrappers">
                            <div
                                className="dots"
                                ref={showMoreButtonRef}
                                onClick={() => setShowMoreOptions(!showMoreOptions)}
                            >
                                <MoreVertIcon/>
                            </div>
                        </div>
                        {showMoreOptions && <MoreOptions buttonRef={showMoreButtonRef}
                                                         onClose={() => setShowMoreOptions(false)}
                                                         onSearchChange={handleSearchChange}/>}
                    </div>
                    <div className="profileContainer">
                        <div className="uInfo">
                            <div className="center">
                                <span>{user.fullName}</span>
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
                                <div className="Xch745">
                                    <div className="intro-bio">
                                        <h4>Intro</h4>
                                    </div>
                                    <div className="Xj481">
                                        <button className="btnE" onClick={() => setShowEditHobbies(true)}>
                                          DETAILS
                                        </button>
                                    </div>
                                </div>
                                {loadInputHobbies ? (
                                    <div className="overlay">
                                        <Box className="div-overlay" sx={{'& > button': {m: 1}}}>
                                            <LoadingButton
                                                className="loading"
                                                loading={showInputHobbies}
                                            >
                                            </LoadingButton>
                                        </Box>
                                    </div>
                                ) : (
                                    <>
                                    </>
                                )}
                                <div className="intro-details">
                                    {infoCurrentUser !== null && (
                                        <>
                                            {infoCurrentUser.hobbies ? (
                                                <div className="hobbies" >
                                                    <label><BookmarksIcon/> Hobbies:</label>
                                                    <span>{infoCurrentUser.hobbies}</span>
                                                </div>
                                            ) : (
                                                <>
                                                    {showInputHobbies ? (
                                                        <>
                                                            <input type="text" placeholder="Sở thích của bạn"/>
                                                            <div className="action">
                                                                <button onClick={()=> setShowInputHobbies(false)}>Cancel</button>
                                                                <button>Save</button>
                                                            </div>
                                                        </>
                                                    ): (
                                                        <div className="btn-add" onClick={handleClick}>
                                                            <button>Add Hobbies</button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            {infoCurrentUser.address && infoCurrentUser.phoneNumber ? (
                                                <>
                                                    <div className="address">
                                                        <label><HomeIcon/> Address:</label>
                                                        <span>{infoCurrentUser.address}</span>
                                                    </div>
                                                    <div className="phone">
                                                        <label><PermPhoneMsgIcon/> Phone Number:</label>
                                                        <span>{infoCurrentUser.phoneNumber}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="btn-add" ref={showEditButtonRef} onClick={()=> setShowEditHobbies(true)}>
                                                        <button>Edit details</button>
                                                    </div>
                                                    {showEditHobbies && (
                                                        <EditProfile infoCurrentUser = {infoCurrentUser}
                                                                     buttonRef={showEditButtonRef}
                                                                     onclose={()=>setShowEditHobbies(false)}/>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="gallery">
                                <div className="heading-link profile-heading-link">
                                    <h4>Photos</h4>
                                    <a href="">All Photos</a>
                                </div>

                                <div className="gallery-photos">
                                    <div className="gallery-photos-rowFirst">
                                        {posts.slice(0, 10).filter(post => post.imageList.length > 0 && post.imageList[0].imageLink !== '')
                                            .map((post, idx) => (
                                                <div className="first-friend" key={post.id}>
                                                    <img
                                                        src={post.imageList[0].imageLink}
                                                        alt=""
                                                        onClick={() => setIndex(idx)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
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
                                        slides={posts.map(post => ({
                                            src: post.imageList.length > 0 ? post.imageList[0].imageLink : '',
                                            caption: post.body,
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className="gallery">
                                <div className="heading-link profile-heading-link">
                                    <h4>Friends</h4>
                                    <a href="">All Friends</a>
                                </div>

                                <div className="gallery-photos">
                                    <div className="gallery-photos-rowFirst">
                                        {posts.slice(0, 9).map((post) => (
                                            <Link to="" className="first-friend" key={post.id}>
                                                <img
                                                    src={post.imageList.length > 0 ? post.imageList[0].imageLink : 'https://cdn.diemnhangroup.com/seoulcenter/2022/11/gai-xinh-10.jpg'}
                                                    alt=""
                                                />
                                                <span>{post.author.fullName}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-area">
                            <NewPost></NewPost>
                            {filteredPosts ? (
                                <>
                                    <div className="info-search">
                                        Search: {filteredPosts.length} result
                                        <button className="goBack" onClick={() => setFilteredPosts(null)}>GoBack</button>
                                    </div>
                                    <Posts posts={filteredPosts}/>
                                </>
                            ) : (
                                <>
                                    <Posts posts={posts}/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
