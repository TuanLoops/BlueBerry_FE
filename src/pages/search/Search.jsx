import {useEffect, useState} from 'react';
import './search.scss';
import { FcFilledFilter, FcList, FcConferenceCall, FcSelfie } from "react-icons/fc";
import {useParams} from "react-router-dom";
import Post from "../../components/post/post.jsx";
import {useDispatch, useSelector} from "react-redux";
import {searchStatus} from "../../redux/service/statusService.jsx";
import Posts from "../../components/posts/Posts.jsx";



const Search = () => {
    const {keyword} = useParams();
    const [selectedSettings, setSelectedSettings] = useState(1);
    const dispatch= useDispatch();
    const posts= useSelector(({status}) => status.filterList);
    console.log(keyword)
    useEffect(() => {
        dispatch(searchStatus(keyword));
    }, []);

    return (
        <div className='main-search-container'>
            <div className='main-search-left'>
                <div className='main-search-title-container'>
                    <h1>Search results</h1>
                </div>
                <div className='fillter-container'>
                    <div className='fillter-container__icon'>
                        <FcFilledFilter />
                    </div>
                    <div className='fillter-container__title'>
                        <h3>Fillter</h3>
                    </div>
                </div>

                <div className='fillter-function-container'>
                    <ul className='fillter-function-container__section-list'>

                        <li className={`fillter-function-container__section-item ${selectedSettings === 1 ? "active" : ""}`} onClick={() => setSelectedSettings(1)}>
                            <div className='fillter-function-container__section-link'>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcList />
                                </div>
                                <div>
                                    <span>
                                        Search all relevant
                                    </span>
                                </div>
                            </div>
                        </li>

                        <li className={`fillter-function-container__section-item ${selectedSettings === 2 ? "active" : ""}`} onClick={() => setSelectedSettings(2)}>
                            <div className='fillter-function-container__section-link'>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcSelfie />
                                </div>
                                <div>
                                    <span>
                                        Search by status
                                    </span>
                                </div>
                            </div>
                        </li>

                        <li className={`fillter-function-container__section-item ${selectedSettings === 3 ? "active" : ""}`} onClick={() => setSelectedSettings(3)}>
                            <div className='fillter-function-container__section-link'>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcConferenceCall />
                                </div>
                                <div>
                                    <span>
                                        Search for people
                                    </span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='main-search-right'>
                <div className='main-search-content'>
                    <div>
                        {
                            selectedSettings === 1 ? <div>
                                    <Posts posts={posts}/>
                                    {/* {posts?.map(item=>*/}
                                    {/*<p>hahaha</p>*/}
                                    {/* )}*/}
                                </div> :
                                selectedSettings === 2 ? <h1>Search by status</h1> :
                                    selectedSettings === 3 ? <h1>Search for people</h1> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search