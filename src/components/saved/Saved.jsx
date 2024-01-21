import './saved.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from "../../assets/grid.png";
import {All} from "./all/All.jsx";
import {useEffect, useState} from "react";
import {getAllSaveArticle} from "../../redux/service/saveAvticleService.jsx";
import { useSelector} from "react-redux";


export const Saved = () => {
    const [savedArticles, setSavedArticles] = useState([])

    const currentUser = useSelector(({user})=>user.currentUser)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSaveArticle(currentUser.id);
                setSavedArticles(data);
            } catch (error) {
                console.error('Error fetching saved articles:', error);
            }
        };

        fetchData().then();
    }, []);

    return(
        <div className='main-saved-container'>
            <div className='main-saved-left'>
                <div className="X11">
                    <div className="saved-header">
                        <div className="title">
                            <span>Saved</span>
                        </div>
                        <div className="options">
                            <SettingsIcon/>
                        </div>
                    </div>
                    <div className="content">
                        <div className="item-save">
                            <div className="item">
                                <div className="Xh3nT">
                                    <img src={Grid} alt=""/>
                                    <span>Saved Items</span>
                                </div>
                            </div>
                            <div className="hr"></div>
                            <div className="item">
                                <div className="Xh3nTt">
                                    <span></span>
                                </div>
                                <div className="Xh3nT">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-save-right">
                <div className="X1346">
                    <div className="x1192i">
                        <span>All</span>
                        <div className="icon">
                            <i></i>
                        </div>
                    </div>
                    <div className="x1192">
                        <All currentUser={currentUser} article={savedArticles} setSavedArticles={setSavedArticles}/>
                    </div>
                </div>
            </div>
        </div>
    )
}