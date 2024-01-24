import "./profile.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import MoreOptions from "./moreoptions/MoreOptions";
import { useEffect, useRef, useState } from "react";
import NewPost from "../../components/newpost/NewPost.jsx";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findStatusByUserAndBody,
  getStatusByUser,
} from "../../redux/service/statusService.jsx";
import img from "../../Pic-banner.jpg";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import { SearchModal } from "./moreoptions/search/SearchModal.jsx";
import { getInfoUser } from "../../redux/service/userService.jsx";
import FriendButton from "../../components/friendbutton/FriendButton.jsx";
import { UrlFriend } from "../../context/connect.jsx";

const Profile = () => {
  const { id } = useParams();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [index, setIndex] = useState(-1);
  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const [userFriendList, setUserFriendList] = useState([]);
  const showMoreButtonRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.status.list);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const infoUser = useSelector(({ user: user2 }) => user2.infoUser);
  const friendList = useSelector(({ friend }) => friend.friendList);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getStatusByUser(id));
      dispatch(getInfoUser(id));
      let res = await UrlFriend().get(`/list/${id}`);
      setUserFriendList(res.data);
    };

    fetchData();
    window.scroll({top:0})
  }, [id]);

  const handleSearch = async () => {
    const query = {
      id: id,
      body: keyword,
    };
    await dispatch(findStatusByUserAndBody(query));
    setSearchModel(true);
  };

  const handleOuterClick = (event) => {
    if (!imagesContainerRef.current.contains(event.target)) {
      setOpen(false);
      setOpenBox(false);
    }
  };
  const goBack = () => {
    dispatch(getStatusByUser(id))
    setSearchModel(false);
  };

  return (
    <div className="profile" onClick={handleOuterClick}>
      <div className="x54ghk">
        <div className="profile-images">
          {infoUser !== null && (
            <div className="images" ref={imagesContainerRef}>
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                  {
                    src: infoUser.bannerImage ? infoUser.bannerImage : img,
                    alt: "Banner Image",
                  },
                ]}
              />
              <Lightbox
                open={openBox}
                close={() => setOpenBox(false)}
                slides={[{ src: infoUser.avatarImage, alt: "Avatar Image" }]}
              />
              <img
                src={infoUser.bannerImage ? infoUser.bannerImage : img}
                alt=""
                className="cover"
                onClick={() => setOpen(true)}
              />
              <img
                src={infoUser.avatarImage}
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
                  <MoreVertIcon />
                </div>
              </div>
              {showMoreOptions && (
                <MoreOptions
                  buttonRef={showMoreButtonRef}
                  onClose={() => setShowMoreOptions(false)}
                />
              )}
            </div>
          )}
          <div className="profileContainer">
            {infoUser !== null && (
              <>
                <div className="uInfo">
                  <div className="center">
                    <span>{infoUser.fullName}</span>
                  </div>
                </div>
                <div className="action">
                  <div
                    className="left"
                    ref={inputRef}
                    onClick={() => {
                      setShowSearch(true);
                    }}
                  >
                    <button>
                      <SearchIcon />
                    </button>
                  </div>
                  <div className="right">
                    {currentUser.id != +id ? (
                      <FriendButton userId={+id} />
                    ) : (
                      <Link to={"/accountsettings"}>
                        <button>
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png?_nc_eui2=AeHp1Ln-z1HSkfV-aw2uLKAYPeqkNBZWYnQ96qQ0FlZidAfwYPP1T1b5ZVPiivJfvfzVYWO5udsdrbLrOaRHjRcg"
                            alt=""
                          />
                          <span>Edit Profile</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
            {showSearch && (
              <SearchModal
                buttonRef={inputRef}
                user={infoUser}
                keyword={keyword}
                setKeyword={setKeyword}
                onClose={() => setShowSearch(false)}
                handleSearch={handleSearch}
              />
            )}
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
                </div>
                <div className="intro-details">
                  {infoUser !== null && (
                    <>
                      {infoUser.address ||
                      infoUser.phoneNumber ||
                      infoUser.hobbies ? (
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label>
                                  <CakeIcon /> Dob:
                                </label>
                              </td>
                              <td>
                                <span>{infoUser.dob}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  <PermPhoneMsgIcon /> Phone Number:
                                </label>
                              </td>
                              <td>
                                <span>{infoUser.phoneNumber}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  <BookmarksIcon /> Hobbies:
                                </label>
                              </td>
                              <td>
                                <span>{infoUser.hobbies}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  <HomeIcon /> Address:
                                </label>
                              </td>
                              <td>
                                <span>{infoUser.address}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <>
                          <div className="request">
                            {infoUser.id===currentUser.id ? "Please update your personal information" : "The user has not updated their information"}
                           
                          </div>
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
                    {posts
                      .slice(0, 10)
                      .filter(
                        (post) =>
                          post.imageList.length > 0 &&
                          post.imageList[0].imageLink !== ""
                      )
                      .map((post, idx) => (
                        <div className="first-friend" key={post.id}>
                          <img
                            src={post.imageList[0].imageLink}
                            alt=""
                            onClick={() => setIndex(idx)}
                          />
                        </div>
                      ))}
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
                    slides={posts.map((post) => ({
                      src:
                        post.imageList.length > 0
                          ? post.imageList[0].imageLink
                          : "",
                      caption: post.body,
                    }))}
                  />
                </div>
              </div>

              <div className="gallery">
                <div className="heading-link profile-heading-link">
                  <h4>Friends</h4>
                  <Link to={`/profile/${+id}/friend`}>All Friends</Link>
                </div>

                <div className="gallery-photos">
                  <div className="gallery-photos-rowFirst">
                    {userFriendList.slice(0, 9).map((friend) => (
                      <Link
                        to={`/profile/${friend.id}`}
                        className="first-friend"
                        key={friend.id}
                      >
                        <img src={friend.avatarImage} alt="" />
                        <span>{friend.fullName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="content-area">
              {infoUser && infoUser.id === currentUser.id && <NewPost />}
              {searchModel ? (
                <>
                  <div className="info-search">
                    Results of "<span className="keyword">{keyword}</span>"
                    <button
                      className="goBack"
                      onClick={() => goBack()}
                    >
                      All status
                    </button>
                  </div>
                  {posts.length>0 ?  <Posts posts={posts} />: <p className="not-found">status not found</p>}
                 
                </>
              ) : (
                <Posts posts={posts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
