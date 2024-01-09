import "./img.scss";
import CloseIcon from "@mui/icons-material/Close";

function Img({ src, onRemove }) {
  return (
    <div className="image-container">
      <div className="image-wrapper">
        <div className="close" onClick={onRemove}>
          <CloseIcon />
        </div>
        <img draggable="false" src={src} />
      </div>
    </div>
  );
}

export default Img;
