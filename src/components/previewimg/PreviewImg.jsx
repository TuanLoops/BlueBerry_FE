import "./previewImg.scss";
import Img from "./img/Img";

function PreviewImg({ imageList, remove }) {
  return (
    <div className="preview-container">
      {imageList.map((item, index) => (
        <Img onRemove={() => remove(index)} key={index} src={item.imageLink} />
      ))}
    </div>
  );
}

export default PreviewImg;
