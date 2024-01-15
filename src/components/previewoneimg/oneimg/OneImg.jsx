import './oneimg.scss'
import CloseIcon from "@mui/icons-material/Close";

export const OneImg = ({ src, onRemove }) => {
    return (
        <div className="one-image-container">
            <div className="one-image-wrapper">
                <div className="close" onClick={onRemove}>
                    <CloseIcon />
                </div>
                <img className="pic" draggable="false" src={src} />
            </div>
        </div>
    );
}