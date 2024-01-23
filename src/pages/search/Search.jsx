import {useEffect, useState} from 'react';
import './search.scss';
import {FcFilledFilter, FcList, FcConferenceCall, FcSelfie} from "react-icons/fc";
import {useParams, useSearchParams} from "react-router-dom";
import Post from "../../components/post/post.jsx";
import {useDispatch, useSelector} from "react-redux";
import {searchStatus} from "../../redux/service/statusService.jsx";
import Posts from "../../components/posts/Posts.jsx";
import {People} from "../../components/people/People.jsx";
import {searchUsers} from "../../redux/service/userService.jsx";


const Search = () => {
    const [searchParams] = useSearchParams()
    const [selectedSettings, setSelectedSettings] = useState(1);
    const dispatch = useDispatch();
    const posts = useSelector(({status}) => status.filterList);
    const users = useSelector(({user}) => user.filterList);
    const [loading, setLoading] = useState(false);
    const q = searchParams.get('q');
    useEffect(() => {
        fetchData()
    }, [q]);
    const fetchData = async () => {
        setLoading(true)
        switch (selectedSettings) {
            case 2:
                await dispatch(searchStatus(q));
                break;
            case 3:
                await dispatch(searchUsers(q));
                break;
            default:
                await dispatch(searchStatus(q));
                await dispatch(searchUsers(q));
        }
        setLoading(false);
    }
    return (
        <div className='main-search-container'>
            <div className='main-search-left'>
                <div className='main-search-title-container'>
                    <h1>Search results</h1>
                </div>
                <div className='fillter-container'>
                    <div className='fillter-container__icon'>
                        <FcFilledFilter/>
                    </div>
                    <div className='fillter-container__title'>
                        <h3>Fillter</h3>
                    </div>
                </div>

                <div className='fillter-function-container'>
                    <div className='fillter-function-container__section-list'>

                        <div className={`fillter-function-container__section-item`}>
                            <div
                                className={`fillter-function-container__section-link ${selectedSettings === 1 ? "active" : ""}`}
                                onClick={() => setSelectedSettings(1)}>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcList/>
                                </div>
                                <div>
                                    <span>
                                        All relevant
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={`fillter-function-container__section-item`}>
                            <div
                                className={`fillter-function-container__section-link ${selectedSettings === 2 ? "active" : ""}`}
                                onClick={() => setSelectedSettings(2)}>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcSelfie/>
                                </div>
                                <div>
                                    <span>
                                        Status
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={`fillter-function-container__section-item`}>
                            <div
                                className={`fillter-function-container__section-link ${selectedSettings === 3 ? "active" : ""}`}
                                onClick={() => setSelectedSettings(3)}>
                                <div className='fillter-function-container__section-link__icon'>
                                    <FcConferenceCall/>
                                </div>
                                <div>
                                    <span>
                                        People
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className='main-search-right'>
                <div className='main-search-content'>
                    {loading && <p>loading...</p>}
                    {!loading &&
                        selectedSettings === 1 ?
                            <>
                                <div className={'result-container'}>
                                    <h3>People</h3>
                                    <div className={'item'}>
                                        {users.length > 0 ? <People people={users.slice(0, 5)}/> :
                                            <p>No results found</p>}
                                        {users.length > 5 ? <button className={'more-button'}
                                                                    onClick={() => setSelectedSettings(3)}> More
                                            results</button> : ""}
                                    </div>
                                </div>
                                <div className={'result-container'}>
                                    <h3>Status</h3>
                                    <div className={'item'}>
                                        {posts.length > 0 ? <Posts posts={posts.slice(0, 5)}/> :
                                            <p>No results found</p>}
                                        {posts.length > 5 ? <button className={'more-button'}
                                                                    onClick={() => setSelectedSettings(2)}> More
                                            results</button> : ""}
                                    </div>
                                </div>
                            </>
                            :
                            selectedSettings === 2 ?
                                <div className={'result-container'}>
                                    {/*<h3>Status</h3>*/}
                                    {/*<div className={'item'}>*/}
                                    {posts.length > 0 ? <Posts posts={posts}/> : <p>No results found</p>}
                                    {/*</div>*/}
                                </div>
                                :
                                selectedSettings === 3 ?
                                    <div className={'result-container'}>
                                        {/*<h3>People</h3>*/}
                                        {/*<div className={'item'}>*/}
                                        {users.length > 0 ? <People people={users}/> : <p>No results found</p>}
                                        {/*</div>*/}
                                    </div> : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Search